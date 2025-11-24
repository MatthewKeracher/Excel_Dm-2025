import { Entry, EntryManager } from "./classes.js";
import { loadNoteCards } from "./left.js";
import { draw, HexToMap } from "./right.js";
import { newFile, loadFile, addEntry, saveFile, donate } from "./buttons.js";
import { saveData, loadData } from "./localStorage.js";

//State
export let excelDM = new EntryManager();
export let current = [];
export let currentTab = "locations";

export function reCurrent() {
  //Reload current obj on UI.
  draw(current);
  loadNoteCards(current);
  saveData();
}

export function newCurrent(entry) {
  //Load new current obj on UI.
  current = entry;
  HexToMap(entry);
  reCurrent();

  const currentTitle = document.getElementById("currentTitle");
  currentTitle.innerHTML = current.title;
}

window.addEventListener("DOMContentLoaded", () => {
  //ADD TOP BUTTON FUNCTIONALITY

  const buttons = {
    "btn-new": newFile,
    "btn-save": saveFile,
    "btn-donate": donate,
    "btn-load": loadFile,
    "btn-add": addEntry,
  };

  Object.entries(buttons).forEach(([id, handler]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", handler);
    }
  });

  //TABS -- IN PROGRESS
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;

      // Set active button
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Show corresponding panel
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.style.display = panel.dataset.tab === tab ? "block" : "none";
      });

      const validTabs = ["locations", "people", "quests", "monsters", "items"];
      if (validTabs.includes(tab)) {
        currentTab = tab;
      }

      loadNoteCards(current);
    });
  });

  //LISTENERS

  const mapLayer = document.getElementById("map-layer");
  mapLayer.addEventListener("click", (e) => {
    if (!e.shiftKey) return; // Only proceed if Shift key is held

    const rect = mapLayer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Create a new note at clicked position
    const newName = `${current.title} ${excelDM.entries.length + 1}`;

    let newEntry = new Entry({
      title: newName,
      x: mouseX,
      y: mouseY,
    });

    excelDM.add(newEntry);
    current.parentOf(excelDM.n(newName));

    // Redraw all notes (as DOM elements)
    reCurrent(current);
  });

  //Refresh Canvas on Window Resize
  window.addEventListener("resize", () => {
    newCurrent(current);
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.key === "Tab"
    ) {
      return; // Ignore event if Ctrl or Shift key is pressed
    }

    const searchBox = document.getElementById("search-box");
    const searchBar = document.getElementById("search-bar");

    if (searchBox.style.display === "none" || !searchBox.style.display) {
      
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));

      searchBox.style.display = "block";
      searchBar.focus();
    }

    searchBar.addEventListener("blur", () => {
      if (searchBox.style.display === "block") {
        searchBox.style.display = "none";
        searchBar.value = ""; // clear input on blur if needed
      }
    });

    if (event.key === "Enter" || event.key === "Escape") {
      // Correct key value for Escape

      if (searchBox.style.display === "block") {
        searchBox.style.display = "none";
        searchBar.value = "";
      }
    }
  });

  const searchBox = document.getElementById("search-bar");

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();

    const results = excelDM.entries.filter((entry) =>
      entry.title.toLowerCase().includes(query)
    );

    loadNoteCards(results, "search");
  });

  // Add some entries, including nested ones as desired
  excelDM.add(
    new Entry({
      title: "Excel_DM",
      body: "A small place with small-minded people.",
    })
  );

  excelDM.add(
    new Entry({
      title: "Welcome to Excel_DM!",
      body: "Information about the software.",
    })
  );

  excelDM.n("Excel_DM").parentOf(excelDM.n("Welcome to Excel_DM!"));

  function loadHommlet() {
    fetch("./Hommlet.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // parses JSON automatically
      })
      .then((allData) => {
        // Clear existing entries in manager
        excelDM.entries.length = 0;

        // Create Entry instances and add them to manager
        allData.entries.forEach((data) => {
          const entry = new Entry(data);
          excelDM.add(entry);
        });

        excelDM.findParents(); // Restore Circularity
        newCurrent(excelDM.entries[0]);
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
      });
  }

  loadHommlet();

  //loadData();
  newCurrent(excelDM.entries[0]);
});
