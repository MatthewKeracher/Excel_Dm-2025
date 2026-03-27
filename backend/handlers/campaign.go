package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"exceldm/db"
	"exceldm/middleware"
)

func GetCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	var campID int
	var categories string
	err := db.Conn.QueryRow(
		"SELECT id, categories FROM campaigns WHERE owner_id = ? AND is_public = FALSE",
		userID,
	).Scan(&campID, &categories)

	w.Header().Set("Content-Type", "application/json")

	if err == sql.ErrNoRows {
		w.Write([]byte(`{"entries":[],"categories":{}}`))
		return
	}
	if err != nil {
		http.Error(w, "failed to load campaign", http.StatusInternalServerError)
		return
	}

	result, err := serializeCampaign(campID, categories)
	if err != nil {
		http.Error(w, "failed to serialize campaign", http.StatusInternalServerError)
		return
	}

	w.Write(result)
}

func PutCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

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

	// Find or create the user's personal campaign
	var campID int
	err := db.Conn.QueryRow(
		"SELECT id FROM campaigns WHERE owner_id = ? AND is_public = FALSE",
		userID,
	).Scan(&campID)

	if err == sql.ErrNoRows {
		result, err := db.Conn.Exec(
			"INSERT INTO campaigns (owner_id, name, is_public, categories) VALUES (?, 'Campaign', FALSE, ?)",
			userID, categories,
		)
		if err != nil {
			log.Printf("PutCampaign create error (userID=%d): %v", userID, err)
			http.Error(w, "failed to create campaign", http.StatusInternalServerError)
			return
		}
		id, _ := result.LastInsertId()
		campID = int(id)
	} else if err != nil {
		log.Printf("PutCampaign find error (userID=%d): %v", userID, err)
		http.Error(w, "failed to load campaign", http.StatusInternalServerError)
		return
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
			globalHub.broadcast(fmt.Sprintf("user:%d", userID), senderClientID, data)
		}
	}()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(putCampaignResponse{IDs: ids})
}

func PatchCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	var patch patchPayload
	if err := json.NewDecoder(r.Body).Decode(&patch); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}

	var campID int
	var categories string
	err := db.Conn.QueryRow(
		"SELECT id, categories FROM campaigns WHERE owner_id = ? AND is_public = FALSE",
		userID,
	).Scan(&campID, &categories)

	if err == sql.ErrNoRows {
		http.Error(w, "campaign not found", http.StatusNotFound)
		return
	}
	if err != nil {
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
			globalHub.broadcast(fmt.Sprintf("user:%d", userID), senderClientID, data)
		}
	}()

	w.WriteHeader(http.StatusNoContent)
}
