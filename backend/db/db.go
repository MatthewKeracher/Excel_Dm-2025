package db

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "modernc.org/sqlite"
)

var Conn *sql.DB

func Connect() error {
	database, err := sql.Open("sqlite", "./exceldm.db")
	if err != nil {
		return fmt.Errorf("unable to open database: %w", err)
	}
	if _, err := database.Exec("PRAGMA foreign_keys = ON"); err != nil {
		return fmt.Errorf("failed to enable foreign keys: %w", err)
	}
	Conn = database
	return nil
}

func Init() error {
	if err := migrateIfNeeded(); err != nil {
		return fmt.Errorf("schema migration: %w", err)
	}
	if err := createTables(); err != nil {
		return err
	}
	if err := seedHommlet(); err != nil {
		return err
	}
	backfillHommletOwner()
	return nil
}

// tableExists reports whether a table with the given name exists.
func tableExists(name string) (bool, error) {
	var count int
	err := Conn.QueryRow("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name=?", name).Scan(&count)
	return count > 0, err
}

// hasColumn reports whether the named table contains a column with the given name.
func hasColumn(table, col string) (bool, error) {
	rows, err := Conn.Query("PRAGMA table_info(" + table + ")")
	if err != nil {
		return false, err
	}
	defer rows.Close()
	for rows.Next() {
		var cid, notNull, pk int
		var name, colType string
		var dflt interface{}
		if err := rows.Scan(&cid, &name, &colType, &notNull, &dflt, &pk); err != nil {
			return false, err
		}
		if name == col {
			return true, nil
		}
	}
	return false, nil
}

// migrateIfNeeded detects the old blob-based schema and migrates to normalized tables.
func migrateIfNeeded() error {
	exists, err := tableExists("campaigns")
	if err != nil {
		return err
	}
	if !exists {
		return nil // fresh install
	}

	isOld, err := hasColumn("campaigns", "user_id")
	if err != nil {
		return err
	}
	if !isOld {
		return nil // already new schema
	}

	log.Println("Migrating database to normalized schema...")

	type oldCampaign struct {
		UserID int
		Data   string
	}
	type oldPublic struct {
		Name string
		Data string
	}

	// Read all old personal campaigns
	rows, err := Conn.Query("SELECT user_id, data FROM campaigns")
	if err != nil {
		return err
	}
	var oldCampaigns []oldCampaign
	for rows.Next() {
		var c oldCampaign
		if err := rows.Scan(&c.UserID, &c.Data); err != nil {
			rows.Close()
			return err
		}
		oldCampaigns = append(oldCampaigns, c)
	}
	rows.Close()

	// Read all old public campaigns
	var oldPublics []oldPublic
	if ok, _ := tableExists("public_campaigns"); ok {
		rows, err = Conn.Query("SELECT name, data FROM public_campaigns")
		if err != nil {
			return err
		}
		for rows.Next() {
			var p oldPublic
			if err := rows.Scan(&p.Name, &p.Data); err != nil {
				rows.Close()
				return err
			}
			oldPublics = append(oldPublics, p)
		}
		rows.Close()
	}

	// Drop old tables
	if _, err := Conn.Exec("DROP TABLE IF EXISTS campaigns"); err != nil {
		return err
	}
	if _, err := Conn.Exec("DROP TABLE IF EXISTS public_campaigns"); err != nil {
		return err
	}

	// Create new tables
	if err := createTables(); err != nil {
		return err
	}

	// Migrate personal campaigns
	for _, c := range oldCampaigns {
		if err := migrateBlob(c.UserID, "Campaign", false, c.Data); err != nil {
			log.Printf("Warning: failed to migrate campaign for user %d: %v", c.UserID, err)
		}
	}

	// Migrate public campaigns
	for _, p := range oldPublics {
		if err := migrateBlob(-1, p.Name, true, p.Data); err != nil {
			log.Printf("Warning: failed to migrate public campaign %s: %v", p.Name, err)
		}
	}

	log.Println("Migration complete.")
	return nil
}

func createTables() error {
	if _, err := Conn.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id            INTEGER PRIMARY KEY AUTOINCREMENT,
			email         TEXT UNIQUE NOT NULL,
			password_hash TEXT        NOT NULL,
			created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`); err != nil {
		return err
	}

	if _, err := Conn.Exec(`
		CREATE TABLE IF NOT EXISTS campaigns (
			id         INTEGER PRIMARY KEY AUTOINCREMENT,
			owner_id   INTEGER REFERENCES users(id),
			name       TEXT NOT NULL DEFAULT 'Campaign',
			is_public  BOOLEAN NOT NULL DEFAULT FALSE,
			categories TEXT NOT NULL DEFAULT '{}',
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`); err != nil {
		return err
	}

	if _, err := Conn.Exec(`
		CREATE TABLE IF NOT EXISTS campaign_members (
			campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
			user_id     INTEGER NOT NULL REFERENCES users(id)     ON DELETE CASCADE,
			role        TEXT NOT NULL CHECK(role IN ('admin','editor','viewer')),
			PRIMARY KEY (campaign_id, user_id)
		)
	`); err != nil {
		return err
	}

	// Add version column to campaigns if missing (added post-launch)
	if ok, _ := hasColumn("campaigns", "version"); !ok {
		if _, err := Conn.Exec("ALTER TABLE campaigns ADD COLUMN version INTEGER NOT NULL DEFAULT 0"); err != nil {
			return err
		}
	}

	// Add tabs column to campaigns if missing (added post-launch)
	if ok, _ := hasColumn("campaigns", "tabs"); !ok {
		if _, err := Conn.Exec("ALTER TABLE campaigns ADD COLUMN tabs TEXT"); err != nil {
			return err
		}
	}

	// Add ruleset column to campaigns if missing (added post-launch)
	if ok, _ := hasColumn("campaigns", "ruleset"); !ok {
		if _, err := Conn.Exec("ALTER TABLE campaigns ADD COLUMN ruleset TEXT"); err != nil {
			return err
		}
	}

	// Add username column to users if missing (added post-launch)
	if ok, _ := hasColumn("users", "username"); !ok {
		if _, err := Conn.Exec("ALTER TABLE users ADD COLUMN username TEXT"); err != nil {
			return err
		}
		// Backfill: set username = email for all existing users
		if _, err := Conn.Exec("UPDATE users SET username = email WHERE username IS NULL"); err != nil {
			return err
		}
	}

	// Add grid_type column to entries if missing (added post-launch)
	if ok, _ := hasColumn("entries", "grid_type"); !ok {
		if _, err := Conn.Exec("ALTER TABLE entries ADD COLUMN grid_type TEXT NOT NULL DEFAULT 'hex'"); err != nil {
			return err
		}
	}

	// Add avatar column to users if missing (added post-launch)
	if ok, _ := hasColumn("users", "avatar"); !ok {
		if _, err := Conn.Exec("ALTER TABLE users ADD COLUMN avatar TEXT"); err != nil {
			return err
		}
	}

	// Add sort_order column to entries if missing (added post-launch)
	if ok, _ := hasColumn("entries", "sort_order"); !ok {
		if _, err := Conn.Exec("ALTER TABLE entries ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0"); err != nil {
			return err
		}
	}

	if _, err := Conn.Exec(`
		CREATE TABLE IF NOT EXISTS entries (
			id            INTEGER PRIMARY KEY AUTOINCREMENT,
			campaign_id   INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
			title         TEXT NOT NULL DEFAULT 'Untitled',
			type          TEXT NOT NULL DEFAULT 'locations',
			category      TEXT NOT NULL DEFAULT 'Uncategorised',
			body          TEXT NOT NULL DEFAULT '',
			color         TEXT NOT NULL DEFAULT '',
			image         TEXT NOT NULL DEFAULT '',
			x             REAL NOT NULL DEFAULT 0,
			y             REAL NOT NULL DEFAULT 0,
			coords        TEXT NOT NULL DEFAULT '{}',
			pop_out       BOOLEAN NOT NULL DEFAULT FALSE,
			current_child INTEGER NOT NULL DEFAULT 0,
			parent_id     INTEGER REFERENCES entries(id),
			sort_order    INTEGER NOT NULL DEFAULT 0,
			updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`); err != nil {
		return err
	}

	if _, err := Conn.Exec(`
		CREATE TABLE IF NOT EXISTS campaign_invites (
			id          INTEGER PRIMARY KEY AUTOINCREMENT,
			campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
			token       TEXT NOT NULL UNIQUE,
			role        TEXT NOT NULL CHECK(role IN ('editor','viewer')),
			created_by  INTEGER NOT NULL REFERENCES users(id),
			expires_at  DATETIME,
			used_by     INTEGER REFERENCES users(id),
			created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`); err != nil {
		return err
	}

	return nil
}

// migrateBlob parses a JSON blob and inserts it into the normalized schema.
// ownerID of -1 means no owner (public campaign).
func migrateBlob(ownerID int, name string, isPublic bool, data string) error {
	type rawEntry struct {
		Title        string          `json:"title"`
		Type         string          `json:"type"`
		Category     string          `json:"category"`
		Body         string          `json:"body"`
		Color        string          `json:"color"`
		Image        string          `json:"image"`
		X            float64         `json:"x"`
		Y            float64         `json:"y"`
		Coords       json.RawMessage `json:"coords"`
		PopOut       bool            `json:"popOut"`
		CurrentChild interface{}     `json:"currentChild"`
		Parent       interface{}     `json:"parent"`
	}
	type rawCampaign struct {
		Entries    []rawEntry      `json:"entries"`
		Categories json.RawMessage `json:"categories"`
	}

	var raw rawCampaign
	if err := json.Unmarshal([]byte(data), &raw); err != nil {
		return err
	}

	categories := "{}"
	if raw.Categories != nil {
		categories = string(raw.Categories)
	}

	var ownerVal interface{}
	if ownerID > 0 {
		ownerVal = ownerID
	}

	result, err := Conn.Exec(
		"INSERT INTO campaigns (owner_id, name, is_public, categories) VALUES (?, ?, ?, ?)",
		ownerVal, name, isPublic, categories,
	)
	if err != nil {
		return err
	}
	campID, _ := result.LastInsertId()

	// First pass: insert all entries, collect index→id map
	indexToID := make(map[int]int64)
	for i, e := range raw.Entries {
		coords := "{}"
		if len(e.Coords) > 0 {
			coords = string(e.Coords)
		}
		currentChild := 0
		if f, ok := e.CurrentChild.(float64); ok {
			currentChild = int(f)
		}

		res, err := Conn.Exec(`
			INSERT INTO entries (campaign_id, title, type, category, body, color, image, grid_type, x, y, coords, pop_out, current_child)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`, campID, e.Title, e.Type, e.Category, e.Body, e.Color, e.Image, "hex", e.X, e.Y, coords, e.PopOut, currentChild)
		if err != nil {
			return err
		}
		id, _ := res.LastInsertId()
		indexToID[i] = id
	}

	// Second pass: update parent_id references
	for i, e := range raw.Entries {
		parentIdx, ok := e.Parent.(float64)
		if !ok {
			continue
		}
		parentID, ok := indexToID[int(parentIdx)]
		if !ok {
			continue
		}
		if _, err := Conn.Exec("UPDATE entries SET parent_id = ? WHERE id = ?", parentID, indexToID[i]); err != nil {
			return err
		}
	}

	return nil
}

// backfillHommletOwner sets owner_id on the Hommlet campaign to matthewkeracher94@gmail.com
// when that user exists. Safe to call on every startup (idempotent).
func backfillHommletOwner() {
	var userID int
	err := Conn.QueryRow("SELECT id FROM users WHERE email = ?", "matthewkeracher94@gmail.com").Scan(&userID)
	if err != nil {
		return // user hasn't registered yet, or other transient error
	}
	if _, err := Conn.Exec(
		"UPDATE campaigns SET owner_id = ? WHERE name = 'hommlet' AND is_public = TRUE AND (owner_id IS NULL OR owner_id != ?)",
		userID, userID,
	); err != nil {
		log.Printf("backfillHommletOwner: %v", err)
	}
}

func seedHommlet() error {
	var count int
	if err := Conn.QueryRow("SELECT COUNT(*) FROM campaigns WHERE name = 'hommlet' AND is_public = TRUE").Scan(&count); err != nil {
		return err
	}
	if count > 0 {
		return nil
	}

	data, err := os.ReadFile("../data/Hommlet.json")
	if err != nil {
		log.Printf("Warning: could not seed Hommlet: %v", err)
		return nil
	}

	if err := migrateBlob(-1, "hommlet", true, string(data)); err != nil {
		return fmt.Errorf("seeding Hommlet: %w", err)
	}
	log.Println("Hommlet seeded into public campaigns.")
	return nil
}
