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

## Real-time collaborative editing via WebSockets
With normalized storage in place, concurrent edits can now be handled efficiently:
- **Backend**: add `github.com/gorilla/websocket`. A hub per campaign tracks connected clients. When a `PUT /api/campaigns/{id}/entries/{id}` delta save arrives, broadcast only the changed entry to all other connected clients
- **Frontend**: connect to `WS /api/campaigns/{id}/ws` on load; on incoming broadcast, update the matching entry in `excelDM` and call `reCurrent()` to re-render
- Conflicts resolve as last-write-wins per entry — users see each other's changes within ~500ms

## Delta saves (send only changed entries)
Currently the full campaign is sent on every save. With the normalized DB:
- Track dirty entries in a `Set` on the frontend
- On save: POST new entries (get back server ID), PUT changed entries by ID, DELETE removed entries by ID
- Requires `Entry.id` to be populated from the server on load and creation

## Multiple campaigns per user + campaign picker UI
The `campaigns` table already supports multiple campaigns per user (`owner_id` + `name`). Next steps:
- Add `GET /api/campaigns` (list all user campaigns) and `POST /api/campaigns` (create new)
- Frontend: show a campaign picker after login to select, create, or delete campaigns
- Currently each user has one personal campaign; picker makes multiple campaigns accessible
