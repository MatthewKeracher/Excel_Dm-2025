package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
)

var Conn *pgx.Conn

// Connect opens a connection to Postgres.
// Reads DATABASE_URL from the environment, falling back to a local dev default.
func Connect() error {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://postgres:password@localhost:5432/exceldm?sslmode=disable"
	}

	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		return fmt.Errorf("unable to connect to database: %w", err)
	}

	Conn = conn
	return nil
}

// Init creates the campaigns table if it does not already exist.
// When user support is added, a user_id column will be added here.
func Init() error {
	_, err := Conn.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS campaigns (
			id         SERIAL PRIMARY KEY,
			data       JSONB        NOT NULL,
			updated_at TIMESTAMPTZ  DEFAULT NOW()
		)
	`)
	return err
}
