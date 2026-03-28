package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"exceldm/db"
	"exceldm/middleware"
)

// CreateInvite generates a shareable invite token for a campaign (admin only).
func CreateInvite(w http.ResponseWriter, r *http.Request) {
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
		Role string `json:"role"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}
	if req.Role != "editor" && req.Role != "viewer" {
		http.Error(w, "role must be 'editor' or 'viewer'", http.StatusBadRequest)
		return
	}

	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		http.Error(w, "failed to generate token", http.StatusInternalServerError)
		return
	}
	token := hex.EncodeToString(b)

	if _, err := db.Conn.Exec(
		"INSERT INTO campaign_invites (campaign_id, token, role, created_by) VALUES (?, ?, ?, ?)",
		campID, token, req.Role, userID,
	); err != nil {
		log.Printf("CreateInvite error: %v", err)
		http.Error(w, "failed to create invite", http.StatusInternalServerError)
		return
	}

	scheme := "https"
	if r.TLS == nil && r.Header.Get("X-Forwarded-Proto") != "https" {
		scheme = "http"
	}
	url := fmt.Sprintf("%s://%s/invite/%s", scheme, r.Host, token)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token, "url": url})
}

// GetInvite returns campaign name and role for an invite token. No auth required.
func GetInvite(w http.ResponseWriter, r *http.Request) {
	token := r.PathValue("token")
	if token == "" {
		http.Error(w, "invalid token", http.StatusBadRequest)
		return
	}

	var campaignName, role string
	var usedBy *int
	err := db.Conn.QueryRow(`
		SELECT c.name, i.role, i.used_by
		FROM campaign_invites i
		JOIN campaigns c ON c.id = i.campaign_id
		WHERE i.token = ?
	`, token).Scan(&campaignName, &role, &usedBy)
	if err != nil {
		http.Error(w, "invite not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"campaignName": campaignName,
		"role":         role,
		"used":         usedBy != nil,
	})
}

// AcceptInvite adds the authenticated user to the campaign and marks the token used.
func AcceptInvite(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)
	token := r.PathValue("token")
	if token == "" {
		http.Error(w, "invalid token", http.StatusBadRequest)
		return
	}

	var inviteID, campID int
	var role string
	var usedBy *int
	err := db.Conn.QueryRow(`
		SELECT id, campaign_id, role, used_by
		FROM campaign_invites WHERE token = ?
	`, token).Scan(&inviteID, &campID, &role, &usedBy)
	if err != nil {
		http.Error(w, "invite not found", http.StatusNotFound)
		return
	}
	if usedBy != nil {
		http.Error(w, "invite already used", http.StatusGone)
		return
	}

	// If the user is already admin, skip adding as member — just open the campaign.
	existing, _ := campaignRole(userID, campID)
	if existing != "admin" {
		if _, err := db.Conn.Exec(`
			INSERT INTO campaign_members (campaign_id, user_id, role)
			VALUES (?, ?, ?)
			ON CONFLICT(campaign_id, user_id) DO UPDATE SET role = excluded.role
		`, campID, userID, role); err != nil {
			log.Printf("AcceptInvite member insert error: %v", err)
			http.Error(w, "failed to accept invite", http.StatusInternalServerError)
			return
		}
	}

	if _, err := db.Conn.Exec(
		"UPDATE campaign_invites SET used_by = ? WHERE id = ?", userID, inviteID,
	); err != nil {
		log.Printf("AcceptInvite mark used error: %v", err)
	}

	// Return campaign ID and name so the frontend can open it directly.
	var campName string
	db.Conn.QueryRow("SELECT name FROM campaigns WHERE id = ?", campID).Scan(&campName)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"campaignId":   campID,
		"campaignName": campName,
		"role":         role,
	})
}
