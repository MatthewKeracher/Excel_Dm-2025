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
3. The landing screen is the **home notice board** — any visitor (including anonymous) sees the shared notices. Click the "Log in" pill (top-right) to register or log in, then open/create a campaign world.

The only npm dependency is `marked` (markdown parser), also loaded via CDN. CodeMirror is loaded from CDN as well.

### Production (heimvon)

The app runs inside an Alpine Linux Incus container named `exceldm` on `heimvon`. The Go binary is cross-compiled for `linux/amd64` as a **fully-static binary** (`CGO_ENABLED=0` in `deploy.sh`) so it runs on Alpine's musl libc without a dynamic loader. It runs as an OpenRC service, exposed on the host at port `8081` via an Incus proxy device.

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
ssh matthew@heimvon.zubron-tuna.ts.net "sudo incus exec exceldm -- rc-service exceldm stop"
bash deploy.sh
```
The deploy script restarts the service automatically at the end.

The app is publicly accessible at `https://excel-dm.com` via a Cloudflare tunnel. `cloudflared` runs as an OpenRC service inside the container alongside the app, routing traffic from Cloudflare's network to `localhost:8080`.

**Service management (via SSH into heimvon):**
```
ssh matthew@heimvon.zubron-tuna.ts.net
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
| `backend/main.go` | Server entry point; registers routes; serves frontend |
| `backend/db/db.go` | Opens `exceldm.db`; creates/migrates tables; seeds Hommlet; backfills owner |
| `backend/models/` | Shared structs: `Campaign`, `Entry`, `Coords`, `RegisterRequest`, `LoginRequest`, `AuthResponse` |
| `backend/handlers/auth.go` | `POST /api/register`, `POST /api/login`, `GET /api/account`, `PATCH /api/account/password`, `PATCH /api/account/username`, `PATCH /api/account/avatar` |
| `backend/handlers/campaign.go` | Campaign CRUD handlers (see API Routes below) |
| `backend/handlers/helpers.go` | `serializeCampaign`, `serializePatchDelta`, `saveEntries`, `patchEntries`, `campaignRole` |
| `backend/handlers/home.go` | `GetHome`, `SaveHome` — shared notice board notices + per-user map poster |
| `backend/handlers/ruleset.go` | `ListRulesets`, `GetRulesetFile` — scans `data/` for ruleset directories |
| `backend/handlers/invite.go` | Invite link creation (`CreateInvite`), lookup (`GetInvite`), acceptance (`AcceptInvite`) |
| `backend/handlers/ws.go` | WebSocket upgrade; `ServeCampaignWS`; hub broadcast |
| `backend/handlers/hub.go` | In-memory WebSocket hub; keyed by `campaign:{id}` |
| `backend/handlers/public.go` | Package declaration placeholder (empty) |
| `backend/middleware/auth.go` | `Auth` — requires a valid JWT Bearer token, injects `userID` into context (401 otherwise). `OptionalAuth` — same, but passes through without userID if the token is missing/invalid (used for `GET /api/home` so anon visitors see shared notices). |

### API Routes

```
POST /api/register                           — create account
POST /api/login                              — get JWT

GET  /api/account                            — get current user email, username, avatar
PATCH /api/account/password                  — change password
PATCH /api/account/username                  — update display username (must be unique)
PATCH /api/account/avatar                    — update user avatar (image data URL or path)

GET  /api/campaigns                          — list campaigns user owns, is member of, or that are public
POST /api/campaigns                          — create a new named campaign (caller becomes admin/owner)

GET  /api/campaigns/{id}                     — load campaign (any role)
PUT  /api/campaigns/{id}                     — replace all entries (editor or admin)
PATCH /api/campaigns/{id}                    — delta update: upsert changed entries, delete removed (editor or admin)
PATCH /api/campaigns/{id}/settings           — update campaign name and/or ruleset (admin only)
DELETE /api/campaigns/{id}                   — delete campaign (admin only)
GET  /api/campaigns/{id}/members             — list members and roles (admin only)
POST /api/campaigns/{id}/members             — add a user by email with role editor|viewer (admin only)
DELETE /api/campaigns/{id}/members/{userId}  — remove a member (admin only)
POST /api/campaigns/{id}/invites             — create a shareable invite link (admin only)

GET  /api/rulesets                           — list available rulesets (scans data/ dirs for manifest.json)
GET  /api/rulesets/{name}/{file}             — serve a ruleset data file (e.g. /api/rulesets/BFRPG/monsters)

GET  /api/invites/{token}                    — look up invite info, no auth required
POST /api/invites/{token}/accept             — accept invite, adds caller as member (auth required)

GET  /api/home                               — shared notice board notices (public, via OptionalAuth: anon users get notices with empty poster; logged-in users also get their personal map poster)
PUT  /api/home                               — replace all notices + update caller's map poster (auth required)

GET  /api/campaigns/{id}/ws?token=JWT&clientId=X  — WebSocket for real-time sync

GET  /invite/{token}                         — serves index.html so the SPA can handle the invite route
```

**Auth flow:** register/login → JWT stored in browser `localStorage` → every API request sends `Authorization: Bearer <token>` → middleware validates and injects user ID.

### Database Schema

```sql
users            (id, email, password_hash, created_at,
                  username TEXT, avatar TEXT, home_poster TEXT)

campaigns        (id, owner_id→users, name, is_public, categories JSON, tabs JSON, ruleset TEXT, version INTEGER, updated_at)

campaign_members (campaign_id→campaigns, user_id→users, role CHECK IN ('admin','editor','viewer'))
                 PRIMARY KEY (campaign_id, user_id)

entries          (id, campaign_id→campaigns, title, type, category, body, color, image,
                  x, y, coords JSON, pop_out, current_child, parent_id→entries,
                  grid_type TEXT DEFAULT 'hex', sort_order INTEGER DEFAULT 0, updated_at)

campaign_invites (id, campaign_id→campaigns, token TEXT UNIQUE, role, created_by→users, used_by→users)

home_notices     (id, user_id→users, title, body, color, sort_order)
                 Shared notice board shown on the home screen (no campaign open).
                 All logged-in users see the same notices; only the poster is per-user.
```

**`campaigns.version`** is incremented on every PUT or PATCH save. The frontend tracks `localVersion` and uses it to discard stale WebSocket messages.

**Roles:**
- `admin` — owner of the campaign (set in `campaigns.owner_id`); can add/remove members, create invites, rename/delete
- `editor` — can save changes; also the implicit role for any logged-in user on a public campaign
- `viewer` — read-only; edit/delete/color/pin buttons are hidden, and inline `data-field` inputs render as `disabled`

**Public campaigns:** `is_public = TRUE` grants all logged-in users `editor` access. The Hommlet demo campaign is public. `backfillHommletOwner()` runs on every startup to assign ownership to `matthewkeracher94@gmail.com` once that account exists.

**Invite links:** a single-use token (hex-encoded random bytes) stored in `campaign_invites`. `GetInvite` is public; `AcceptInvite` requires auth and marks the token used. If the accepting user is already the admin, the member row is skipped.

**Schema migration:** `db.Init()` calls `migrateIfNeeded()` which detects the old blob-based schema and migrates automatically. `createTables()` also adds post-launch columns via `ALTER TABLE` — `campaigns.version`, `campaigns.tabs`, `campaigns.ruleset`, `users.username` (backfilled from email), `users.avatar`, `users.home_poster`, `entries.grid_type`, `entries.sort_order` — plus `campaign_invites` and `home_notices` via `CREATE TABLE IF NOT EXISTS`. Safe to run repeatedly.

### Frontend State

All runtime state lives in `src/main.js`:
- `excelDM` — global `EntryManager` instance (the data store)
- `current` — the currently selected `Entry`
- `currentTab` — active category tab string
- `masterEdit` — boolean flag (currently always `true`)

### Data Model (`src/classes.js`)

- **`Entry`** — represents one game object (location, NPC, quest, etc.). Has `title`, `type`, `body` (markdown), `category`, `parent`/`children` for hierarchy, canvas `x`/`y` for map positioning, `gridType` (`hex`/`square`/`none`) for the map grid style, `popOut`/`coords` for floating windows (per-user local state, not synced).
- **`EntryManager`** — holds all entries; exposes `add`, `n` (find by title), `prepareFromJSON`, `resetParentLinks`, and delta-save tracking (`dirtyEntries`, `deletedServerIds`).

### Frontend Module Responsibilities

| File | Role |
|------|------|
| `src/main.js` | App init, global state, `reCurrent()` and `newCurrent()` orchestrators |
| `src/classes.js` | `Entry` and `EntryManager` data classes |
| `src/auth.js` | Auth modal, account modal (change password), `initAuth()`, `authHeaders()`, `ensureEmail()`, token helpers |
| `src/localStorage.js` | Thin re-export facade over `sync.js` + `ws.js`; implements `loadData()` |
| `src/sync.js` | HTTP persistence — `saveData()` (debounced PATCH), `saveDataNow()`, `fetchCampaignData()`, PUT/PATCH with 3-attempt retry; `clientId`; `suppressSave` flag |
| `src/ws.js` | WebSocket lifecycle — `connectWS()`, `disconnectWS()`, delta/full-replace handling, exponential backoff reconnection, version conflict detection |
| `src/syncState.js` | Sync status indicator (`#sync-status` DOM element); manages `httpState` (idle/saving/retrying/saved/error) and `wsState` (disconnected/connecting/connected/reconnecting/updating) |
| `src/syncLog.js` | In-memory ring buffer of last 50 sync events; exposed as `window.__syncLog()` for debugging |
| `src/home.js` | Home screen — `initHome()`, `showHome()`, `addHomeNotice()`, `saveHome()`, `getHomePoster()`, `setHomePoster()`; renders shared notices + per-user map poster. Shown to anon visitors too; for anon, write buttons (Add, Map, Save) are hidden and notice cards render read-only. |
| `src/campaigns.js` | Campaign picker modal — list, create, open worlds, manage members/invites/ruleset; opens when a logged-in user clicks the account button |
| `src/editor.js` | CodeMirror-based modal editor; snippet panel with "Snippets" and "Rules" tabs. Toolbar includes a "# Field" button that inserts a `<span data-field="NAME">0</span>` sentinel for the inline-fields feature. |
| `src/snippets.js` | Personal snippet library in `localStorage` — defaults (treasure tables, magic items, stat blocks), CRUD |
| `src/macroEngine.js` | Safe `{{ }}` template renderer — `roll(XdY)`, `ran(min,max)`, `pick(...)`, `wtable(...)` |
| `src/ruleset.js` | Ruleset client — `fetchRulesets()`, `getRulesetData(category)`; loads the ruleset's JS plugin module from `/src/rulesets/{Name}/index.js` |
| `src/rulesets/{Name}/` | Per-ruleset plugin directory. For BFRPG: `index.js` exports `sections` (drives Rules pane) and `generators` (drives Treasure panel); `formatters.js` formats monsters/spells/items (monster block + one-liner emit `<span data-field="hp">` so DMs can edit rolled HP in play); `npc.js` generates NPC stat blocks (same editable-HP treatment); `treasure.js` rolls gems/jewelry/magic items/potions/scrolls |
| `src/notecard.js` | Notecard factory — `makeNoteCard()`, `makePopOut()`, `loadPopUp()`; all button creation and card assembly. Wires `inlineFields.js` into rendered bodies. The pin (🔒/🔓) button is available on every card type and toggles the per-browser pinned state. |
| `src/inlineFields.js` | `wireInlineFields(bodyEl, entry, opts)` — walks `<span data-field="NAME">value</span>` sentinels in a rendered markdown body, swaps each for an editable `<input>`, and rewrites the matching span inside `entry.body` on change. HTML-escapes user input. Multiple fields per card are addressed by occurrence index. Used by both notecards (`notecard.js`) and home notices (`home.js`); skipped for anon users and disabled for viewer role. |
| `src/pinState.js` | Per-user pinned-card state in browser `localStorage`, keyed by server entry ID. `isPinned()` / `setPinned()`. A pinned card renders at full height and ignores the click-to-collapse toggle. Not synced — each DM has their own pins. |
| `src/dragging.js` | `makeDraggable()` — mouse drag logic for pop-out windows; calls save callback on mouseup |
| `src/popoutState.js` | Per-user pop-out window state persisted in browser `localStorage` (keyed by server entry ID); `setPopOut()`, `clearPopOut()`, `restorePopOuts()` — not synced to server |
| `src/userRole.js` | Role state — `setCurrentRole()`, `getCurrentRole()`, `isViewer()`, `isAdmin()` |
| `src/left.js` | Renders note cards in the left sidebar using `notecard.js`; card click, delete, navigation |
| `src/right.js` | Canvas map — draws grid and draggable location labels; `initMap()`, `draw()`, `HexToMap()` |
| `src/buttons.js` | Header button handlers: Worlds, Save, Add Map, Add, Donate. The `#btn-account` button opens the campaign picker if logged in, otherwise shows the auth modal. `logout()` returns the user to the home screen (not the auth modal). |
| `src/tabs.js` | Tab bar — switches `currentTab`, triggers re-render |
| `src/filter.js` | Category filter UI and compiled filter state |
| `src/hotkeys.js` | Keyboard shortcuts (arrows, Tab, Escape, search). `isEditing()` guard suppresses global hotkeys whenever an `INPUT`/`TEXTAREA`/`contenteditable` is focused (inline-field inputs, modal fields, etc.) — the search bar itself is exempt so it can still be driven by Enter/Escape. |

### App Startup Flow

1. `DOMContentLoaded` fires in `main.js`
2. `initButtons()`, `addHotkeys()`, `initTabs()`, `initMap()` wire up UI
3. Check for `/invite/{token}` URL path:
   - If present: the invite flow still requires auth — show the auth modal first (unless already logged in), then call `handleInviteFlow(token)`.
   - Otherwise: always show the **home screen** — for everyone, including anonymous visitors. The auth modal is not shown automatically.
4. `initAuth(callback)` wires the login modal; on successful login/register it re-renders the home screen and `updateAccountDisplay` swaps the "Log in" pill for the user's avatar/initial.
5. The auth modal only opens when the user clicks the account button (or on the invite route when logged out).
6. From the home screen a logged-in user clicks the account button → opens `showCampaignPicker()`; selecting a campaign calls `openCampaign(id, name)` → `setApiUrl('/api/campaigns/{id}')` → `loadData()`.
7. `loadData()` fetches `GET /api/campaigns/{id}`, populates `excelDM`, restores pop-out state, connects WebSocket.
8. `logout()` disconnects the WS and returns to the home screen (not the auth modal).

**Circular dependency note:** `main.js` ↔ `localStorage.js` ↔ various modules form cycles that are safe because `classes.js` evaluates first. `campaigns.js` must be loaded via dynamic `import()` (not a static import) to avoid breaking the ES module evaluation order.

### Rendering Pattern

User action → update `excelDM` or `current` → call `reCurrent()` in `main.js` → `reCurrent()` calls `draw()`, `updateFilter()`, `loadNoteCards()`, `loadPopUp()`, then `saveData()`. `saveData()` is debounced 500 ms and sends a `PATCH` request with only dirty/deleted entries. If any dirty entry lacks a `_serverId` (new entry), it falls back to a full `PUT`.

`reCurrent()` skips marking `current` as dirty when `isSuppressSave()` is true (set during WebSocket-triggered updates to prevent re-save loops).

### Real-time Collaboration

After loading a campaign, `localStorage.js` opens a WebSocket via `ws.js` to `/api/campaigns/{id}/ws?token=JWT&clientId=X`.

**Message types from server:**
- `{ type: "patch", version, updated: [...], deletedIds: [...] }` — delta update; applies only changed entries, skips locally dirty ones
- `{ type: "reload", version }` — signals a full PUT happened; client fetches current state via `GET` rather than pushing the full payload over WS

**Version tracking:** each campaign has a monotonically incrementing `version` (incremented server-side on every save). The frontend tracks `localVersion` and discards any WS message whose version is ≤ local.

**Conflict handling:** on a full replace, any locally dirty entries are flushed via `saveDataNow()` before applying the remote state. For delta patches, dirty entries are skipped in `applyDelta()` and kept locally.

**Reconnection:** `ws.js` reconnects with exponential backoff (up to 30 s) on disconnect. On reconnect, if there are no pending local edits, it catches up by issuing a fresh `GET`.

**Pop-out state** (`popOut`, `coords`) is per-user local state stored in browser `localStorage` via `popoutState.js` — it is stripped from all PUT/PATCH payloads and restored from `localStorage` after every WS update.

### Cache Busting

`Cache-Control: no-store` is set only for the `/invite/{token}` SPA route. All other static files are served by `http.FileServer` without special cache headers — Cloudflare's edge cache behaviour applies. When deploying JS/CSS/HTML changes, use `bash deploy.sh --frontend-only` which will cause Cloudflare to serve fresh files after cache expiry.

### Data Files

- `data/Excel_DM.json` — blank campaign template (unused now that campaigns are DB-backed)
- `data/Hommlet.json` — large demo campaign (~8.9MB); seeded into DB once, not re-served as a file
- `data/Hommlet.md`, `data/treasure.md` — source/authoring docs (not served to the app)
- `data/BFRPG/manifest.json` — ruleset manifest (`id`, `name`, `description`, `version`, `module`, `files`). The `module` field points to the plugin entrypoint (e.g. `/src/rulesets/BFRPG/index.js`).
- `data/BFRPG/monsters.json` — 353 monsters (structured: `name`, `ac`, `hd`, `attacks`, `damage`, `movement`, `xp`, `family`, `special`, `oneLiner`)
- `data/BFRPG/spells.json` — 117 spells (structured: `name`, `class`, `level`, `range`, `duration`, `description`, `oneLiner`)
- `data/BFRPG/items.json` — 435 items (structured: `name`, `category`, `cost`, `weight`, `damage`, `ac`, `size`, `description`, `oneLiner`)
- `data/BFRPG/classes.json` — 6 character classes
- `data/BFRPG/races.json` — 4 races
- `data/BFRPG/BF-BeginnersEssentials-r18.odt`, `data/BFRPG/monsters.md` — source/authoring docs (not served)

**Adding a new ruleset:** create `data/{Name}/manifest.json` + data JSON files, and (if the ruleset needs custom formatting or generators) a plugin at `src/rulesets/{Name}/index.js` exporting `sections` and `generators`. Set `manifest.module` to the plugin path. No backend code changes needed — `ListRulesets` discovers directories automatically.

### Entry Types

The seven tabs/types: `locations`, `people`, `quests`, `monsters`, `spells`, `items`, `misc`

### Inline Editable Fields

Authors can embed editable values directly in a markdown body using a `<span data-field="NAME">value</span>` sentinel. Any span with a `data-field` attribute is swapped at render time for a small text input; editing the input rewrites the matching span's inner text inside `entry.body` and flows through the existing debounced PATCH pipeline (no schema change — the markdown is the storage).

- **Authoring:** the editor toolbar's **# Field** button inserts a template sentinel (using the current CodeMirror selection as the field name if any).
- **Multiple per card:** spans with the same `data-field` name are addressed by their occurrence index in the body source. Structural changes only happen via the editor modal (which fully replaces the body), so the index stays stable between inline edits.
- **Save behaviour:** on `focus` the entry is marked dirty (so concurrent WS patches don't overwrite mid-type); on `change`/blur/Enter the body is rewritten and saved. Escape reverts and skips save. User input is HTML-escaped before being written into the body.
- **Scope:** wired into notecards (including pop-outs) and home-notice cards (for logged-in users). The editor-modal live preview renders the spans as plain text, not editable inputs — the modal's CodeMirror is the source-of-truth authoring surface.
- **BFRPG integration:** monster blocks, monster one-liners, NPC blocks, and NPC one-liners all emit `<span data-field="hp">...</span>` so the rolled HP is per-instance editable for live combat tracking.

### Pinning Cards

The pin button (🔓/🔒) on any notecard toggles a **per-browser** pinned state stored in `localStorage` via `src/pinState.js`. A pinned card:

- Starts fully expanded on render and ignores the click-to-collapse toggle — useful for keeping combatants / active quest cards visible.
- Is a personal workspace preference; nothing syncs to the server, so two DMs on the same campaign can pin different cards.

Pinning is not the same as the old "attach to current location" behaviour (which reparented the entry). Changing the pinned state has no effect on `entry.parent`.
