package models

import "encoding/json"

// Coords mirrors the JS coords object { x, y } which can be numbers or CSS strings.
type Coords struct {
	X interface{} `json:"x"`
	Y interface{} `json:"y"`
}

// Entry mirrors the JS Entry class fields that are persisted via prepareForJSON().
// Parent is an array index (int) or null. Children is always an empty array in
// the serialised form — the tree is rebuilt from Parent on load.
type Entry struct {
	Title        string          `json:"title"`
	Type         string          `json:"type"`
	Category     string          `json:"category"`
	Body         string          `json:"body"`
	Color        string          `json:"color"`
	Image        string          `json:"image"`
	GridType     string          `json:"gridType"`
	X            float64         `json:"x"`
	Y            float64         `json:"y"`
	Coords       Coords          `json:"coords"`
	PopOut       bool            `json:"popOut"`
	CurrentChild interface{}     `json:"currentChild"`
	Parent       interface{}     `json:"parent"`
	Children     []interface{}   `json:"children"`
	Current      bool            `json:"current"`
}

// Campaign is the top-level shape saved and loaded by the app.
// It matches what prepareForJSON() returns: { entries: [...], categories: {...} }
type Campaign struct {
	Entries    []Entry                       `json:"entries"`
	Categories map[string]json.RawMessage    `json:"categories"`
}
