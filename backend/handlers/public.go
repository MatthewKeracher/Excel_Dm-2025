package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"exceldm/db"
)

func GetPublicCampaign(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")

	var campID int
	var categories string
	err := db.Conn.QueryRow(
		"SELECT id, categories FROM campaigns WHERE name = ? AND is_public = TRUE",
		name,
	).Scan(&campID, &categories)

	w.Header().Set("Content-Type", "application/json")

	if err == sql.ErrNoRows {
		http.Error(w, "campaign not found", http.StatusNotFound)
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

func PutPublicCampaign(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")

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

	var campID int
	err := db.Conn.QueryRow(
		"SELECT id FROM campaigns WHERE name = ? AND is_public = TRUE",
		name,
	).Scan(&campID)

	if err == sql.ErrNoRows {
		http.Error(w, "campaign not found", http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(w, "failed to load campaign", http.StatusInternalServerError)
		return
	}

	ids, err := saveEntries(campID, payload.Entries, categories)
	if err != nil {
		log.Printf("PutPublicCampaign saveEntries error (campID=%d): %v", campID, err)
		http.Error(w, "failed to save campaign", http.StatusInternalServerError)
		return
	}

	senderClientID := r.Header.Get("X-Client-ID")
	go func() {
		data, err := serializeCampaign(campID, categories)
		if err == nil {
			globalHub.broadcast(fmt.Sprintf("public:%s", name), senderClientID, data)
		}
	}()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(putCampaignResponse{IDs: ids})
}

func PatchPublicCampaign(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")

	var patch patchPayload
	if err := json.NewDecoder(r.Body).Decode(&patch); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}

	var campID int
	var categories string
	err := db.Conn.QueryRow(
		"SELECT id, categories FROM campaigns WHERE name = ? AND is_public = TRUE",
		name,
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
		log.Printf("PatchPublicCampaign error (campID=%d): %v", campID, err)
		http.Error(w, "failed to patch campaign", http.StatusInternalServerError)
		return
	}

	senderClientID := r.Header.Get("X-Client-ID")
	go func() {
		data, err := serializeCampaign(campID, categories)
		if err == nil {
			globalHub.broadcast(fmt.Sprintf("public:%s", name), senderClientID, data)
		}
	}()

	w.WriteHeader(http.StatusNoContent)
}
