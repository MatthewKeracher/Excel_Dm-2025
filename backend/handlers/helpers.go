package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"strings"

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
	Version    int64           `json:"version"`
}

type putCampaignResponse struct {
	IDs []int64 `json:"ids"`
}

// serializeCampaign reads the campaign and its entries from the DB and returns
// frontend-compatible JSON including the current version number.
func serializeCampaign(campID int) ([]byte, error) {
	var categories string
	var version int64
	if err := db.Conn.QueryRow(
		"SELECT categories, version FROM campaigns WHERE id = ?", campID,
	).Scan(&categories, &version); err != nil {
		return nil, err
	}

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

	for rows.Next() {
		var e entryRow
		if err := rows.Scan(
			&e.id, &e.title, &e.typ, &e.category, &e.body, &e.color, &e.image,
			&e.x, &e.y, &e.coords, &e.popOut, &e.currentChild, &e.parentID,
		); err != nil {
			return nil, err
		}
		entryRows = append(entryRows, e)
	}

	entries := make([]responseEntry, len(entryRows))
	for i, e := range entryRows {
		var parentIdx interface{} = nil
		if e.parentID.Valid {
			parentIdx = e.parentID.Int64
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

	return json.Marshal(campaignResponse{Entries: entries, Categories: cats, Version: version})
}

// patchDeltaMessage is the WS broadcast payload for a delta (PATCH) save.
type patchDeltaMessage struct {
	Type       string          `json:"type"` // always "patch"
	Updated    []responseEntry `json:"updated"`
	DeletedIDs []int64         `json:"deletedIds"`
	Categories json.RawMessage `json:"categories,omitempty"`
	Version    int64           `json:"version"`
}

// serializePatchDelta builds a minimal WS broadcast for a PATCH save:
// only the touched entries + deleted IDs + the committed version (passed in to avoid
// a race where a concurrent save increments the version before this goroutine reads it).
func serializePatchDelta(campID int, patch patchPayload, version int64) ([]byte, error) {
	var categories string
	if err := db.Conn.QueryRow(
		"SELECT categories FROM campaigns WHERE id = ?", campID,
	).Scan(&categories); err != nil {
		return nil, err
	}

	updated := make([]responseEntry, 0, len(patch.Updated))
	if len(patch.Updated) > 0 {
		// Single IN query instead of one query per entry.
		placeholders := strings.Repeat("?,", len(patch.Updated))
		placeholders = placeholders[:len(placeholders)-1]
		args := make([]interface{}, 0, len(patch.Updated)+1)
		for _, pe := range patch.Updated {
			args = append(args, pe.ServerID)
		}
		args = append(args, campID)

		rows, err := db.Conn.Query(fmt.Sprintf(`
			SELECT id, title, type, category, body, color, image, x, y, coords, pop_out, current_child, parent_id
			FROM entries WHERE id IN (%s) AND campaign_id = ?
		`, placeholders), args...)
		if err != nil {
			return nil, err
		}
		defer rows.Close()

		for rows.Next() {
			var re responseEntry
			var parentID sql.NullInt64
			var coordsStr string
			var currentChild int
			if err := rows.Scan(
				&re.ServerID, &re.Title, &re.Type, &re.Category, &re.Body, &re.Color, &re.Image,
				&re.X, &re.Y, &coordsStr, &re.PopOut, &currentChild, &parentID,
			); err != nil {
				continue
			}
			if parentID.Valid {
				re.Parent = parentID.Int64
			}
			if currentChild != 0 {
				re.CurrentChild = currentChild
			}
			coords := json.RawMessage(`{"x":0,"y":0}`)
			if coordsStr != "" && coordsStr != "{}" {
				coords = json.RawMessage(coordsStr)
			}
			re.Coords = coords
			re.Children = []interface{}{}
			updated = append(updated, re)
		}
	}

	deletedIDs := patch.DeletedIDs
	if deletedIDs == nil {
		deletedIDs = []int64{}
	}

	msg := patchDeltaMessage{
		Type:       "patch",
		Updated:    updated,
		DeletedIDs: deletedIDs,
		Version:    version,
	}
	if patch.Categories != nil {
		cats := json.RawMessage(`{}`)
		if categories != "" && categories != "{}" {
			cats = json.RawMessage(categories)
		}
		msg.Categories = cats
	}

	return json.Marshal(msg)
}

// saveEntries replaces all entries for a campaign with the incoming payload.
// Returns the DB-assigned IDs in the same order as rawEntries, and the new version.
func saveEntries(campID int, rawEntries []json.RawMessage, categories string) (ids []int64, version int64, err error) {
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
			return nil, 0, err
		}
	}

	tx, err := db.Conn.Begin()
	if err != nil {
		return nil, 0, err
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	if err = tx.QueryRow(
		"UPDATE campaigns SET categories = ?, version = version + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING version",
		categories, campID,
	).Scan(&version); err != nil {
		return nil, 0, err
	}

	// Null out self-referential parent_id FKs before deleting,
	// otherwise SQLite's FK enforcement rejects the delete order.
	if _, err = tx.Exec("UPDATE entries SET parent_id = NULL WHERE campaign_id = ?", campID); err != nil {
		return nil, 0, err
	}
	if _, err = tx.Exec("DELETE FROM entries WHERE campaign_id = ?", campID); err != nil {
		return nil, 0, err
	}

	indexToID := make(map[int]int64)
	var res sql.Result
	for i, e := range entries {
		coords := "{}"
		if len(e.Coords) > 0 {
			coords = string(e.Coords)
		}
		currentChild := 0
		if f, ok := e.CurrentChild.(float64); ok {
			currentChild = int(f)
		}

		res, err = tx.Exec(`
			INSERT INTO entries (campaign_id, title, type, category, body, color, image, x, y, coords, pop_out, current_child)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`, campID, e.Title, e.Type, e.Category, e.Body, e.Color, e.Image,
			e.X, e.Y, coords, e.PopOut, currentChild)
		if err != nil {
			return nil, 0, err
		}
		var id int64
		id, err = res.LastInsertId()
		if err != nil {
			return nil, 0, err
		}
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
		if _, err = tx.Exec("UPDATE entries SET parent_id = ? WHERE id = ?", parentID, indexToID[i]); err != nil {
			return nil, 0, err
		}
	}

	ids = make([]int64, len(entries))
	for i := range entries {
		ids[i] = indexToID[i]
	}

	err = tx.Commit()
	return ids, version, err
}

// campaignRole returns the effective role of userID in campaign campID:
// "admin" if owner, a membership role if in campaign_members,
// "editor" if the campaign is public, or "" if no access.
func campaignRole(userID, campID int) (string, error) {
	var ownerID sql.NullInt64
	var memberRole sql.NullString
	var isPublic bool

	err := db.Conn.QueryRow(`
		SELECT c.owner_id, cm.role, c.is_public
		FROM campaigns c
		LEFT JOIN campaign_members cm ON cm.campaign_id = c.id AND cm.user_id = ?
		WHERE c.id = ?
	`, userID, campID).Scan(&ownerID, &memberRole, &isPublic)

	if err == sql.ErrNoRows {
		return "", nil
	}
	if err != nil {
		return "", err
	}
	if ownerID.Valid && int(ownerID.Int64) == userID {
		return "admin", nil
	}
	if memberRole.Valid {
		return memberRole.String, nil
	}
	if isPublic {
		return "editor", nil
	}
	return "", nil
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
// Returns the new campaign version so the broadcast goroutine uses the committed value
// rather than re-reading from DB (which could race with a concurrent save).
func patchEntries(campID int, patch patchPayload) (version int64, err error) {
	tx, err := db.Conn.Begin()
	if err != nil {
		return 0, err
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	// Update categories if provided, and capture the committed version via RETURNING.
	if patch.Categories != nil {
		if err = tx.QueryRow(
			"UPDATE campaigns SET categories = ?, version = version + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING version",
			string(patch.Categories), campID,
		).Scan(&version); err != nil {
			return 0, err
		}
	} else {
		if err = tx.QueryRow(
			"UPDATE campaigns SET version = version + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING version",
			campID,
		).Scan(&version); err != nil {
			return 0, err
		}
	}

	// Delete entries (campaign_id check prevents cross-campaign tampering)
	for _, id := range patch.DeletedIDs {
		if _, err = tx.Exec(
			"UPDATE entries SET parent_id = NULL WHERE parent_id = ? AND campaign_id = ?", id, campID,
		); err != nil {
			return 0, err
		}
		if _, err = tx.Exec(
			"DELETE FROM entries WHERE id = ? AND campaign_id = ?", id, campID,
		); err != nil {
			return 0, err
		}
	}

	// Update changed entries
	var res sql.Result
	for _, e := range patch.Updated {
		coords := "{}"
		if len(e.Coords) > 0 {
			coords = string(e.Coords)
		}
		currentChild := 0
		if f, ok := e.CurrentChild.(float64); ok {
			currentChild = int(f)
		}

		res, err = tx.Exec(`
			UPDATE entries
			SET title=?, type=?, category=?, body=?, color=?, image=?,
			    x=?, y=?, coords=?, pop_out=?, current_child=?, parent_id=?,
			    updated_at=CURRENT_TIMESTAMP
			WHERE id=? AND campaign_id=?
		`, e.Title, e.Type, e.Category, e.Body, e.Color, e.Image,
			e.X, e.Y, coords, e.PopOut, currentChild, e.ParentID,
			e.ServerID, campID)
		if err != nil {
			return 0, err
		}
		if n, _ := res.RowsAffected(); n == 0 {
			log.Printf("patchEntries: entry id=%d not found in campaign %d", e.ServerID, campID)
		}
	}

	err = tx.Commit()
	return version, err
}
