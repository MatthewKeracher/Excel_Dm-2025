import { Entry } from "./classes.js";
import { excelDM, newCurrent } from "./main.js";

//Autosave
export function saveData() {
  try {
    function replacer(key, value) {
      //Flatten Circularity
      if (key === "parent") {
        return null;
      }
      return value;
    }

    const jsonString = JSON.stringify(excelDM, replacer, 2);

    try {
      localStorage.setItem("savedData", jsonString);
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        console.warn("LocalStorage quota exceeded");
        // Optionally clear some stored data or alert the user
      }
    }
  } catch (err) {
    console.error("Error saving data to localStorage", err);
  }
}

export function loadData() {
  try {
    const jsonString = localStorage.getItem("savedData");

    let allData = JSON.parse(jsonString);

    // Clear existing entries in manager
    excelDM.entries.length = 0;

    // Create Entry instances and add them to manager
    allData.entries.forEach((data) => {
      const entry = new Entry(data);
      excelDM.add(entry);
    });

    excelDM.findParents(); //Restore Circularity
    newCurrent();
  } catch (err) {
    console.error("Error loading data from localStorage", err);
  }
}
