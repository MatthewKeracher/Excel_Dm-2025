package db

import (
	"database/sql"
	"fmt"
	_ "modernc.org/sqlite"
)

var Conn *sql.DB

func Connect() error {
	database, err := sql.Open("sqlite", "./exceldm.db")
	if err != nil {
		return fmt.Errorf("unable to open database: %w", err)
	}
	Conn = database
	return nil
}

func Init() error {
	_, err := Conn.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id            INTEGER PRIMARY KEY AUTOINCREMENT,
			email         TEXT UNIQUE NOT NULL,
			password_hash TEXT        NOT NULL,
			created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return err
	}
	_, err = Conn.Exec(`
		CREATE TABLE IF NOT EXISTS campaigns (
			user_id    INTEGER PRIMARY KEY REFERENCES users(id),
			data       TEXT     NOT NULL,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`)
	return err
}
