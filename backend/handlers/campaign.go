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
	id, _ := result.LastInsertId()

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

	var categories string
	if err := db.Conn.QueryRow("SELECT categories FROM campaigns WHERE id = ?", campID).Scan(&categories); err != nil {
		log.Printf("GetCampaign query error (campID=%d): %v", campID, err)
		http.Error(w, "failed to load campaign", http.StatusInternalServerError)
		return
	}

	result, err := serializeCampaign(campID, categories)
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
	}
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}

	categories := "{}"
	if payload.Categories != nil {
		categories = string(payload.Categories)
	}

	ids, err := saveEntries(campID, payload.Entries, categories)
	if err != nil {
		log.Printf("PutCampaign saveEntries error (campID=%d): %v", campID, err)
		http.Error(w, "failed to save campaign", http.StatusInternalServerError)
		return
	}

	senderClientID := r.Header.Get("X-Client-ID")
	go func() {
		data, err := serializeCampaign(campID, categories)
		if err == nil {
			globalHub.broadcast(fmt.Sprintf("campaign:%d", campID), senderClientID, data)
		}
	}()

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

	var categories string
	if err := db.Conn.QueryRow("SELECT categories FROM campaigns WHERE id = ?", campID).Scan(&categories); err != nil {
		log.Printf("PatchCampaign query error (campID=%d): %v", campID, err)
		http.Error(w, "failed to load campaign", http.StatusInternalServerError)
		return
	}
	if patch.Categories != nil {
		categories = string(patch.Categories)
	}

	if err := patchEntries(campID, patch); err != nil {
		log.Printf("PatchCampaign error (campID=%d): %v", campID, err)
		http.Error(w, "failed to patch campaign", http.StatusInternalServerError)
		return
	}

	senderClientID := r.Header.Get("X-Client-ID")
	go func() {
		data, err := serializeCampaign(campID, categories)
		if err == nil {
			globalHub.broadcast(fmt.Sprintf("campaign:%d", campID), senderClientID, data)
		}
	}()

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

func parseCampID(r *http.Request) (int, bool) {
	s := r.PathValue("id")
	id, err := strconv.Atoi(s)
	return id, err == nil && id > 0
}
