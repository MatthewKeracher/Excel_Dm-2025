import { excelDM, newCurrent, current } from "./main.js";
import { Entry } from "./classes.js";
import { getToken } from "./auth.js";
import { clientId, setSuppressSave, fetchCampaignData, saveDataNow } from "./sync.js";
import { restorePopOuts } from "./popoutState.js";
import { setWsState } from "./syncState.js";
import { syncLog } from "./syncLog.js";

let ws = null;
let wsApiUrl = null;
let wsGen = 0; // incremented on every connectWS call; stale onclose handlers check this
let localVersion = 0;

export function setLocalVersion(v) {
  localVersion = v;
}

export function connectWS(url) {
  disconnectWS();
  wsApiUrl = url;
  const gen = ++wsGen;
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const token = getToken() ?? "";
  const wsUrl = `${proto}//${location.host}${url}/ws?token=${token}&clientId=${clientId}`;

  setWsState("connecting");
  syncLog("WS CONNECTING", url);
  ws = new WebSocket(wsUrl);

  ws.onopen = async () => {
    setWsState("connected");
    syncLog("WS CONNECTED", url);
    // Bug 3: catch up on any saves that happened while we were offline,
    // but only if there are no pending local edits (to avoid overwriting them).
    if (excelDM.dirtyEntries.size === 0 && excelDM.deletedServerIds.size === 0) {
      try {
        const data = await fetchCampaignData();
        if (data && data.version > localVersion) {
          syncLog("WS CATCHUP", `v${localVersion} → v${data.version}`);
          applyRemoteUpdate(data);
        }
      } catch (err) {
        console.error("[WS] catch-up GET failed:", err);
      }
    }
  };

  ws.onmessage = async (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "reload") {
        // Server signals a full replace happened — fetch current state via GET
        // rather than pushing potentially large payloads over the WS channel.
        if (data.version !== undefined && data.version <= localVersion) {
          syncLog("WS DISCARD", `reload v${data.version} (local v${localVersion})`);
          return;
        }
        syncLog("WS RELOAD", `v${data.version ?? "?"}`);
        try {
          const fresh = await fetchCampaignData();
          if (fresh) await applyRemoteUpdate(fresh);
        } catch (err) {
          console.error("[WS] reload fetch failed:", err);
        }
        return;
      }
      await applyRemoteUpdate(data);
    } catch (err) {
      console.error("WS message parse error:", err);
    }
  };

  let reconnectAttempt = 0;
  ws.onclose = (ev) => {
    ws = null;
    if (wsGen === gen && wsApiUrl) {
      setWsState("reconnecting");
      const delay = Math.min(30000, 1000 * 2 ** reconnectAttempt) * (0.8 + Math.random() * 0.4);
      reconnectAttempt++;
      syncLog("WS CLOSED", `code=${ev.code} → reconnecting in ${Math.round(delay)}ms (attempt ${reconnectAttempt})`);
      setTimeout(() => {
        if (wsGen === gen && wsApiUrl) connectWS(url);
      }, delay);
    } else {
      syncLog("WS CLOSED", `code=${ev.code}`);
    }
  };

  ws.onerror = () => {
    ws?.close();
  };
}

export function disconnectWS() {
  wsApiUrl = null;
  if (ws) {
    ws.close();
    ws = null;
  }
  setWsState("disconnected");
}

async function applyRemoteUpdate(data) {
  if (data.version !== undefined && data.version <= localVersion) {
    syncLog("WS DISCARD", `v${data.version} (local v${localVersion})`);
    return;
  }

  // For a full replace, flush any pending local changes first so they aren't lost
  // when all entries are replaced wholesale.
  if (data.type !== "patch" && (excelDM.dirtyEntries.size > 0 || excelDM.deletedServerIds.size > 0)) {
    syncLog("WS FLUSH", `flushing ${excelDM.dirtyEntries.size} dirty entries before full replace`);
    try {
      await saveDataNow();
    } catch (err) {
      console.error("[WS] flush before full replace failed:", err);
      // Proceed anyway — better to show remote state than to stay stuck.
    }
  }

  setWsState("updating");

  // Remember the selected entry by server ID so we can restore it after re-render.
  // `current` may be an array (initial state) or an Entry object.
  const prevServerId = current?._serverId ?? null;

  setSuppressSave(true);
  try {
    if (data.type === "patch") {
      applyDelta(data);
      syncLog("WS APPLIED", `v${data.version ?? "?"} delta updated=${data.updated?.length ?? 0} deleted=${data.deletedIds?.length ?? 0}`);
    } else {
      excelDM.entries.splice(0, excelDM.entries.length);
      excelDM.categories = data.categories ?? {};
      if (Array.isArray(data.tabs)) {
        excelDM.tabs = data.tabs;
        document.dispatchEvent(new CustomEvent("exceldm:tabs-updated"));
      }
      (Array.isArray(data.entries) ? data.entries : []).forEach((entryData) => {
        excelDM.add(new Entry(entryData));
      });
      excelDM.prepareFromJSON();
      syncLog("WS APPLIED", `v${data.version ?? "?"} full entries=${data.entries?.length ?? 0}`);
    }
    // Do NOT call clearDirtyState() here — dirty state is owned by the save path.
    // For patch updates, dirty entries were skipped in applyDelta.
    // For full replaces, dirty entries were flushed above before replacement.
    if (data.version !== undefined) localVersion = data.version;
    restorePopOuts(excelDM.entries);

    // Restore selection to the same entry if it still exists, otherwise fall back.
    const nextEntry = prevServerId != null
      ? excelDM.entries.find((e) => e._serverId === prevServerId)
      : null;
    newCurrent(nextEntry ?? undefined);
  } finally {
    setSuppressSave(false);
  }
}

function applyDelta(data) {
  const serverIdMap = new Map(excelDM.entries.map((e) => [e._serverId, e]));

  // Remove deleted entries
  for (const id of data.deletedIds ?? []) {
    const idx = excelDM.entries.findIndex((e) => e._serverId === id);
    if (idx !== -1) excelDM.entries.splice(idx, 1);
  }

  // Update changed entries — parent arrives as raw server ID from delta.
  // Preserve local-only fields that the server doesn't own.
  // If the entry doesn't exist locally yet (new entry from remote), create it.
  // Skip entries that have local unsaved changes to avoid overwriting them.
  for (const entryData of data.updated ?? []) {
    const entry = serverIdMap.get(entryData._serverId);
    if (!entry) {
      const newEntry = new Entry(entryData);
      excelDM.add(newEntry);
      serverIdMap.set(newEntry._serverId, newEntry);
      continue;
    }
    if (excelDM.dirtyEntries.has(entry)) {
      syncLog("WS SKIP", `entry _serverId=${entry._serverId} is locally dirty — keeping local version`);
      continue;
    }
    const localOnly = { current: entry.current, coords: entry.coords, popOut: entry.popOut };
    Object.assign(entry, entryData);
    Object.assign(entry, localOnly);
    entry.children = [];
  }

  // Convert all remaining parent Entry-object refs back to raw server IDs
  // so prepareFromJSON can rebuild the full tree consistently
  excelDM.resetParentLinks();
  excelDM.prepareFromJSON();

  if (data.categories != null) {
    excelDM.categories = data.categories;
  }
  if (Array.isArray(data.tabs)) {
    excelDM.tabs = data.tabs;
    document.dispatchEvent(new CustomEvent("exceldm:tabs-updated"));
  }
}
