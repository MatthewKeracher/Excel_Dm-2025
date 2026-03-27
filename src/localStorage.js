import { excelDM, newCurrent } from "./main.js";
import { Entry } from "./classes.js";
import { authHeaders, clearToken, showAuthModal } from "./auth.js";

const API_URL = "/api/campaigns";

// No-op: connection is handled by the Go server.
export async function openDB() {}

// saveCategories folds into saveData — both are one payload now.
export function saveCategories() {
  saveData();
}

let saveTimer = null;
export function saveData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      const payload = excelDM.prepareForJSON();
      payload.categories = excelDM.categories ?? {};

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        clearToken();
        showAuthModal();
      }
    } catch (err) {
      console.error("Failed to save:", err);
    }
  }, 500);
}

export async function loadData() {
  try {
    const res = await fetch(API_URL, { headers: authHeaders() });

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

  newCurrent();
}
