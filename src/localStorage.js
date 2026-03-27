import { excelDM, newCurrent } from "./main.js";
import { Entry } from "./classes.js";
import { authHeaders, clearToken, showAuthModal, getToken } from "./auth.js";

// Unique ID for this browser tab — sent as X-Client-ID so the server
// can exclude this client from broadcast echoes.
const clientId = crypto.randomUUID();

let apiUrl = "/api/campaigns";

export function setApiUrl(url) {
  apiUrl = url;
  connectWS(url);
}

// No-op: connection is handled by the Go server.
export async function openDB() {}

// saveCategories folds into saveData — both are one payload now.
export function saveCategories() {
  saveData();
}

// --- Save logic ---

// _suppressSave prevents a remote update from triggering a re-save loop.
let _suppressSave = false;

let saveTimer = null;
export function saveData() {
  if (_suppressSave) {
    clearTimeout(saveTimer);
    return;
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await pushToServer();
    } catch (err) {
      console.error("Failed to save:", err);
    }
  }, 500);
}

export async function saveDataNow() {
  clearTimeout(saveTimer);
  try {
    await pushToServer();
  } catch (err) {
    console.error("Failed to save:", err);
  }
}

async function pushToServer() {
  const dirty = excelDM.dirtyEntries;
  const deleted = excelDM.deletedServerIds;

  // Nothing to save
  if (dirty.size === 0 && deleted.size === 0) return;

  // If any dirty entry has no _serverId (new entry), fall back to full PUT
  const hasNewEntries = [...dirty].some((e) => e._serverId == null);

  if (hasNewEntries) {
    await putToServer();
  } else {
    await patchToServer(dirty, deleted);
  }
}

async function putToServer() {
  const payload = excelDM.prepareForJSON();
  payload.categories = excelDM.categories ?? {};

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
  if (!res.ok) throw new Error(`PUT failed: HTTP ${res.status}`);

  // Server returns { ids: [...] } in the same order as entries[]
  const data = await res.json();
  if (Array.isArray(data.ids)) {
    data.ids.forEach((id, i) => {
      if (excelDM.entries[i]) excelDM.entries[i]._serverId = id;
    });
  }

  excelDM.clearDirtyState();
}

async function patchToServer(dirty, deleted) {
  const updated = [...dirty].map((e) => ({
    _serverId: e._serverId,
    title: e.title,
    type: e.type,
    category: e.category,
    body: e.body,
    color: e.color,
    image: e.image,
    x: e.x,
    y: e.y,
    coords: e.coords,
    popOut: e.popOut,
    currentChild: e.currentChild,
    parentId: e.parent?._serverId ?? null,
  }));

  const payload = {
    updated,
    deletedIds: [...deleted],
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
    // Fall back to full save on any PATCH error
    await putToServer();
    return;
  }

  excelDM.clearDirtyState();
}

// --- Load logic ---

export async function loadData() {
  try {
    const res = await fetch(apiUrl, { headers: authHeaders() });

    if (res.status === 401) {
      clearToken();
      showAuthModal();
      return;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    excelDM.entries.splice(0, excelDM.entries.length);
    excelDM.categories = data.categories ?? {};

    (data.entries || []).forEach((entryData) => {
      excelDM.add(new Entry(entryData));
    });

    excelDM.prepareFromJSON();
    excelDM.clearDirtyState();
  } catch (err) {
    console.error("Failed to load:", err);
    excelDM.entries = [];
    excelDM.categories = {};
  }

  connectWS(apiUrl);
  newCurrent();
  excelDM.clearDirtyState(); // clear dirty set by newCurrent
}

// --- WebSocket ---

let ws = null;
let wsApiUrl = null;

function connectWS(url) {
  disconnectWS();
  wsApiUrl = url;
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const token = getToken() ?? "";
  const wsUrl = `${proto}//${location.host}${url}/ws?token=${token}&clientId=${clientId}`;

  console.log("[WS] connecting to", wsUrl);
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log("[WS] connected to", wsUrl);
  };

  ws.onmessage = (event) => {
    console.log("[WS] message received, length=", event.data.length);
    try {
      const data = JSON.parse(event.data);
      applyRemoteUpdate(data);
    } catch (err) {
      console.error("WS message parse error:", err);
    }
  };

  ws.onclose = (ev) => {
    console.log("[WS] closed code=", ev.code, "reason=", ev.reason);
    ws = null;
    // Reconnect after 2s if we haven't intentionally disconnected
    if (wsApiUrl) {
      setTimeout(() => {
        if (wsApiUrl === url) connectWS(url);
      }, 2000);
    }
  };

  ws.onerror = (err) => {
    console.error("[WS] error", err);
    ws?.close();
  };
}

function disconnectWS() {
  wsApiUrl = null;
  if (ws) {
    ws.close();
    ws = null;
  }
}

function applyRemoteUpdate(data) {
  _suppressSave = true;
  try {
    excelDM.entries.splice(0, excelDM.entries.length);
    excelDM.categories = data.categories ?? {};
    (data.entries || []).forEach((entryData) => {
      excelDM.add(new Entry(entryData));
    });
    excelDM.prepareFromJSON();
    excelDM.clearDirtyState();
    newCurrent();
  } finally {
    _suppressSave = false;
  }
}
