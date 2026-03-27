# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

Excel_DM is a browser-based Dungeon Master planning tool. It is a **vanilla JavaScript single-page application** served by a Go backend. The backend handles auth and persistence; the frontend has no build step.

## Running the App

### Locally

1. Start the Go backend (serves the frontend too):
   ```
   cd backend && go run .
   ```
2. Open `http://localhost:8080` in a browser.
3. Register an account via the login modal, then use the app normally.

The only npm dependency is `marked` (markdown parser), also loaded via CDN. CodeMirror is loaded from CDN as well.

### Production (heimvon)

The app runs inside an Alpine Linux Incus container named `exceldm` on `heimvon`. The Go binary is compiled for `linux/amd64` and runs as an OpenRC service. It is exposed on the host at port `8081` via an Incus proxy device.

**Container layout:**
```
/opt/exceldm/exceldm/
  backend/exceldm      ← compiled binary
  index.html
  src/
  css/
  assets/
  data/
```

The binary runs from `backend/` so that `../` resolves to the frontend root.

**Deploy script:** `deploy.sh` at the project root handles building and deploying in one command:
```
bash deploy.sh                  # deploy everything
bash deploy.sh --backend-only   # rebuild and redeploy only the Go binary
bash deploy.sh --frontend-only  # redeploy only JS/CSS/HTML/data files
```

**Service management (via SSH into heimvon):**
```
sudo incus exec exceldm -- rc-service exceldm restart
sudo incus exec exceldm -- rc-service exceldm status
sudo incus exec exceldm -- tail -f /var/log/exceldm/app.log
```

## Architecture

### Backend (`backend/`)

Go HTTP server using `net/http` and SQLite (`modernc.org/sqlite` — pure Go, no CGo).

| File | Role |
|------|------|
| `backend/main.go` | Server entry point; registers routes; serves frontend as static files from `../` |
| `backend/db/db.go` | Opens `exceldm.db` (SQLite file in `backend/`); creates `users` and `campaigns` tables |
| `backend/models/` | Shared structs: `Campaign`, `RegisterRequest`, `LoginRequest`, `AuthResponse` |
| `backend/handlers/auth.go` | `POST /api/register` and `POST /api/login` — bcrypt passwords, return JWT |
| `backend/handlers/campaign.go` | `GET /api/campaigns` and `PUT /api/campaigns` — load/save campaign JSON per user |
| `backend/middleware/auth.go` | JWT Bearer token validation; injects `userID` into request context |

**Auth flow:** register/login → JWT stored in browser `localStorage` → every API request sends `Authorization: Bearer <token>` → middleware validates and injects user ID.

**Campaign storage:** one row per user in `campaigns` table; entire campaign is stored as a JSON blob in the `data` column.

### Frontend State

All runtime state lives in `src/main.js`:
- `excelDM` — global `EntryManager` instance (the data store)
- `current` — the currently selected `Entry`
- `currentTab` — active category tab string
- `masterEdit` — boolean flag for demo/read-only mode

### Data Model (`src/classes.js`)

- **`Entry`** — represents one game object (location, NPC, quest, etc.). Has `name`, `type`, `content` (markdown), `categories` array, `parent`/`children` for hierarchy, and canvas `x`/`y` for map positioning.
- **`EntryManager`** — holds all entries; exposes `addEntry`, `findEntry`, `eraseEntry`, and methods to serialize/deserialize to JSON.

### Frontend Module Responsibilities

| File | Role |
|------|------|
| `src/main.js` | App init, global state, `reCurrent()` orchestrator |
| `src/classes.js` | `Entry` and `EntryManager` data classes |
| `src/auth.js` | Auth modal wiring; `initAuth()`, `authHeaders()`, `showAuthModal()`, token helpers |
| `src/localStorage.js` | API persistence — `loadData()` and `saveData()` via `PUT/GET /api/campaigns` |
| `src/left.js` | Renders note cards in the left sidebar; handles card click, delete, navigation |
| `src/right.js` | Canvas map — draws grid and draggable location labels |
| `src/buttons.js` | Header button handlers: New, Save, Load, Add, Demo; file I/O |
| `src/tabs.js` | Tab bar — switches `currentTab`, triggers re-render |
| `src/editor.js` | CodeMirror-based modal editor for entry markdown content |
| `src/filter.js` | Category filter UI and compiled filter state |
| `src/hotkeys.js` | Keyboard shortcuts (arrows, Tab, Escape, search) |

### Rendering Pattern

User action → update `excelDM` or `current` → call `reCurrent()` in `main.js` → `reCurrent()` calls `renderLeft()`, `renderRight()`, etc. to redraw all UI. Persistence happens via `saveData()` in `src/localStorage.js` (debounced 500 ms, sends to API).

### Data Files

- `data/Excel_DM.json` — blank campaign template loaded on "New"
- `data/Hommlet.json` — large demo campaign (~8.7MB)
- `data/BFRPG/` — reference data for monsters, spells, and items

### Entry Types

The seven tabs/types: `locations`, `people`, `quests`, `monsters`, `spells`, `items`, `misc`
