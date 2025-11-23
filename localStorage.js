import { Entry } from "./class.js";

//Autosave
function saveData() {
  try {
    
    
    function replacer(key, value) { //Flatten Circularity
      if (key === "parent") {
        return null;
      }
      return value;
    }

    const jsonString = JSON.stringify(loc, replacer, 2);
    localStorage.setItem("savedData", jsonString);
  } catch (err) {
    console.error("Error saving data to localStorage", err);
  }
}

function loadData() {
  try {
    const jsonString = localStorage.getItem("savedData");

    let allData = JSON.parse(jsonString);

    // Clear existing entries in manager
    loc.entries.length = 0;

    // Create Entry instances and add them to manager
    allData.entries.forEach((data) => {
      const entry = new Entry(data);
      loc.add(entry);
    });

    loc.findParents(); //Restore Circularity
    current = loc.entries[0];
    reCurrent();
  } catch (err) {
    console.error("Error loading data from localStorage", err);
  }
}
