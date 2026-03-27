# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

Excel_DM is a browser-based Dungeon Master planning tool. It is a **vanilla JavaScript single-page application** served by a Go backend. The backend handles auth, persistence, and real-time collaboration; the frontend has no build step.

## Running the App

### Locally

1. Start the Go backend (serves the frontend too):
   ```
   cd backend && go run .
   ```
2. Open `http://localhost:8080` in a browser.
3. Register an account via the login modal, then create or open a campaign world.

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

**IMPORTANT — stop the service before deploying** to avoid "text file busy" errors:
```
ssh matthew@heimvon.little-lenok.ts.net "sudo incus exec exceldm -- rc-service exceldm stop"
bash deploy.sh
```
The deploy script restarts the service automatically at the end.

The app is publicly accessible at `https://excel-dm.com` via a Cloudflare tunnel. `cloudflared` runs as an OpenRC service inside the container alongside the app, routing traffic from Cloudflare's network to `localhost:8080`.

**Service management (via SSH into heimvon):**
```
ssh matthew@heimvon.little-lenok.ts.net
sudo incus exec exceldm -- rc-service exceldm restart
sudo incus exec exceldm -- rc-service exceldm status
sudo incus exec exceldm -- rc-service cloudflared status
sudo incus exec exceldm -- tail -f /var/log/exceldm/app.log
```

## Architecture

### Backend (`backend/`)

Go HTTP server using `net/http` and SQLite (`modernc.org/sqlite` — pure Go, no CGo).

| File | Role |
|------|------|
| `backend/main.go` | Server entry point; registers routes; serves frontend with `noCacheFS` wrapper |
| `backend/db/db.go` | Opens `exceldm.db`; creates/migrates tables; seeds Hommlet; backfills owner |
| `backend/models/` | Shared structs: `Campaign`, `RegisterRequest`, `LoginRequest`, `AuthResponse` |
| `backend/handlers/auth.go` | `POST /api/register` and `POST /api/login` — bcrypt passwords, return JWT |
| `backend/handlers/campaign.go` | Campaign CRUD handlers (see API Routes below) |
| `backend/handlers/helpers.go` | `serializeCampaign`, `saveEntries`, `patchEntries`, `campaignRole` |
| `backend/handlers/ws.go` | WebSocket upgrade; `ServeCampaignWS`; hub broadcast |
| `backend/handlers/hub.go` | In-memory WebSocket hub; keyed by `campaign:{id}` |
| `backend/middleware/auth.go` | JWT Bearer token validation; injects `userID` into request context |

### API Routes

```
POST /api/register                      — create account
POST /api/login                         — get JWT

GET  /api/campaigns                     — list campaigns user owns, is member of, or that are public
POST /api/campaigns                     — create a new named campaign (caller becomes admin/owner)

GET  /api/campaigns/{id}                — load campaign (any role)
PUT  /api/campaigns/{id}                — replace all entries (editor or admin)
PATCH /api/campaigns/{id}               — delta update: upsert changed entries, delete removed (editor or admin)
POST /api/campaigns/{id}/members        — add a user by email with role editor|viewer (admin only)

GET  /api/campaigns/{id}/ws?token=JWT&clientId=X  — WebSocket for real-time sync
```

**Auth flow:** register/login → JWT stored in browser `localStorage` → every API request sends `Authorization: Bearer <token>` → middleware validates and injects user ID.

**Cache headers:** `noCacheFS` in `main.go` sets `Cache-Control: no-store` on all `.html`, `.js`, and `.css` responses so Cloudflare and browsers always fetch the latest files after a deploy.

### Database Schema

```sql
users            (id, email, password_hash, created_at)

campaigns        (id, owner_id→users, name, is_public, categories JSON, updated_at)

campaign_members (campaign_id→campaigns, user_id→users, role CHECK IN ('admin','editor','viewer'))
                 PRIMARY KEY (campaign_id, user_id)

entries          (id, campaign_id→campaigns, title, type, category, body, color, image,
                  x, y, coords JSON, pop_out, current_child, parent_id→entries, updated_at)
```

**Roles:**
- `admin` — owner of the campaign (set in `campaigns.owner_id`); can add members
- `editor` — can save changes; also the implicit role for any logged-in user on a public campaign
- `viewer` — read-only (future enforcement)

**Public campaigns:** `is_public = TRUE` grants all logged-in users `editor` access. The Hommlet demo campaign is public. `backfillHommletOwner()` runs on every startup to assign ownership to `matthewkeracher94@gmail.com` once that account exists.

**Schema migration:** `db.Init()` calls `migrateIfNeeded()` which detects the old blob-based schema (campaigns with a `user_id` column) and migrates to the normalized multi-entry schema automatically. Safe to run repeatedly.

### Frontend State

All runtime state lives in `src/main.js`:
- `excelDM` — global `EntryManager` instance (the data store)
- `current` — the currently selected `Entry`
- `currentTab` — active category tab string
- `masterEdit` — boolean flag for demo/read-only mode

### Data Model (`src/classes.js`)

- **`Entry`** — represents one game object (location, NPC, quest, etc.). Has `title`, `type`, `body` (markdown), `category`, `parent`/`children` for hierarchy, and canvas `x`/`y` for map positioning.
- **`EntryManager`** — holds all entries; exposes `add`, `n` (find by title), `prepareFromJSON`, and delta-save tracking (`dirtyEntries`, `deletedServerIds`).

### Frontend Module Responsibilities

| File | Role |
|------|------|
| `src/main.js` | App init, global state, `reCurrent()` and `newCurrent()` orchestrators |
| `src/classes.js` | `Entry` and `EntryManager` data classes |
| `src/auth.js` | Auth modal wiring; `initAuth()`, `authHeaders()`, `showAuthModal()`, token helpers |
| `src/localStorage.js` | API persistence — `loadData()` and `saveData()` (debounced PATCH); `setApiUrl()` |
| `src/campaigns.js` | Campaign picker modal — list, create, open worlds; shown after login |
| `src/left.js` | Renders note cards in the left sidebar; card click, delete, navigation |
| `src/right.js` | Canvas map — draws grid and draggable location labels |
| `src/buttons.js` | Header button handlers: Worlds, Save, Add Map, Add, Donate |
| `src/tabs.js` | Tab bar — switches `currentTab`, triggers re-render |
| `src/editor.js` | CodeMirror-based modal editor for entry markdown content |
| `src/filter.js` | Category filter UI and compiled filter state |
| `src/hotkeys.js` | Keyboard shortcuts (arrows, Tab, Escape, search) |

### App Startup Flow

1. `DOMContentLoaded` fires in `main.js`
2. `initButtons()`, `addHotkeys()`, `initTabs()` wire up UI
3. `campaigns.js` is dynamically imported (avoids circular module dependency)
4. `initAuth(showCampaignPicker)` wires the login modal; on success → `showCampaignPicker()`
5. If already logged in (JWT in `localStorage`), `showCampaignPicker()` is called immediately
6. User selects or creates a campaign → `openCampaign(id, name)` calls `setApiUrl('/api/campaigns/{id}')` then `loadData()`
7. `loadData()` fetches `GET /api/campaigns/{id}`, populates `excelDM`, calls `newCurrent()`, opens WebSocket

**Circular dependency note:** `main.js` ↔ `localStorage.js` ↔ various modules form cycles that are safe because `classes.js` evaluates first. `campaigns.js` must be loaded via dynamic `import()` (not a static import) to avoid breaking the ES module evaluation order.

### Rendering Pattern

User action → update `excelDM` or `current` → call `reCurrent()` in `main.js` → `reCurrent()` calls `draw()`, `updateFilter()`, `loadNoteCards()`, `loadPopUp()`, then `saveData()`. `saveData()` is debounced 500 ms and sends a `PATCH` request with only dirty/deleted entries.

### Real-time Collaboration

After loading a campaign, `localStorage.js` opens a WebSocket to `/api/campaigns/{id}/ws?token=JWT&clientId=X`. When another client saves, the server broadcasts the full campaign JSON to all other clients in the `campaign:{id}` hub room. The receiving client calls `loadData()` to refresh state.

### Cache Busting

All static import paths in `src/main.js` and `<script>`/`<link>` tags in `index.html` use `?v=N` query strings (currently `?v=4`). Increment `N` when deploying changes to break browser and Cloudflare caches. The `Cache-Control: no-store` header on the backend is a belt-and-suspenders measure.

### Data Files

- `data/Excel_DM.json` — blank campaign template (unused now that campaigns are DB-backed)
- `data/Hommlet.json` — large demo campaign (~8.7MB); seeded into DB once, not re-served as a file
- `data/BFRPG/` — reference data for monsters, spells, and items

### Entry Types

The seven tabs/types: `locations`, `people`, `quests`, `monsters`, `spells`, `items`, `misc`
