// localStorage.js (or your DB module)
import { excelDM, newCurrent } from "./main.js";
import { Entry } from "./classes.js";

let db;
export const DB_NAME = "excelDB";
export const STORE_NAME = "excelData";

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      console.error("Database error");
      reject(request.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "key" });
        store.put({ key: "excelDM", data: null });
      }
    };
  });
}

export function saveCategories() {
  if (!db) {
    console.error("DB not ready");
    return;
  }

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  store.put({ key: "categories", data: excelDM.categories });

  //tx.oncomplete = () => console.log("Categories Saved.");
  tx.onerror = () => console.error("Failed to Save Categories.");
}

export function saveData() {
  if (!db) {
    console.error("DB not ready");
    return;
  }
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  // Apply same flattening as prepareForJSON()
  const flattenedData = excelDM.prepareForJSON();
  store.put({ key: "entries", data: flattenedData });

  //tx.oncomplete = () => console.log("excelDM saved (flattened)");
  tx.onerror = () => console.error("Save failed");
}

export async function loadData() {
  if (!db) {
    console.error("DB not ready");
    // Initialize with empty defaults when DB unavailable
    excelDM.entries = [];
    excelDM.categories = {};
    newCurrent();
    return;
  }

  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const getEntries = store.get("entries");
  const getCategories = store.get("categories");

  let entriesLoaded = false;
  let categoriesLoaded = false;

  getCategories.onsuccess = (e) => {
    if (e.target.result?.data) {
      excelDM.categories = e.target.result.data;
      console.log("Categories Loaded:", excelDM.categories);
    } else {
      console.log("No categories found, using empty object");
      excelDM.categories = {};
    }
    categoriesLoaded = true;
    checkBothLoaded();
  };

  getEntries.onsuccess = (e) => {
    if (e.target.result?.data) {
      const savedData = e.target.result.data;
      excelDM.entries.splice(0, excelDM.entries.length);

      const entryInstances = (savedData.entries || []).map(
        (entryData) => new Entry(entryData),
      );

      entryInstances.forEach((entry) => excelDM.add(entry));
      excelDM.prepareFromJSON();
    } else {
      console.log("No entries found, starting fresh");
      excelDM.entries.splice(0, excelDM.entries.length);
      excelDM.categories = {};
      excelDM.prepareFromJSON();
    }
    entriesLoaded = true;
    checkBothLoaded();
  };

  function checkBothLoaded() {
    if (entriesLoaded && categoriesLoaded) {
      newCurrent();
    }
  }

  // Fallback timeout (5s) in case transactions hang
  setTimeout(() => {
    if (!entriesLoaded || !categoriesLoaded) {
      console.warn("LoadData timeout - forcing defaults");
      excelDM.entries = [];
      excelDM.categories = {};
      newCurrent();
    }
  }, 5000);
}
