// Per-user pop-out state stored in browser localStorage, keyed by server entry ID.
// Nothing here is synced to the server — pop-out windows are per-tab, not global.

const STORAGE_KEY = "exceldm_popouts";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Mark an entry as popped out and persist its window coords.
export function setPopOut(serverId, coords) {
  if (serverId == null) return;
  const state = load();
  state[String(serverId)] = { coords: coords ?? { x: 0, y: 0 } };
  save(state);
}

// Remove an entry's pop-out state.
export function clearPopOut(serverId) {
  if (serverId == null) return;
  const state = load();
  delete state[String(serverId)];
  save(state);
}

// After a WS update or page load, re-apply local pop-out state to the entry list.
// Entries not in localStorage have popOut reset to false so stale server values are ignored.
export function restorePopOuts(entries) {
  const state = load();
  entries.forEach((e) => {
    const saved = e._serverId != null ? state[String(e._serverId)] : null;
    if (saved) {
      e.popOut = true;
      e.coords = saved.coords;
    } else {
      e.popOut = false;
    }
  });
}
