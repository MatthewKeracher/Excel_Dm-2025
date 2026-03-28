# Planned features

---

## WS / Real-Time Sync Fixes

Issues identified via architecture review of `ws.js`, `sync.js`, `hub.go`, `ws.go`, `helpers.go`.

---

### 1. ~~Fix: `clearDirtyState()` discards unsaved local edits~~ — DONE

**File:** `src/ws.js:109`

**Problem:** When a remote WS message arrives, `applyRemoteUpdate` calls `excelDM.clearDirtyState()` unconditionally. If the user has local edits that are still in the debounce window (not yet pushed), those edits are erased before the save timer fires.

**Fix:**
- Before calling `applyRemoteUpdate` on an incoming message, check if there are pending dirty entries.
- If dirty entries exist, flush them immediately (`saveDataNow()`) before applying the remote update, or skip clearing dirty state and only overwrite entries that are not locally dirty.
- The simpler/safer approach: in `applyDelta`, skip overwriting entries that are in `excelDM.dirtyEntries`.
- Only call `clearDirtyState()` after a successful save, never in response to a remote update.

---

### 2. Fix: JWT in WebSocket URL query string — MEDIUM

**File:** `src/ws.js:24`, `backend/handlers/ws.go`

**Problem:** `?token=<JWT>` is appended to the WebSocket URL. The token appears in server access logs, Cloudflare tunnel logs, browser history, and `Referer` headers sent to third-party resources.

**Fix:**
- After the WebSocket handshake, have the client send the JWT as the first text message (an auth frame).
- The server holds the connection in an "unauthenticated" state until it receives and validates this frame, then registers the client with the hub.
- Remove `wsAuth` query-param parsing; replace with a message-based auth step in `readPump`.
- Alternatively, issue a short-lived one-time token via a `POST /api/campaigns/{id}/ws-ticket` REST call and pass that in the URL instead of the long-lived JWT.

---

### 3. ~~Fix: N+1 queries in `serializePatchDelta`~~ — DONE

**File:** `backend/handlers/helpers.go:152`

**Problem:** For each entry in `patch.Updated`, a separate `SELECT` query is issued. For large patches this hits SQLite once per entry.

**Fix:**
- Collect all `ServerID` values from `patch.Updated` into a slice.
- Issue a single `SELECT ... FROM entries WHERE id IN (?, ?, ...) AND campaign_id = ?` query.
- Build a `map[int64]responseEntry` from the results and iterate `patch.Updated` to preserve original ordering.

---

### 4. ~~Fix: PUT broadcast sends full campaign payload~~ — DONE

**File:** `backend/handlers/campaign.go:173`

**Problem:** After a PUT save (triggered whenever a new entry is created), `serializeCampaign` serializes every entry and broadcasts the full payload to all clients. For large campaigns this can be many MB, which can fill the 64-slot send buffer and trigger the overflow path that forcibly disconnects clients.

**Fix:**
- After a successful PUT, the server returns the new `ids` array. Use those IDs to construct a delta broadcast (type `"patch"`, all entries marked as updated) rather than re-serializing the whole campaign.
- Alternatively, treat the PUT response on the client as authoritative (server IDs are already returned), and have the server broadcast a minimal "reload" signal so other clients issue a GET rather than receiving the full payload over WS.

---

### 5. ~~Fix: Fixed 5s WS reconnect interval~~ — DONE

**File:** `src/ws.js:63`

**Problem:** All clients reconnect at a fixed 5-second interval. During a server restart all clients hammer it simultaneously.

**Fix:**
- Implement exponential backoff with jitter: start at 1s, double each attempt, cap at 30s, add ±20% random jitter.
- Example: `delay = Math.min(30000, 1000 * 2 ** attempt) * (0.8 + Math.random() * 0.4)`
- Reset the backoff counter on a successful connection.

---

### 6. ~~Fix: Conn close race in overflow path~~ — DONE

**File:** `backend/handlers/hub.go:74-78`

**Problem:** In the overflow handler, `unregister(c)` closes the `send` channel, then `c.conn.Close()` is called directly. The `writePump` goroutine may attempt to write a `CloseMessage` concurrently with `conn.Close()`, since gorilla WebSocket connections are not safe for concurrent writes.

**Fix:**
- Remove the direct `c.conn.Close()` call from the overflow path.
- Closing the `send` channel is sufficient — `writePump` will detect `ok=false`, send the close frame, and return, after which `readPump` will call `conn.Close()` via its defer.
- This ensures conn writes are always serialized through `writePump`.

---

### 7. ~~Fix: `CheckOrigin: true` on WebSocket upgrader~~ — DONE

**File:** `backend/handlers/ws.go:15`

**Problem:** The upgrader accepts WebSocket connections from any origin.

**Fix:**
- Restrict to known origins: `excel-dm.com`, `www.excel-dm.com`, and `localhost` (for dev).
- Read the allowed origin from an environment variable (e.g., `ALLOWED_ORIGIN`) so it doesn't need a code change between dev and prod.

---
