package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
)

var safeID = regexp.MustCompile(`^[a-zA-Z0-9_-]+$`)

type rulesetManifest struct {
	ID          string            `json:"id"`
	Name        string            `json:"name"`
	Description string            `json:"description"`
	Version     string            `json:"version"`
	Files       map[string]string `json:"files"`
}

// ListRulesets scans ../data/ for subdirectories containing manifest.json and returns them.
func ListRulesets(w http.ResponseWriter, r *http.Request) {
	dataDir := "../data"
	entries, err := os.ReadDir(dataDir)
	if err != nil {
		http.Error(w, "failed to read rulesets", http.StatusInternalServerError)
		return
	}

	var rulesets []rulesetManifest
	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}
		manifestPath := filepath.Join(dataDir, entry.Name(), "manifest.json")
		data, err := os.ReadFile(manifestPath)
		if err != nil {
			continue // not a ruleset directory
		}
		var manifest rulesetManifest
		if err := json.Unmarshal(data, &manifest); err != nil {
			continue
		}
		rulesets = append(rulesets, manifest)
	}
	if rulesets == nil {
		rulesets = []rulesetManifest{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rulesets)
}

// GetRulesetFile serves a single data file from a ruleset directory.
// GET /api/rulesets/{name}/{file}  e.g. /api/rulesets/BFRPG/monsters
func GetRulesetFile(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	file := r.PathValue("file")

	if !safeID.MatchString(name) || !safeID.MatchString(file) {
		http.Error(w, "invalid path", http.StatusBadRequest)
		return
	}

	// Verify the manifest exists (confirms this is a real ruleset)
	manifestPath := filepath.Join("../data", name, "manifest.json")
	if _, err := os.Stat(manifestPath); err != nil {
		http.Error(w, "ruleset not found", http.StatusNotFound)
		return
	}

	filePath := filepath.Join("../data", name, file+".json")
	data, err := os.ReadFile(filePath)
	if err != nil {
		http.Error(w, "file not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}
