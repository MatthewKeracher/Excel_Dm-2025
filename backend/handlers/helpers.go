package handlers

import (
	"database/sql"
	"encoding/json"
	"log"

	"exceldm/db"
)

// responseEntry is the shape the frontend expects for each entry.
type responseEntry struct {
	ServerID     int64           `json:"_serverId"`
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
	Children     []interface{}   `json:"children"`
	Current      bool            `json:"current"`
}

type campaignResponse struct {
	Entries    []responseEntry `json:"entries"`
	Categories json.RawMessage `json:"categories"`
}

type putCampaignResponse struct {
	IDs []int64 `json:"ids"`
}

// serializeCampaign reads normalized entries from the DB and returns the
// frontend-compatible JSON (array-index parent references).
func serializeCampaign(campID int, categories string) ([]byte, error) {
	rows, err := db.Conn.Query(`
		SELECT id, title, type, category, body, color, image, x, y, coords, pop_out, current_child, parent_id
		FROM entries WHERE campaign_id = ? ORDER BY id
	`, campID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	type entryRow struct {
		id, currentChild int
		title, typ, category, body, color, image, coords string
		x, y                                             float64
		popOut                                           bool
		parentID                                         sql.NullInt64
	}

	var entryRows []entryRow
	idToIndex := map[int]int{}

	for rows.Next() {
		var e entryRow
		if err := rows.Scan(
			&e.id, &e.title, &e.typ, &e.category, &e.body, &e.color, &e.image,
			&e.x, &e.y, &e.coords, &e.popOut, &e.currentChild, &e.parentID,
		); err != nil {
			return nil, err
		}
		idToIndex[e.id] = len(entryRows)
		entryRows = append(entryRows, e)
	}

	entries := make([]responseEntry, len(entryRows))
	for i, e := range entryRows {
		var parentIdx interface{} = nil
		if e.parentID.Valid {
			if idx, ok := idToIndex[int(e.parentID.Int64)]; ok {
				parentIdx = idx
			}
		}

		var currentChild interface{} = nil
		if e.currentChild != 0 {
			currentChild = e.currentChild
		}

		coords := json.RawMessage(`{"x":0,"y":0}`)
		if e.coords != "" && e.coords != "{}" {
			coords = json.RawMessage(e.coords)
		}

		entries[i] = responseEntry{
			ServerID:     int64(e.id),
			Title:        e.title,
			Type:         e.typ,
			Category:     e.category,
			Body:         e.body,
			Color:        e.color,
			Image:        e.image,
			X:            e.x,
			Y:            e.y,
			Coords:       coords,
			PopOut:       e.popOut,
			CurrentChild: currentChild,
			Parent:       parentIdx,
			Children:     []interface{}{},
			Current:      false,
		}
	}

	cats := json.RawMessage(`{}`)
	if categories != "" && categories != "{}" {
		cats = json.RawMessage(categories)
	}

	return json.Marshal(campaignResponse{Entries: entries, Categories: cats})
}

// saveEntries replaces all entries for a campaign with the incoming payload.
// Returns the DB-assigned IDs in the same order as rawEntries.
func saveEntries(campID int, rawEntries []json.RawMessage, categories string) ([]int64, error) {
	type incomingEntry struct {
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

	entries := make([]incomingEntry, len(rawEntries))
	for i, raw := range rawEntries {
		if err := json.Unmarshal(raw, &entries[i]); err != nil {
			return nil, err
		}
	}

	tx, err := db.Conn.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	if _, err := tx.Exec(
		"UPDATE campaigns SET categories = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
		categories, campID,
	); err != nil {
		return nil, err
	}

	// Null out self-referential parent_id FKs before deleting,
	// otherwise SQLite's FK enforcement rejects the delete order.
	if _, err := tx.Exec("UPDATE entries SET parent_id = NULL WHERE campaign_id = ?", campID); err != nil {
		return nil, err
	}
	if _, err := tx.Exec("DELETE FROM entries WHERE campaign_id = ?", campID); err != nil {
		return nil, err
	}

	indexToID := make(map[int]int64)
	for i, e := range entries {
		coords := "{}"
		if len(e.Coords) > 0 {
			coords = string(e.Coords)
		}
		currentChild := 0
		if f, ok := e.CurrentChild.(float64); ok {
			currentChild = int(f)
		}

		res, err := tx.Exec(`
			INSERT INTO entries (campaign_id, title, type, category, body, color, image, x, y, coords, pop_out, current_child)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`, campID, e.Title, e.Type, e.Category, e.Body, e.Color, e.Image,
			e.X, e.Y, coords, e.PopOut, currentChild)
		if err != nil {
			return nil, err
		}
		id, _ := res.LastInsertId()
		indexToID[i] = id
	}

	// Second pass: set parent_id from array-index references
	for i, e := range entries {
		parentIdx, ok := e.Parent.(float64)
		if !ok {
			continue
		}
		parentID, ok := indexToID[int(parentIdx)]
		if !ok {
			continue
		}
		if _, err := tx.Exec("UPDATE entries SET parent_id = ? WHERE id = ?", parentID, indexToID[i]); err != nil {
			return nil, err
		}
	}

	ids := make([]int64, len(entries))
	for i := range entries {
		ids[i] = indexToID[i]
	}

	return ids, tx.Commit()
}

// patchEntry is one entry in a delta PATCH request.
type patchEntry struct {
	ServerID     int64           `json:"_serverId"`
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
	ParentID     *int64          `json:"parentId"` // server ID, nil = root
}

// patchPayload is the body of a PATCH /api/campaigns request.
type patchPayload struct {
	Updated    []patchEntry    `json:"updated"`
	DeletedIDs []int64         `json:"deletedIds"`
	Categories json.RawMessage `json:"categories"`
}

// patchEntries applies a delta update: updates changed entries, deletes removed ones.
func patchEntries(campID int, patch patchPayload) error {
	tx, err := db.Conn.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// Update categories if provided
	if patch.Categories != nil {
		if _, err := tx.Exec(
			"UPDATE campaigns SET categories = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
			string(patch.Categories), campID,
		); err != nil {
			return err
		}
	}

	// Delete entries (campaign_id check prevents cross-campaign tampering)
	for _, id := range patch.DeletedIDs {
		if _, err := tx.Exec(
			"UPDATE entries SET parent_id = NULL WHERE parent_id = ? AND campaign_id = ?", id, campID,
		); err != nil {
			return err
		}
		if _, err := tx.Exec(
			"DELETE FROM entries WHERE id = ? AND campaign_id = ?", id, campID,
		); err != nil {
			return err
		}
	}

	// Update changed entries
	for _, e := range patch.Updated {
		coords := "{}"
		if len(e.Coords) > 0 {
			coords = string(e.Coords)
		}
		currentChild := 0
		if f, ok := e.CurrentChild.(float64); ok {
			currentChild = int(f)
		}

		res, err := tx.Exec(`
			UPDATE entries
			SET title=?, type=?, category=?, body=?, color=?, image=?,
			    x=?, y=?, coords=?, pop_out=?, current_child=?, parent_id=?,
			    updated_at=CURRENT_TIMESTAMP
			WHERE id=? AND campaign_id=?
		`, e.Title, e.Type, e.Category, e.Body, e.Color, e.Image,
			e.X, e.Y, coords, e.PopOut, currentChild, e.ParentID,
			e.ServerID, campID)
		if err != nil {
			return err
		}
		if n, _ := res.RowsAffected(); n == 0 {
			log.Printf("patchEntries: entry id=%d not found in campaign %d", e.ServerID, campID)
		}
	}

	return tx.Commit()
}
