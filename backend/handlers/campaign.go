package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"exceldm/db"
	"exceldm/models"

	"github.com/jackc/pgx/v5"
)

// GetCampaign returns the saved campaign as JSON.
// Returns an empty campaign if none has been saved yet.
func GetCampaign(w http.ResponseWriter, r *http.Request) {
	var data []byte

	err := db.Conn.QueryRow(
		context.Background(),
		"SELECT data FROM campaigns WHERE id = 1",
	).Scan(&data)

	w.Header().Set("Content-Type", "application/json")

	if err == pgx.ErrNoRows {
		w.Write([]byte(`{"entries":[],"categories":{}}`))
		return
	}
	if err != nil {
		http.Error(w, "failed to load campaign", http.StatusInternalServerError)
		return
	}

	w.Write(data)
}

// PutCampaign saves the full campaign, replacing any existing data.
func PutCampaign(w http.ResponseWriter, r *http.Request) {
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

	_, err = db.Conn.Exec(context.Background(), `
		INSERT INTO campaigns (id, data, updated_at)
		VALUES (1, $1, NOW())
		ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
	`, data)

	if err != nil {
		http.Error(w, "failed to save campaign", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
