# Planned features

## Add a database backend (prefer using golang for this)
Build a Go REST API using the standard `net/http` package or a lightweight router like `chi`. Replace the current IndexedDB persistence layer with API calls (`fetch`) to Go endpoints. The Go server will read/write campaign data to a database (PostgreSQL is a good fit). Define endpoints like `GET /entries`, `POST /entries`, `PUT /entries/:id`, `DELETE /entries/:id`. Use `encoding/json` to marshal/unmarshal `Entry` structs. Start with a single `main.go` and split into packages (`handlers`, `db`, `models`) as it grows.

## Figure out what belongs in the backend and frontend
The backend should own: data persistence, user authentication, authorization (who can see which campaign), and business logic that must be trusted (e.g. enforcing ownership). The frontend should own: rendering, UI state, map canvas, the editor, and all presentation logic. The current `classes.js` models (`Entry`, `EntryManager`) can stay on the frontend as a local cache, synced with the API. `localStorage.js` gets replaced by API calls. Anything touching raw data storage or secrets moves to Go; anything touching the DOM stays in JavaScript.

## Add user support
Add a users table to the database with hashed passwords (use `bcrypt` in Go). Implement `POST /register` and `POST /login` endpoints that return a signed JWT. Store the JWT in `localStorage` on the frontend and send it as a `Bearer` token in the `Authorization` header on every API request. On the Go side, write middleware that validates the JWT and attaches the user ID to the request context. Scope all entry queries to the authenticated user's ID so users only see their own campaigns.

## Make it hostable in a container
Write a `Dockerfile` with two stages: a Go builder stage (`FROM golang:1.23 AS builder`) that compiles the binary, and a minimal runtime stage (`FROM alpine`) that copies in the binary and static frontend files. Expose port `8080`. Add a `docker-compose.yml` that defines two services: the app container and a PostgreSQL container, linked by a shared network. Pass database credentials via environment variables. The Go server should serve the static `index.html` and JS files from an embedded `embed.FS` or a mounted volume so there is only one container to run for the app itself.

## Use Cloudflare tunnels to make it available online
Install `cloudflared` and authenticate with your Cloudflare account. Run `cloudflared tunnel create exceldm` to create a named tunnel, then configure a `config.yml` pointing the tunnel at `localhost:8080`. Add a DNS CNAME in Cloudflare pointing your chosen subdomain to the tunnel ID. Run `cloudflared tunnel run exceldm` as a service (or add it to your `docker-compose.yml` as a sidecar). No port forwarding or public IP is needed — Cloudflare proxies all traffic through their network, giving you HTTPS automatically via your domain's SSL certificate.
