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
Installed `cloudflared` manually inside the `exceldm` container (not in Alpine repos — downloaded binary directly). Authenticated with `cloudflared tunnel login`, created a named tunnel (`cloudflared tunnel create exceldm`), and wrote a `config.yml` pointing at `localhost:8080`. Added a CNAME DNS record via `cloudflared tunnel route dns exceldm excel-dm.com` (first deleted conflicting A records in the Cloudflare dashboard). Installed as an OpenRC service with `cloudflared service install` and enabled at boot with `rc-update add cloudflared default`. App is live at `https://excel-dm.com` with automatic HTTPS — no port forwarding or public IP needed.

## Multiple campaigns per user + campaign picker UI
Add a `name` column to the `campaigns` table and drop the `user_id` primary key constraint so a user can have multiple campaigns. Add `GET /api/campaigns` (list) and `POST /api/campaigns` (create) endpoints alongside the existing load/save. Frontend needs a campaign picker — shown after login — to select, create, or delete campaigns before entering the app.

## Public campaigns (Hommlet lives in DB, anyone can load it)
Add an `is_public` boolean and `owner_id` (nullable) to `campaigns`. Seed Hommlet into the DB as a public campaign on first run. Rename the "Demo" button to "Hommlet" and have it load the public Hommlet campaign by ID. Any logged-in user can load it; saves go to a copy in their own account (load-then-fork, not overwrite).

## Shared campaigns (collaborative editing)
Add a `campaign_members` join table (`campaign_id`, `user_id`, `role`: owner/editor). Members can load and save a shared campaign. Use last-write-wins with the existing 500ms auto-save — no real-time sync needed for a DM tool. Add an invite flow (share by email or campaign ID) and a UI to switch between private and shared campaigns.
