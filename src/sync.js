import { excelDM } from "./main.js";
import { authHeaders, clearToken, showAuthModal } from "./auth.js";
import { setHttpState } from "./syncState.js";
import { syncLog } from "./syncLog.js";

export const clientId = crypto.randomUUID();

let apiUrl = null;

export function setApiUrl(url) {
  apiUrl = url;
}

export function getApiUrl() {
  return apiUrl;
}

// _suppressSave prevents a remote WS update from triggering a re-save loop.
let _suppressSave = false;

export function setSuppressSave(val) {
  _suppressSave = val;
}

export function isSuppressSave() {
  return _suppressSave;
}

export async function openDB() {}

export function saveCategories() {
  saveData();
}

let saveTimer = null;

const RETRY_DELAYS = [1000, 2000, 4000];
let _saving = false;

async function pushWithRetry() {
  if (_saving) return; // Bug 2: prevent concurrent save loops
  _saving = true;
  try {
    for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
      try {
        await pushToServer();
        return;
      } catch (err) {
        if (attempt < RETRY_DELAYS.length) {
          const delay = RETRY_DELAYS[attempt];
          syncLog("RETRY", `attempt ${attempt + 1} after ${delay}ms — ${err.message}`);
          setHttpState("retrying");
          await new Promise((r) => setTimeout(r, delay));
        } else {
          syncLog("SAVE FAIL", err.message);
          console.error("Failed to save after retries:", err);
          setHttpState("error");
        }
      }
    }
  } finally {
    _saving = false;
  }
}

export function saveData() {
  if (_suppressSave) {
    clearTimeout(saveTimer);
    return;
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushWithRetry, 500);
}

export async function saveDataNow() {
  clearTimeout(saveTimer);
  await pushWithRetry();
}

async function pushToServer() {
  if (!apiUrl) return;

  const dirty = excelDM.dirtyEntries;
  const deleted = excelDM.deletedServerIds;

  if (dirty.size === 0 && deleted.size === 0) return;

  setHttpState("saving");

  const hasNewEntries = [...dirty].some((e) => e._serverId == null);
  syncLog("PUSH", `dirty=${dirty.size} deleted=${deleted.size} method=${hasNewEntries ? "PUT" : "PATCH"}`);

  if (hasNewEntries) {
    await putToServer();
  } else {
    await patchToServer(dirty, deleted);
  }
}

async function putToServer() {
  // Bug 1: snapshot before the fetch so edits that arrive during the await are not lost
  const dirtySnapshot = new Set(excelDM.dirtyEntries);
  const deletedSnapshot = new Set(excelDM.deletedServerIds);

  const payload = excelDM.prepareForJSON();
  payload.categories = excelDM.categories ?? {};
  // Strip per-user local state — coords (pop-out position) and popOut are not synced
  if (Array.isArray(payload.entries)) {
    payload.entries.forEach((e) => { delete e.popOut; delete e.coords; });
  }

  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: { ...authHeaders(), "X-Client-ID": clientId },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    clearToken();
    showAuthModal();
    return;
  }
  if (!res.ok) {
    syncLog("PUT FAIL", `HTTP ${res.status}`);
    throw new Error(`PUT failed: HTTP ${res.status}`);
  }

  const data = await res.json();
  if (Array.isArray(data.ids)) {
    data.ids.forEach((id, i) => {
      if (excelDM.entries[i]) excelDM.entries[i]._serverId = id;
    });
  }

  // Only remove what was in the snapshot — preserve any edits made during the fetch
  dirtySnapshot.forEach((e) => excelDM.dirtyEntries.delete(e));
  deletedSnapshot.forEach((id) => excelDM.deletedServerIds.delete(id));
  syncLog("PUT OK", `${data.ids?.length ?? 0} entries`);
  setHttpState("saved");
}

async function patchToServer(dirty, deleted) {
  // Bug 1: snapshot before the fetch so edits that arrive during the await are not lost
  const dirtySnapshot = new Set(dirty);
  const deletedSnapshot = new Set(deleted);

  const updated = [...dirtySnapshot].map((e) => ({
    _serverId: e._serverId,
    title: e.title,
    type: e.type,
    category: e.category,
    body: e.body,
    color: e.color,
    image: e.image,
    x: e.x,
    y: e.y,
    // coords (pop-out window position) and popOut are per-user local state — not synced
    currentChild: e.currentChild,
    parentId: e.parent?._serverId ?? null,
  }));

  const payload = {
    updated,
    deletedIds: [...deletedSnapshot],
    categories: excelDM.categories ?? {},
  };

  const res = await fetch(apiUrl, {
    method: "PATCH",
    headers: { ...authHeaders(), "X-Client-ID": clientId },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    clearToken();
    showAuthModal();
    return;
  }
  if (!res.ok) {
    syncLog("PATCH FAIL", `HTTP ${res.status} → fallback PUT`);
    await putToServer();
    return;
  }

  // Only remove what was in the snapshot — preserve any edits made during the fetch.
  dirtySnapshot.forEach((e) => excelDM.dirtyEntries.delete(e));
  deletedSnapshot.forEach((id) => excelDM.deletedServerIds.delete(id));
  syncLog("PATCH OK", `${updated.length} updated, ${deletedSnapshot.size} deleted`);
  setHttpState("saved");
}

export async function fetchCampaignData() {
  if (!apiUrl) return null;

  const res = await fetch(apiUrl, { headers: authHeaders() });

  if (res.status === 401) {
    clearToken();
    showAuthModal();
    return null;
  }
  if (!res.ok) {
    syncLog("LOAD FAIL", `HTTP ${res.status}`);
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  syncLog("LOAD OK", `v${data.version ?? "?"} entries=${data.entries?.length ?? 0}`);
  return data;
}
