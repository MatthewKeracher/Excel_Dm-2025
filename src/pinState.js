// Per-user pinned-card state stored in browser localStorage, keyed by server
// entry ID. A pinned card renders at full height (does not collapse) and
// shows a locked-pin icon. Nothing here is synced to the server — pinning is
// a DM's personal workspace preference, not shared campaign data.

const STORAGE_KEY = "exceldm_pinned";

function load() {
  try {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return new Set(Array.isArray(arr) ? arr.map(String) : []);
  } catch {
    return new Set();
  }
}

function save(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function isPinned(serverId) {
  if (serverId == null) return false;
  return load().has(String(serverId));
}

export function setPinned(serverId, pinned) {
  if (serverId == null) return;
  const set = load();
  if (pinned) set.add(String(serverId));
  else set.delete(String(serverId));
  save(set);
}
