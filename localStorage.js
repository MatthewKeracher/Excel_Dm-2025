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

export function saveData() {
  if (!db) {
    console.error("DB not ready");
    return;
  }
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put({ key: "excelDM", data: excelDM });
  tx.oncomplete = () => console.log("excelDM saved");
  tx.onerror = () => console.error("Save failed");
}

export async function loadData() {
  if (!db) {
    console.error("DB not ready");
    return;
  }
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const getReq = store.get("excelDM");
  getReq.onsuccess = (e) => {
    if (e.target.result?.data) {
      const savedData = e.target.result.data;
      
      // Clear existing entries (assuming excelDM has clear() or similar)
      excelDM.entries.splice(0, excelDM.entries.length);
      
      // Reconstruct each entry through Entry constructor
      Object.values(savedData.entries || savedData).forEach((entryData) => {
        if (entryData && typeof entryData === 'object') {
          const entry = new Entry(entryData);
          excelDM.add(entry);
        }
      });
      
      excelDM.findParents(); // Restore relationships
      newCurrent();
    }
  };
}
