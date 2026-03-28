# Completed Features

## Viewer enforcement
Role stored in `src/userRole.js` (`setCurrentRole`, `isViewer`, `isAdmin`). Set when opening a campaign via `campaigns.js`. `document.body.dataset.role` drives CSS that hides Save, Add, Add Map buttons and all write controls (edit, delete, color, pop-out) on notecards for viewers. A "👁 Read Only" badge appears in the header. Map label dragging is also blocked for viewers via a JS guard in `right.js`.

## Locked entries (admin password gate)
New `locked BOOLEAN` and `lock_hash TEXT` columns on the `entries` table (additive migration). Admins see a 🔓/🔐 button on each notecard. Clicking prompts for a password — server bcrypt-hashes and stores it (`locked=true`); clicking again prompts to verify and remove the lock (`locked=false`). `PATCH` includes `locked` + `lockPassword`; server handles hashing/verification. API responses redact `body` and `image` to `""` for locked entries, with `locked: true` included so the frontend knows. Any authenticated user with campaign access can call `POST /api/campaigns/{id}/entries/{entryId}/unlock` with `{ password }` to retrieve the real content. Correct password shows the entry for the session only (tracked in `userRole.js` `_unlockedIds` Set, cleared on campaign switch).

## Campaign management UI
Gear icon (⚙) on admin campaigns in the picker opens a settings view within the same modal. Rename field with live header update, members list with remove buttons, add-by-email + role selector, and a danger-zone delete button with confirmation. New backend endpoints: `PATCH /api/campaigns/{id}/settings` (rename), `DELETE /api/campaigns/{id}` (delete + cascade), `GET /api/campaigns/{id}/members` (list), `DELETE /api/campaigns/{id}/members/{userId}` (remove).

## Pop-outs are per-user, not global
`src/popoutState.js` — localStorage store keyed by `_serverId`. `setPopOut`, `clearPopOut`, `restorePopOuts` manage per-tab pop-out visibility and window coordinates. `popOut` and `coords` stripped from PATCH and PUT payloads so they are never synced to the server. `restorePopOuts()` called after every page load and WS update so pop-out windows survive reconnects and remote campaign resyncs without affecting other users' views. Deleting an entry also clears its localStorage entry.

## Sync bug fixes (from SYNC.md analysis)

### 1. Dirty set snapshot on save (Bug 1)
`putToServer` and `patchToServer` now snapshot `dirtyEntries` and `deletedServerIds` before the `await fetch(...)`. On success, only the snapshotted entries are removed from the live sets. Edits made during an in-flight save are preserved and will be sent on the next debounce tick.

### 2. Concurrent save guard (Bug 2)
Added `_saving` flag to `pushWithRetry`. A second call while a save is in flight returns immediately, preventing multiple retry loops from stacking on slow networks.

### 3. Catch-up GET on WS reconnect (Bug 3)
`ws.onopen` now issues a `fetchCampaignData()` call if `localVersion` is behind the server. Only runs when there are no pending local dirty entries (to avoid overwriting unsaved changes). Logs `WS CATCHUP v10 → v15` to the sync log.

### 4. Broadcast version race (Bug 4)
`patchEntries` now uses `RETURNING version` to capture the committed version within the transaction and returns it as `(int64, error)`. The committed version is passed directly into `serializePatchDelta` rather than re-reading from DB, eliminating the race where a concurrent save could cause the wrong version to be broadcast.

### 5. WS send buffer overflow closes connection (Bug 5)
`hub.broadcast` now collects clients whose send channel is full (after releasing the read lock to avoid deadlock) and closes their connections. The client reconnects via the existing 5s retry and issues a catch-up GET on `onopen`.

## Add a database backend (Go + SQLite)
Built a Go REST API using `net/http`. Replaced the IndexedDB persistence layer with API calls (`fetch`) to Go endpoints. The Go server reads/writes campaign data to a SQLite database (`exceldm.db`) via `modernc.org/sqlite`. Code is split into `handlers`, `db`, and `models` packages. Endpoints: `GET /api/campaigns`, `PUT /api/campaigns`. The entire campaign is stored as a single JSON blob per user.

## Figure out what belongs in the backend and frontend
Backend owns: data persistence, user authentication, authorization (JWT middleware scopes all queries to the authenticated user). Frontend owns: rendering, UI state, map canvas, editor, and all presentation logic. `classes.js` models (`Entry`, `EntryManager`) remain on the frontend as a local cache synced via the API. `localStorage.js` now makes API calls instead of using IndexedDB. `src/auth.js` handles the login/register modal, token storage, and auth headers.

## Add user support
`users` table with bcrypt-hashed passwords. `POST /api/register` and `POST /api/login` return a signed JWT. JWT is stored in browser `localStorage` and sent as a `Bearer` token on every request. Go middleware (`middleware/auth.go`) validates the JWT and injects the user ID into the request context. All campaign queries are scoped to the authenticated user.

## Make it hostable in an Incus container
Created an Alpine Linux 3.21 Incus container named `exceldm` on heimvon. Compiled `exceldm-linux-amd64` binary and copied frontend files into `/opt/exceldm/exceldm/` inside the container, with the binary in a `backend/` subdirectory so `../` correctly resolves to the frontend root. Configured an OpenRC service (`/etc/init.d/exceldm`) that starts on boot (`rc-update add exceldm default`). Logs go to `/var/log/exceldm/app.log`. Exposed via an Incus proxy device on host port `8081` → container port `8080`. `JWT_SECRET` passed via the init script environment. SQLite DB lives inside the container at the binary's working directory.

## Use Cloudflare tunnels to make it available online
Installed `cloudflared` manually inside the `exceldm` container (not in Alpine repos — downloaded binary directly). Authenticated with `cloudflared tunnel login`, created a named tunnel (`cloudflared tunnel create exceldm`), and wrote a `config.yml` pointing at `localhost:8080`. Added a CNAME DNS record via `cloudflared tunnel route dns exceldm excel-dm.com` (first deleted conflicting A records in the Cloudflare dashboard). Installed as an OpenRC service with `cloudflared service install` and enabled at boot with `rc-update add cloudflared default`. App is live at `https://excel-dm.com` and `https://www.excel-dm.com` with automatic HTTPS — no port forwarding or public IP needed.

## Public campaigns (Hommlet lives in DB, anyone can load it)
Added `public_campaigns` table seeded from `Hommlet.json` on first run. Added `GET/PUT /api/public/{name}` endpoints (auth required, any logged-in user can read/write). Renamed the "Demo" button to "Hommlet". Frontend loads from and saves to the shared public campaign via a switchable `apiUrl` in `localStorage.js`. Save button now explicitly flushes to server; Load button renamed to "Add Map" and handles image uploads only.

## Save/Load buttons use server instead of local files
Save button triggers an immediate server flush (`saveDataNow`). Load button renamed to "Add Map" and handles image uploads only. DB auto-save (500ms debounce) remains for all other changes.

## Normalize campaign storage (entries table with FK parent relationships)
Replaced the single JSON blob per campaign with two normalized tables: `campaigns` (id, owner_id, name, is_public, categories) and `entries` (id, campaign_id, title, type, body, color, image, x, y, coords, pop_out, current_child, parent_id). Parent/child relationships stored as proper FK references instead of array indices. Auto-migrates old blob data on startup. API surface is unchanged — frontend serializes/deserializes to/from the old array-index format transparently. `public_campaigns` table merged into `campaigns` via `is_public` flag. Foundation is now ready for delta saves and WebSocket broadcasting.

## Real-time collaborative editing via WebSockets
Added `github.com/gorilla/websocket`. A per-campaign hub (`hub.go`) tracks connected clients keyed by campaign. On each PUT save, the server broadcasts the full updated campaign to all other connected clients, excluding the sender via `X-Client-ID` header. Frontend assigns a UUID per browser tab (`clientId`), connects to `/api/campaigns/{id}/ws` on load (JWT passed as `?token=` query param), and applies incoming messages via `applyRemoteUpdate()` with a `_suppressSave` flag to prevent re-save loops. Auto-reconnects after 5s on disconnect. Fixed a SQLite FK constraint bug (self-referential `parent_id` on the entries table) that was causing all saves to return 500.

## Delta saves (send only changed entries)
Each edit sends a `PATCH` request with only the modified entry (using its server-assigned `_serverId`). Full `PUT` is only used when new entries exist (no `_serverId` yet); server returns the ordered ID list so `_serverId` is populated for all entries immediately. `EntryManager` tracks `dirtyEntries` (Set) and `deletedServerIds` (Set). `reCurrent()` marks the current entry dirty; `deleteEntry()` tracks deleted server IDs. `clearDirtyState()` is called after load and after remote WS updates to prevent spurious saves.

## Login screen branding
Replaced the "Excel_DM" text `<h2>` in the login modal with `<img src="assets/logo.gif">`. Styled with `display:block; margin:auto`.

## Campaign worlds with ownership and permissions
Named worlds model: any user can create a campaign world and is automatically **admin**. A `campaign_members` table tracks editor/viewer roles. `GET /api/campaigns` returns all campaigns the user owns, is a member of, or that are public. After login a campaign picker modal is shown listing all accessible worlds with role badges. "Create World" creates a new campaign via `POST /api/campaigns`. All CRUD and WS endpoints are now `GET/PUT/PATCH /api/campaigns/{id}` and `GET /api/campaigns/{id}/ws`. The old `/api/public/{name}` routes are removed. Hommlet's owner_id is backfilled to matthewkeracher94@gmail.com on every startup. Public campaigns (is_public=TRUE) are visible to all logged-in users with editor role.

**Roles:**
- **Admin** — full read/write access; can invite/remove users; owns the campaign.
- **Editor** — can read and write entries.
- **Viewer** — read-only (future enforcement).

---

## Structural refactors

### Break circular dependency (`classes.js` ↔ `main.js`)
`classes.js` is now a pure data model with zero imports. UI callbacks moved out as injected dependencies.

### Split `left.js` (556 lines, 5 responsibilities)
Split into `notecard.js` (card rendering, button factories, popout), `dragging.js` (drag utility), and a slim `left.js` (~90 lines, entry filtering only).

### Split `localStorage.js` into `sync.js` + `ws.js`
HTTP save/load (`sync.js`) and WebSocket real-time sync (`ws.js`) are now separate files. `localStorage.js` is a thin orchestrator.

### Refactor `hotkeys.js` to use a command dispatch table
Replaced the single 180-line `keydown` handler with a `key → handler` map.

### Fix transaction rollback semantics in `helpers.go`
`defer tx.Rollback()` now uses named returns and a conditional rollback that only fires when `err != nil`.

### Inject or encapsulate `globalHub`
`globalHub` wrapped with proper error logging on broadcast failures; goroutines log serialization errors.

### Fix ignored errors
`LastInsertId()` and similar calls now handle errors properly.

### Use stable server IDs for parent-child references on the wire
Parent-child references now use server-assigned IDs instead of fragile array indices throughout the API and frontend.

---

## Real-time sync improvements

### 1. Sync state machine + UI indicator
`src/syncState.js` — explicit state machine: `idle → saving → retrying → saved / error` for HTTP and `connecting → connected → reconnecting` for WebSocket. Small status badge in the header reflects current state.

### 2. Sequence numbers on WS messages
Monotonic `version` integer on `campaigns` table, incremented on every PUT/PATCH. WS broadcasts include version; clients reject stale broadcasts (`incomingVersion <= localVersion → discard`).

### 3. Structured client sync log
`src/syncLog.js` — 50-entry ring buffer. `syncLog(type, detail)` wired into `sync.js` and `ws.js`. Exposed via `window.__syncLog()` → `console.table`. Server-side: broadcast goroutines log `campID`, `clients`, and `bytes` to `app.log`.

### 4. Retry with backoff on save failures
`pushWithRetry()` retries failed saves at 1s / 2s / 4s. Status badge shows "Retrying…" between attempts, "Save failed" only after all retries exhausted.

### 5. Delta WS broadcast
PATCH broadcasts send only the delta — `{type:"patch", updated:[...], deletedIds:[...], version:N}`. Client `applyDelta()` updates entries in-place, resets parent links, re-runs `prepareFromJSON`. PUT still broadcasts the full campaign.

### 6. Investigate and document sync edge cases
Static code analysis documented in `SYNC.md`: 5 confirmed-correct behaviors, 5 known bugs with root causes and proposed fixes, full edge case reference table, and a manual verification checklist.
