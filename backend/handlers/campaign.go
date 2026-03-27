package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"exceldm/db"
	"exceldm/middleware"
	"exceldm/models"
)

func GetCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	var data string
	err := db.Conn.QueryRow(
		"SELECT data FROM campaigns WHERE user_id = ?",
		userID,
	).Scan(&data)

	w.Header().Set("Content-Type", "application/json")

	if err == sql.ErrNoRows {
		w.Write([]byte(`{"entries":[],"categories":{}}`))
		return
	}
	if err != nil {
		http.Error(w, "failed to load campaign", http.StatusInternalServerError)
		return
	}

	w.Write([]byte(data))
}

func PutCampaign(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	var campaign models.Campaign
	if err := json.NewDecoder(r.Body).Decode(&campaign); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}

	data, err := json.Marshal(campaign)
	if err != nil {
		http.Error(w, "failed to encode campaign", http.StatusInternalServerError)
		return
	}

	_, err = db.Conn.Exec(`
		INSERT INTO campaigns (user_id, data, updated_at)
		VALUES (?, ?, CURRENT_TIMESTAMP)
		ON CONFLICT (user_id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP
	`, userID, string(data))

	if err != nil {
		http.Error(w, "failed to save campaign", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
