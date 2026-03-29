package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"exceldm/db"
	"exceldm/middleware"
)

type campaignListItem struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	IsPublic bool   `json:"isPublic"`
	Role     string `json:"role"`
}

// ListCampaigns returns all campaigns the user owns, is a member of, or that are public.
func ListCampaigns(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	rows, err := db.Conn.Query(`
		SELECT c.id, c.name, c.is_public,
			CASE
				WHEN c.owner_id = ? THEN 'admin'
				WHEN cm.role IS NOT NULL THEN cm.role
				WHEN c.is_public THEN 'editor'
				ELSE ''
			END as role
		FROM campaigns c
		LEFT JOIN campaign_members cm ON cm.campaign_id = c.id AND cm.user_id = ?
		WHERE c.owner_id = ? OR cm.user_id = ? OR c.is_public = TRUE
		ORDER BY c.updated_at DESC
	`, userID, userID, userID, userID)
	if err != nil {
		log.Printf("ListCampaigns error (userID=%d): %v", userID, err)
		http.Error(w, "failed to list campaigns", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var campaigns []campaignListItem
	for rows.Next() {
		var c campaignListItem
		if err := rows.Scan(&c.ID, &c.Name, &c.IsPublic, &c.Role); err != nil {
			log.Printf("ListCampaigns scan error: %v", err)
			continue
		}
		campaigns = append(campaigns, c)
	}
	if campaigns == nil {
		campaigns = []campaignListItem{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(campaigns)
}

// CreateCampaign creates a new named campaign owned by the authenticated user.
func CreateCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	var req struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Name == "" {
		http.Error(w, "name required", http.StatusBadRequest)
		return
	}

	result, err := db.Conn.Exec(
		"INSERT INTO campaigns (owner_id, name, is_public, categories) VALUES (?, ?, FALSE, '{}')",
		userID, req.Name,
	)
	if err != nil {
		log.Printf("CreateCampaign error (userID=%d): %v", userID, err)
		http.Error(w, "failed to create campaign", http.StatusInternalServerError)
		return
	}
	id, err := result.LastInsertId()
	if err != nil {
		log.Printf("CreateCampaign LastInsertId error: %v", err)
		http.Error(w, "failed to create campaign", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int64{"id": id})
}

// GetCampaign loads a single campaign by ID.
func GetCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}

	role, err := campaignRole(userID, campID)
	if err != nil {
		log.Printf("GetCampaign role error (userID=%d, campID=%d): %v", userID, campID, err)
		http.Error(w, "failed to check permissions", http.StatusInternalServerError)
		return
	}
	if role == "" {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}

	result, err := serializeCampaign(campID)
	if err != nil {
		log.Printf("GetCampaign serialize error (campID=%d): %v", campID, err)
		http.Error(w, "failed to serialize campaign", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(result)
}

// PutCampaign replaces all entries for a campaign (editor or admin required).
func PutCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}

	role, err := campaignRole(userID, campID)
	if err != nil {
		log.Printf("PutCampaign role error (userID=%d, campID=%d): %v", userID, campID, err)
		http.Error(w, "failed to check permissions", http.StatusInternalServerError)
		return
	}
	if role != "admin" && role != "editor" {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	var payload struct {
		Entries    []json.RawMessage `json:"entries"`
		Categories json.RawMessage   `json:"categories"`
		Tabs       json.RawMessage   `json:"tabs"`
	}
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}

	categories := "{}"
	if payload.Categories != nil {
		categories = string(payload.Categories)
	}
	tabs := ""
	if payload.Tabs != nil {
		tabs = string(payload.Tabs)
	}

	ids, version, err := saveEntries(campID, payload.Entries, categories, tabs)
	if err != nil {
		log.Printf("PutCampaign saveEntries error (campID=%d): %v", campID, err)
		http.Error(w, "failed to save campaign", http.StatusInternalServerError)
		return
	}

	senderClientID := r.Header.Get("X-Client-ID")
	go func(v int64) {
		campaignKey := fmt.Sprintf("campaign:%d", campID)
		// Send a compact reload signal instead of the full campaign payload.
		// Receiving clients will issue a GET to fetch the current state themselves,
		// avoiding pushing potentially many MB over the WS send buffer.
		msg, err := json.Marshal(map[string]interface{}{"type": "reload", "version": v})
		if err != nil {
			log.Printf("PUT broadcast marshal error (campID=%d): %v", campID, err)
			return
		}
		n := globalHub.clientCount(campaignKey)
		log.Printf("PUT broadcast campID=%d v=%d clients=%d (reload signal)", campID, n, v)
		globalHub.broadcast(campaignKey, senderClientID, msg)
	}(version)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(putCampaignResponse{IDs: ids})
}

// PatchCampaign applies a delta update (editor or admin required).
func PatchCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}

	role, err := campaignRole(userID, campID)
	if err != nil {
		log.Printf("PatchCampaign role error (userID=%d, campID=%d): %v", userID, campID, err)
		http.Error(w, "failed to check permissions", http.StatusInternalServerError)
		return
	}
	if role != "admin" && role != "editor" {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	var patch patchPayload
	if err := json.NewDecoder(r.Body).Decode(&patch); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}

	version, err := patchEntries(campID, patch)
	if err != nil {
		log.Printf("PatchCampaign error (campID=%d): %v", campID, err)
		http.Error(w, "failed to patch campaign", http.StatusInternalServerError)
		return
	}

	senderClientID := r.Header.Get("X-Client-ID")
	go func(p patchPayload, v int64) {
		campaignKey := fmt.Sprintf("campaign:%d", campID)
		data, err := serializePatchDelta(campID, p, v)
		if err != nil {
			log.Printf("broadcast serialize error (campID=%d): %v", campID, err)
			return
		}
		n := globalHub.clientCount(campaignKey)
		log.Printf("PATCH broadcast campID=%d v=%d clients=%d bytes=%d (delta)", campID, v, n, len(data))
		globalHub.broadcast(campaignKey, senderClientID, data)
	}(patch, version)

	w.WriteHeader(http.StatusNoContent)
}

// AddCampaignMember adds a user by email to a campaign with a given role (admin only).
func AddCampaignMember(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}

	role, err := campaignRole(userID, campID)
	if err != nil || role != "admin" {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	var req struct {
		Email string `json:"email"`
		Role  string `json:"role"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}
	if req.Role != "editor" && req.Role != "viewer" {
		http.Error(w, "role must be 'editor' or 'viewer'", http.StatusBadRequest)
		return
	}

	var targetUserID int
	err = db.Conn.QueryRow("SELECT id FROM users WHERE email = ?", req.Email).Scan(&targetUserID)
	if err == sql.ErrNoRows {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}
	if err != nil {
		log.Printf("AddCampaignMember user lookup error: %v", err)
		http.Error(w, "failed to look up user", http.StatusInternalServerError)
		return
	}

	_, err = db.Conn.Exec(`
		INSERT INTO campaign_members (campaign_id, user_id, role)
		VALUES (?, ?, ?)
		ON CONFLICT(campaign_id, user_id) DO UPDATE SET role = excluded.role
	`, campID, targetUserID, req.Role)
	if err != nil {
		log.Printf("AddCampaignMember insert error: %v", err)
		http.Error(w, "failed to add member", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// RenameCampaign updates the campaign name (admin only).
func RenameCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}
	role, err := campaignRole(userID, campID)
	if err != nil || role != "admin" {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}
	var req struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Name == "" {
		http.Error(w, "name required", http.StatusBadRequest)
		return
	}
	if _, err := db.Conn.Exec("UPDATE campaigns SET name = ? WHERE id = ?", req.Name, campID); err != nil {
		log.Printf("RenameCampaign error (campID=%d): %v", campID, err)
		http.Error(w, "failed to rename campaign", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// DeleteCampaign deletes a campaign and all its entries (admin only).
func DeleteCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}
	role, err := campaignRole(userID, campID)
	if err != nil || role != "admin" {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	tx, err := db.Conn.Begin()
	if err != nil {
		http.Error(w, "failed to delete campaign", http.StatusInternalServerError)
		return
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	if _, err = tx.Exec("UPDATE entries SET parent_id = NULL WHERE campaign_id = ?", campID); err != nil {
		http.Error(w, "failed to delete campaign", http.StatusInternalServerError)
		return
	}
	if _, err = tx.Exec("DELETE FROM entries WHERE campaign_id = ?", campID); err != nil {
		http.Error(w, "failed to delete campaign", http.StatusInternalServerError)
		return
	}
	if _, err = tx.Exec("DELETE FROM campaign_members WHERE campaign_id = ?", campID); err != nil {
		http.Error(w, "failed to delete campaign", http.StatusInternalServerError)
		return
	}
	if _, err = tx.Exec("DELETE FROM campaigns WHERE id = ?", campID); err != nil {
		http.Error(w, "failed to delete campaign", http.StatusInternalServerError)
		return
	}
	if err = tx.Commit(); err != nil {
		http.Error(w, "failed to delete campaign", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// ListCampaignMembers returns all explicit members of a campaign (admin only).
func ListCampaignMembers(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}
	role, err := campaignRole(userID, campID)
	if err != nil || role != "admin" {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	rows, err := db.Conn.Query(`
		SELECT u.id, u.email, cm.role
		FROM campaign_members cm
		JOIN users u ON u.id = cm.user_id
		WHERE cm.campaign_id = ?
		ORDER BY u.email
	`, campID)
	if err != nil {
		log.Printf("ListCampaignMembers error (campID=%d): %v", campID, err)
		http.Error(w, "failed to list members", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type member struct {
		ID    int    `json:"id"`
		Email string `json:"email"`
		Role  string `json:"role"`
	}
	var members []member
	for rows.Next() {
		var m member
		if err := rows.Scan(&m.ID, &m.Email, &m.Role); err != nil {
			continue
		}
		members = append(members, m)
	}
	if members == nil {
		members = []member{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(members)
}

// RemoveCampaignMember removes a user from a campaign (admin only).
func RemoveCampaignMember(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	campID, ok := parseCampID(r)
	if !ok {
		http.Error(w, "invalid campaign id", http.StatusBadRequest)
		return
	}
	role, err := campaignRole(userID, campID)
	if err != nil || role != "admin" {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}
	targetID, err := strconv.Atoi(r.PathValue("userId"))
	if err != nil || targetID <= 0 {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}
	if _, err := db.Conn.Exec(
		"DELETE FROM campaign_members WHERE campaign_id = ? AND user_id = ?",
		campID, targetID,
	); err != nil {
		log.Printf("RemoveCampaignMember error: %v", err)
		http.Error(w, "failed to remove member", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func parseCampID(r *http.Request) (int, bool) {
	s := r.PathValue("id")
	id, err := strconv.Atoi(s)
	return id, err == nil && id > 0
}
