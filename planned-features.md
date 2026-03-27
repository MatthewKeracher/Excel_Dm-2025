# Planned features

## ✅ Add a database backend (Go + SQLite)
Built a Go REST API using `net/http`. Replaced the IndexedDB persistence layer with API calls (`fetch`) to Go endpoints. The Go server reads/writes campaign data to a SQLite database (`exceldm.db`) via `modernc.org/sqlite`. Code is split into `handlers`, `db`, and `models` packages. Endpoints: `GET /api/campaigns`, `PUT /api/campaigns`. The entire campaign is stored as a single JSON blob per user.

## ✅ Figure out what belongs in the backend and frontend
Backend owns: data persistence, user authentication, authorization (JWT middleware scopes all queries to the authenticated user). Frontend owns: rendering, UI state, map canvas, editor, and all presentation logic. `classes.js` models (`Entry`, `EntryManager`) remain on the frontend as a local cache synced via the API. `localStorage.js` now makes API calls instead of using IndexedDB. `src/auth.js` handles the login/register modal, token storage, and auth headers.

## ✅ Add user support
`users` table with bcrypt-hashed passwords. `POST /api/register` and `POST /api/login` return a signed JWT. JWT is stored in browser `localStorage` and sent as a `Bearer` token on every request. Go middleware (`middleware/auth.go`) validates the JWT and injects the user ID into the request context. All campaign queries are scoped to the authenticated user.

## ✅ Make it hostable in an Incus container
Created an Alpine Linux 3.21 Incus container named `exceldm` on heimvon. Compiled `exceldm-linux-amd64` binary and copied frontend files into `/opt/exceldm/exceldm/` inside the container, with the binary in a `backend/` subdirectory so `../` correctly resolves to the frontend root. Configured an OpenRC service (`/etc/init.d/exceldm`) that starts on boot (`rc-update add exceldm default`). Logs go to `/var/log/exceldm/app.log`. Exposed via an Incus proxy device on host port `8081` → container port `8080`. `JWT_SECRET` passed via the init script environment. SQLite DB lives inside the container at the binary's working directory.

## ✅ Use Cloudflare tunnels to make it available online
Installed `cloudflared` manually inside the `exceldm` container (not in Alpine repos — downloaded binary directly). Authenticated with `cloudflared tunnel login`, created a named tunnel (`cloudflared tunnel create exceldm`), and wrote a `config.yml` pointing at `localhost:8080`. Added a CNAME DNS record via `cloudflared tunnel route dns exceldm excel-dm.com` (first deleted conflicting A records in the Cloudflare dashboard). Installed as an OpenRC service with `cloudflared service install` and enabled at boot with `rc-update add cloudflared default`. App is live at `https://excel-dm.com` and `https://www.excel-dm.com` with automatic HTTPS — no port forwarding or public IP needed.

## ✅ Public campaigns (Hommlet lives in DB, anyone can load it)
Added `public_campaigns` table seeded from `Hommlet.json` on first run. Added `GET/PUT /api/public/{name}` endpoints (auth required, any logged-in user can read/write). Renamed the "Demo" button to "Hommlet". Frontend loads from and saves to the shared public campaign via a switchable `apiUrl` in `localStorage.js`. Save button now explicitly flushes to server; Load button renamed to "Add Map" and handles image uploads only.

## ✅ Save/Load buttons use server instead of local files
Save button triggers an immediate server flush (`saveDataNow`). Load button renamed to "Add Map" and handles image uploads only. DB auto-save (500ms debounce) remains for all other changes.

## ✅ Normalize campaign storage (entries table with FK parent relationships)
Replaced the single JSON blob per campaign with two normalized tables: `campaigns` (id, owner_id, name, is_public, categories) and `entries` (id, campaign_id, title, type, body, color, image, x, y, coords, pop_out, current_child, parent_id). Parent/child relationships stored as proper FK references instead of array indices. Auto-migrates old blob data on startup. API surface is unchanged — frontend serializes/deserializes to/from the old array-index format transparently. `public_campaigns` table merged into `campaigns` via `is_public` flag. Foundation is now ready for delta saves and WebSocket broadcasting.

## ✅ Real-time collaborative editing via WebSockets
Added `github.com/gorilla/websocket`. A per-campaign hub (`hub.go`) tracks connected clients keyed by campaign (`user:{id}` or `public:{name}`). On each PUT save, the server broadcasts the full updated campaign to all other connected clients, excluding the sender via `X-Client-ID` header. Frontend assigns a UUID per browser tab (`clientId`), connects to `/api/campaigns/ws` or `/api/public/{name}/ws` on load (JWT passed as `?token=` query param), and applies incoming messages via `applyRemoteUpdate()` with a `_suppressSave` flag to prevent re-save loops. Auto-reconnects after 2s on disconnect. Fixed a SQLite FK constraint bug (self-referential `parent_id` on the entries table) that was causing all saves to return 500 — fixed by nulling `parent_id` references before deleting entries. Hommlet JSON seed removed; DB is the sole source of truth for Hommlet.

## ✅ Delta saves (send only changed entries)
Each edit sends a `PATCH` request with only the modified entry (using its server-assigned `_serverId`). Full `PUT` is only used when new entries exist (no `_serverId` yet); server returns the ordered ID list so `_serverId` is populated for all entries immediately. `EntryManager` tracks `dirtyEntries` (Set) and `deletedServerIds` (Set). `reCurrent()` marks the current entry dirty; `deleteEntry()` tracks deleted server IDs. `clearDirtyState()` is called after load and after remote WS updates to prevent spurious saves.


## ✅ Login screen branding
Replaced the "Excel_DM" text `<h2>` in the login modal with `<img src="assets/logo.gif">`. Styled with `display:block; margin:auto`.

## ✅ Campaign worlds with ownership and permissions
Named worlds model: any user can create a campaign world and is automatically **admin**. A `campaign_members` table tracks editor/viewer roles. `GET /api/campaigns` returns all campaigns the user owns, is a member of, or that are public. After login a campaign picker modal is shown listing all accessible worlds with role badges. "Create World" creates a new campaign via `POST /api/campaigns`. All CRUD and WS endpoints are now `GET/PUT/PATCH /api/campaigns/{id}` and `GET /api/campaigns/{id}/ws`. The old `/api/public/{name}` routes are removed. Hommlet's owner_id is backfilled to matthewkeracher94@gmail.com on every startup. Public campaigns (is_public=TRUE) are visible to all logged-in users with editor role. The "Hommlet" button is replaced by the campaign picker; the "New" button opens the picker.

### Roles
- **Admin** — full read/write access; can invite/remove users; can lock entries; owns the campaign. Hommlet is owned by matthewkeracher94@gmail.com.
- **Editor** — can read and write entries but cannot lock them, change permissions, or delete the campaign.
- **Viewer** — read-only; cannot make changes.

### Data model changes needed
- `campaigns` table gains no new columns — ownership is already `owner_id`.
- New `campaign_members` table: `(campaign_id, user_id, role ENUM('admin','editor','viewer'))`. The owner is implicitly admin and does not need a row here (or always has one seeded on campaign creation).
- New `campaign_invites` table (optional): token-based invite links so users don't need to know each other's user IDs.
- `GET /api/campaigns` returns all campaigns the user is a member of or owns.
- `POST /api/campaigns` creates a new campaign (user becomes admin).
- `PUT/PATCH /api/campaigns/{id}` requires editor or admin role.
- `POST /api/campaigns/{id}/members` (admin only) — add a user by email with a role.
- `DELETE /api/campaigns/{id}/members/{userId}` (admin only) — remove a member.

### Frontend changes needed
- Campaign picker shown after login: lists all campaigns the user has access to, with their role shown. Buttons to create a new campaign or open an existing one.
- "Hommlet" button replaced by the campaign picker (Hommlet appears in the list for all users as admin matthewkeracher94@gmail.com owns it).
- Role is included in the JWT or returned from `GET /api/campaigns` so the frontend can hide write controls for viewers.

## Locked entries (admin password gate)
Admins can lock individual entries so their content is hidden behind a password prompt.

- New `locked` boolean and `lock_hash` text column on the `entries` table.
- Lock symbol (🔒) added to the notecard ribbon of buttons. Clicking it (admin only) prompts for a password and stores its bcrypt hash on the entry.
- When a viewer or editor opens a locked entry, they see a password prompt instead of the content. Correct password reveals it for the session (not permanently).
- Locked entries are still visible in the entry list (title shown) but body/image are redacted in API responses unless the request includes the correct password.
- Admins can unlock (remove the lock) by clicking the lock symbol again and confirming their password.

## Pop-outs are per-user, not global
Pop-out state (`popOut`, `coords`) should not be broadcast to other connected clients and should not be saved to the shared campaign. Options:
- Store `popOut` and `coords` in browser `localStorage` keyed by `_serverId`, separate from the server-synced data.
- Strip `popOut`/`coords` from PATCH/PUT payloads entirely; server never stores them.
- On WS receive, `applyRemoteUpdate` preserves the local tab's pop-out state rather than overwriting it.

## Multiple campaigns per user + campaign picker UI
Already partly covered by the ownership model above. Additional UX:
- After login, show a dashboard/picker listing all campaigns the logged-in user can access.
- "New Campaign" button creates a named world and opens it.
- Campaign name shown in the header while editing.
- Users can have multiple campaigns; switching campaigns reconnects the WS to the new campaign key.
