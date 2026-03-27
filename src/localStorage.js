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

async function pushToServer() {
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
  }
}

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
  } catch (err) {
    console.error("Failed to load:", err);
    excelDM.entries = [];
    excelDM.categories = {};
  }

  connectWS(apiUrl);
  newCurrent();
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

  ws = new WebSocket(wsUrl);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      applyRemoteUpdate(data);
    } catch (err) {
      console.error("WS message parse error:", err);
    }
  };

  ws.onclose = () => {
    ws = null;
    // Reconnect after 2s if we haven't intentionally disconnected
    if (wsApiUrl) {
      setTimeout(() => {
        if (wsApiUrl === url) connectWS(url);
      }, 2000);
    }
  };

  ws.onerror = () => {
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
    newCurrent();
  } finally {
    _suppressSave = false;
  }
}
