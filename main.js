import { Entry, EntryManager } from "./class.js";
import { loadNoteCards } from "./left.js";
import { initNotesCanvas, draw, HexToMap } from "./right.js";
import { newFile, loadFile, addEntry, saveFile } from "./buttons.js";

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
  initNotesCanvas(entry);
  reCurrent();
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

  //Shift Click on Map for new Note
  const canvas = document.getElementById("note-layer");
  canvas.addEventListener("click", (e) => {
    if (!e.shiftKey) return; // Only proceed if Shift key is held

    const rect = canvas.getBoundingClientRect();
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

    newCurrent(current);
  });

  //Refresh Canvas on Window Resize
  window.addEventListener("resize", () => {
    newCurrent(current);
  });

  //Update Title on Input Change
  const fileNameInput = document.getElementById("file-name");
  if (fileNameInput) {
    fileNameInput.addEventListener("input", () => {
      parent.title = fileNameInput.value;
    });
  }

  // Add some entries, including nested ones as desired
  loc.add(
    new Entry({
      title: "Hommlet",
      body: "A small place with small-minded people.",
    })
  );

  loc.add(
    new Entry({
      title: "Wicked Wench Inn",
      body: "The only Inn for miles around.",
    })
  );

  loc.add(
    new Entry({
      title: "Toilet",
      body: "Give it five minutes.",
    })
  );

  loc.n("Hommlet").parentOf(loc.n("Wicked Wench Inn"));
  loc.n("Wicked Wench Inn").parentOf(loc.n("Toilet"));
  //loadData();

  newCurrent(loc.entries[0]);
});
