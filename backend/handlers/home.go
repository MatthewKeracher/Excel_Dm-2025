package handlers

import (
	"encoding/json"
	"net/http"

	"exceldm/db"
	"exceldm/middleware"
)

type homeNotice struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	Color     string `json:"color"`
	SortOrder int    `json:"sort_order"`
}

type homePayload struct {
	Notices []homeNotice `json:"notices"`
	Poster  string       `json:"poster"`
}

func GetHome(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	var poster string
	db.Conn.QueryRow("SELECT COALESCE(home_poster, '') FROM users WHERE id = ?", userID).Scan(&poster)

	rows, err := db.Conn.Query(
		"SELECT id, title, body, color, sort_order FROM home_notices ORDER BY sort_order ASC",
	)
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	notices := []homeNotice{}
	for rows.Next() {
		var n homeNotice
		if err := rows.Scan(&n.ID, &n.Title, &n.Body, &n.Color, &n.SortOrder); err != nil {
			continue
		}
		notices = append(notices, n)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(homePayload{Notices: notices, Poster: poster})
}

func SaveHome(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(int)

	var payload homePayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	tx, err := db.Conn.Begin()
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	if _, err := tx.Exec("DELETE FROM home_notices"); err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	for _, n := range payload.Notices {
		if _, err := tx.Exec(
			"INSERT INTO home_notices (user_id, title, body, color, sort_order) VALUES (?, ?, ?, ?, ?)",
			userID, n.Title, n.Body, n.Color, n.SortOrder,
		); err != nil {
			http.Error(w, "server error", http.StatusInternalServerError)
			return
		}
	}

	if _, err := tx.Exec("UPDATE users SET home_poster = ? WHERE id = ?", payload.Poster, userID); err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
