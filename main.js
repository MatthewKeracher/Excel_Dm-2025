import { Entry, EntryManager } from "./locations.js";
import { loadNoteCards } from "./left.js";
import { draw, HexToMap } from "./right.js";
import { newFile, loadFile, addEntry, saveFile } from "./buttons.js";
import { saveData, loadData } from "./localStorage.js";

//State
export let loc = new EntryManager();
export let current = [];

export function reCurrent() {
  //Reload current obj on UI.
  draw(current);
  loadNoteCards(current);
}

export function newCurrent(entry) {
  //Load new current obj on UI.
  current = entry;
  HexToMap(entry);
  reCurrent();
  saveData();

  const currentTitle = document.getElementById("currentTitle");
  currentTitle.innerHTML = current.title;
}

window.addEventListener("DOMContentLoaded", () => {
  //ADD TOP BUTTON FUNCTIONALITY

  const buttons = {
    "btn-new": newFile,
    "btn-save": saveFile,
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

      // Optionally load or filter content corresponding to the tab
      if (tab === "locations") {
        currentTab = "locations";
        currentData = allData.filter((note) => note.type !== "person");
      } else if (tab === "people") {
        currentData = allData.filter((note) => note.type === "person");
        currentTab = "people";
      } else if (tab === "logs") {
        currentTab = "logs";
      }

      loadNoteCards(currentData);
    });
  });

  //LISTENERS

  const mapLayer = document.getElementById("map-layer");
  mapLayer.addEventListener("click", (e) => {
    if (!e.shiftKey) return; // Only proceed if Shift key is held

    console.log('click')
    const rect = mapLayer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Create a new note at clicked position
    const newName = `${current.title} ${loc.entries.length + 1}`;

    let newEntry = new Entry({
      title: newName,
      x: mouseX,
      y: mouseY,
    });

    loc.add(newEntry);
    current.parentOf(loc.n(newName));

    // Redraw all notes (as DOM elements)
    reCurrent(current);
  });

  //Refresh Canvas on Window Resize
  window.addEventListener("resize", () => {
    newCurrent(current);
  });

  //Update Title on Input Change
  const fileNameInput = document.getElementById("file-name");
  if (fileNameInput) {
    fileNameInput.addEventListener("input", () => {
      saveData();
    });
  }

  // Add some entries, including nested ones as desired
  loc.add(
    new Entry({
      title: "Excel_DM",
      body: "A small place with small-minded people.",
    })
  );

  loc.add(
    new Entry({
      title: "Welcome to Excel_DM!",
      body: "Information about the software.",
    })
  );

  loc.n("Excel_DM").parentOf(loc.n("Welcome to Excel_DM!"));

  loadData();
  newCurrent(loc.entries[0]);
});
