# Sync Architecture & Edge Cases

This document covers the real-time sync system: how it works, what is handled correctly,
known bugs, and limitations. Analysis is based on static code review of `src/sync.js`,
`src/ws.js`, `src/classes.js`, `backend/handlers/campaign.go`, `backend/handlers/helpers.go`,
`backend/handlers/hub.go`, and `backend/handlers/ws.go`.

---

## How It Works

```
User edit → reCurrent() → saveData() (500ms debounce) → pushWithRetry()
  → dirty has new entries?  → PUT  /api/campaigns/{id}  (full replace, get back IDs)
  → dirty has known IDs?    → PATCH /api/campaigns/{id} (delta: changed + deleted)

Server receives PATCH → increments version → responds 204
  → goroutine: serializePatchDelta() → hub.broadcast() (delta JSON to all other clients)

Server receives PUT → increments version → responds {ids:[...]}
  → goroutine: serializeCampaign() → hub.broadcast() (full JSON to all other clients)

Receiving client (ws.js onmessage):
  → version check: incoming <= localVersion → discard
  → data.type === "patch" → applyDelta() (surgical update + tree rebuild)
  → else               → full replace (loadData-style)
  → clearDirtyState(), newCurrent()
```

---

## What Is Handled Correctly

### Last write wins on conflicting edits
Two clients editing different entries: both PATCHes succeed, each client gets the other's
delta broadcast, result is the union of both changes. ✓

Two clients editing the **same** entry simultaneously: SQLite serializes the transactions,
last one to commit wins. The losing client's local view gets overwritten by the winner's
WS broadcast. This is standard "last write wins" — there is no conflict resolution or merge.

### Stale broadcast discard
`applyRemoteUpdate` checks `incoming.version <= localVersion` and discards. Prevents a
slow or reordered broadcast from overwriting newer local state. ✓

### Re-save loop prevention
`_suppressSave` is set during `applyRemoteUpdate`. Any `saveData()` calls triggered by
`newCurrent()` during the apply are suppressed, preventing the receiving client from
re-broadcasting changes it just received. ✓

### WS auto-reconnect
`onclose` fires a 5s timer to call `connectWS` again. A `wsGen` counter ensures stale
`onclose` handlers (from a superseded connection) do not re-trigger reconnect after an
intentional `disconnectWS()`. ✓

### Generation guard on reconnect
Switching campaigns calls `disconnectWS()` (sets `wsApiUrl = null`). Any pending
`onclose` callback checks `wsGen === gen && wsApiUrl` — `wsApiUrl` is null so it aborts.
No reconnect to the old campaign after switching. ✓

### Keepalive pings
`writePump` sends a WebSocket ping every 54 seconds. `readPump` resets the 60s read
deadline on each pong. Idle connections survive indefinitely without network activity. ✓

### Delta broadcast bandwidth
PATCH broadcasts send only the changed entries (`{type:"patch", updated:[...], deletedIds:[...], version:N}`).
For a campaign with 200 entries, a single field edit broadcasts ~200 bytes instead of ~50 KB. ✓
PUT still broadcasts the full campaign since it reassigns all server IDs. ✓

### Retry with backoff
Failed saves retry at 1 s / 2 s / 4 s. Status badge shows "Retrying…" between attempts,
"Save failed" only after all three retries are exhausted. ✓

---

## Known Bugs

### BUG 1 — Edits made during an in-flight save are silently dropped (data loss)

**Severity:** Medium. In-memory state is correct; persistence is lost until the next user action.

**Reproduction:** Edit an entry → save debounce fires → immediately edit a second entry
while the PATCH request is in flight → PATCH succeeds → `clearDirtyState()` clears
**both** the sent entry and the just-made edit → second edit's `saveData()` debounce fires
500ms later → `dirty.size === 0` → returns early → second edit is never persisted.

**Root cause:** `patchToServer` spreads dirty entries into the payload synchronously but
calls `excelDM.clearDirtyState()` after the `await fetch(...)`. Entries added to `dirtyEntries`
between those two points are cleared without being sent.

Same issue exists in `putToServer`.

**Fix (not yet implemented):** Snapshot the dirty/deleted sets before the fetch. On
success, only remove the snapshotted entries from the live sets rather than calling
`clearDirtyState()`.

```js
// patchToServer — proposed fix
const snapshot = new Set(dirty);
const deletedSnapshot = new Set(deleted);
const updated = [...snapshot].map(...);
// ... await fetch ...
snapshot.forEach(e => excelDM.dirtyEntries.delete(e));
deletedSnapshot.forEach(id => excelDM.deletedServerIds.delete(id));
// Do NOT call clearDirtyState()
```

---

### BUG 2 — No guard against concurrent save loops on slow networks

**Severity:** Low. Results in duplicate (harmless but wasteful) server writes.

**Reproduction:** Throttle network to 2G. Edit rapidly. Each edit calls `saveData()`,
which clears the debounce timer and restarts it. Once a timer fires and `pushWithRetry`
is awaiting the fetch, a subsequent `saveData()` starts a *new* 500ms timer. That timer
fires and launches a second `pushWithRetry` concurrently. With retry delays of 1–4s,
several loops can stack.

**Root cause:** `saveData()` guards against queuing multiple timers (clears old timer
before setting a new one), but has no guard against a `pushWithRetry` already being in
flight.

**Fix (not yet implemented):** Add an `_saving` flag.

```js
let _saving = false;

async function pushWithRetry() {
  if (_saving) return;
  _saving = true;
  try { /* ... retry loop ... */ }
  finally { _saving = false; }
}
```

---

### BUG 3 — No catch-up GET on WS reconnect; client can be stale after offline period

**Severity:** Medium for collaborative use; negligible for solo use.

**Scenario:** Client B disconnects. While offline, Client A saves five times (v10 → v15).
Client B reconnects — WS re-opens, `localVersion` is still 10. No GET is issued.
Future broadcasts (v16+) arrive and are applied correctly. But B never learns about
v11–v15. B's view of entries A edited is stale until A makes another save.

**Dangerous variant:** B edits an entry A already changed (B has A's old version).
B's PATCH overwrites A's version on the server for that entry. A receives B's delta and
sees B's (stale) content applied to that entry.

**Fix (not yet implemented):** On `onopen`, if `localVersion` is behind the server,
fetch the full campaign and refresh.

```js
ws.onopen = async () => {
  setWsState("connected");
  syncLog("WS CONNECTED", url);
  // Catch up if we've been offline
  const data = await fetchCampaignData();
  if (data && data.version > localVersion) {
    applyRemoteUpdate(data);
  }
};
```

---

### BUG 4 — Broadcast goroutine reads version at execution time, not at commit time

**Severity:** Low. Requires two saves within ~1ms of each other.

**Scenario:**
1. Client A's PATCH commits → version becomes N+1 → goroutine G1 queued
2. Client B's PATCH commits → version becomes N+2 → goroutine G2 queued
3. G1 runs → `serializePatchDelta` reads current DB version = N+2 (B already committed)
4. G1 broadcasts delta-A with `version: N+2`
5. G2 runs → reads version = N+2 → broadcasts delta-B with `version: N+2`
6. Receiving client gets G1 → sets `localVersion = N+2`
7. Receiving client gets G2 → `N+2 <= N+2` → **discarded** → misses B's changes

**Fix (not yet implemented):** Return the committed version from `patchEntries` and pass
it into `serializePatchDelta` rather than re-querying.

---

### BUG 5 — WS send buffer overflow is silent

**Severity:** Very low. Requires 64 undelivered broadcasts (heavy concurrent editing
from a backgrounded tab).

The per-client send channel is buffered at 64 (`make(chan []byte, 64)`). When full,
`hub.broadcast` drops new messages silently (the `default:` case in the select). The
client's `localVersion` stops advancing. Future broadcasts still apply if `incoming > localVersion`,
but the client has a gap in its history.

**Fix (not yet implemented):** On buffer full, close the client connection so it
reconnects and issues a catch-up GET (see Bug 3 fix).

---

## Edge Case Behavior Reference

| Scenario | Behavior | Safe? |
|---|---|---|
| Two clients edit different entries simultaneously | Union of changes; each sees the other's delta | ✓ Yes |
| Two clients edit the same entry simultaneously | Last write wins; losing client's view overwritten by WS delta | ✓ Acceptable |
| Client edits during in-flight PATCH | Edit silently dropped from dirty set until next user action | ✗ Bug 1 |
| Slow network, rapid edits | Multiple concurrent save loops possible | ~ Bug 2 |
| Client disconnects, remote saves happen, client reconnects | Client stale for entries changed while offline | ✗ Bug 3 |
| Two saves within ~1ms | One client may miss a WS delta | ~ Bug 4 (rare) |
| Tab backgrounded, 64+ broadcasts pile up | Excess broadcasts silently dropped | ~ Bug 5 (very rare) |
| Client switches campaigns | Old WS disconnected cleanly, no reconnect to old campaign | ✓ Yes |
| JWT expires mid-session | 401 → `clearToken()` + `showAuthModal()` — no silent failure | ✓ Yes |
| Server restarts while client is connected | WS `onclose` fires → reconnect after 5s | ✓ Yes |
| New entry created (PUT), tab closed before PUT completes | Entry lost — never persisted | ✗ Bug 1 variant |

---

## Needs Manual Verification

The following behaviors are correct per code analysis but should be confirmed with two
browser tabs and DevTools:

- [ ] Delta broadcast: confirm the Network tab shows small payloads (~200 bytes) for
      PATCH saves vs. large payloads for the initial PUT
- [ ] Stale discard: with two tabs editing the same entry in rapid succession, confirm
      the status badge does not flicker to an error state
- [ ] Reconnect: close the network in DevTools (Offline), wait 10s, restore — confirm
      the badge returns to "Connected" and the tab catches up on remote changes
- [ ] Keepalive: leave a tab idle for 2+ minutes — confirm the WS connection stays open
      (no "Reconnecting…" badge)
- [ ] Bug 1 reproduction: edit an entry, immediately edit a second entry while watching
      the Network tab — confirm both entries appear in the same or successive PATCH
      requests (or reproduce the drop)
