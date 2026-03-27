# Planned features

## ✅ Add a database backend (Go + SQLite)
Built a Go REST API using `net/http`. Replaced the IndexedDB persistence layer with API calls (`fetch`) to Go endpoints. The Go server reads/writes campaign data to a SQLite database (`exceldm.db`) via `modernc.org/sqlite`. Code is split into `handlers`, `db`, and `models` packages. Endpoints: `GET /api/campaigns`, `PUT /api/campaigns`. The entire campaign is stored as a single JSON blob per user.

## ✅ Figure out what belongs in the backend and frontend
Backend owns: data persistence, user authentication, authorization (JWT middleware scopes all queries to the authenticated user). Frontend owns: rendering, UI state, map canvas, editor, and all presentation logic. `classes.js` models (`Entry`, `EntryManager`) remain on the frontend as a local cache synced via the API. `localStorage.js` now makes API calls instead of using IndexedDB. `src/auth.js` handles the login/register modal, token storage, and auth headers.

## ✅ Add user support
`users` table with bcrypt-hashed passwords. `POST /api/register` and `POST /api/login` return a signed JWT. JWT is stored in browser `localStorage` and sent as a `Bearer` token on every request. Go middleware (`middleware/auth.go`) validates the JWT and injects the user ID into the request context. All campaign queries are scoped to the authenticated user.

## Make it hostable in an Incus container
Deploy into an Alpine Linux Incus container on the server (not OCI/Docker). Copy in the compiled Go binary and frontend files, and mount a host directory for `exceldm.db` persistence. Configure the binary to run as an OpenRC service (`/etc/init.d/exceldm`) so it starts on boot and restarts on failure. Log output to a file (e.g. `/var/log/exceldm/app.log`) rather than stdout — use `stderr_logger` or redirect in the init script. Expose port `8080` via an Incus proxy device. Pass `JWT_SECRET` via the init script environment. Because the database is SQLite, no additional database service is needed inside the container.

## Use Cloudflare tunnels to make it available online
Install `cloudflared` and authenticate with your Cloudflare account. Run `cloudflared tunnel create exceldm` to create a named tunnel, then configure a `config.yml` pointing the tunnel at `localhost:8080`. Add a DNS CNAME in Cloudflare pointing your chosen subdomain to the tunnel ID. Run `cloudflared tunnel run exceldm` as a service (or add it to your `docker-compose.yml` as a sidecar). No port forwarding or public IP is needed — Cloudflare proxies all traffic through their network, giving you HTTPS automatically via your domain's SSL certificate.
