import { Entry, EntryManager } from "./classes.js";
import { loadNoteCards } from "./left.js";
import { draw, HexToMap } from "./right.js";
import { initButtons, loadExtData } from "./buttons.js";
import { saveData, loadData } from "./localStorage.js";
import { initTabs } from "./tabs.js";

//State
export let excelDM = new EntryManager();
export let current = [];
export let masterEdit = false;

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

  initButtons();

  initTabs(["locations", "people", "quests", "monsters", "items", "spells"]);

  //LISTENERS

  const mapLayer = document.getElementById("map-layer");
  mapLayer.addEventListener("click", (e) => {
    if (!e.shiftKey) return; // Only proceed if Shift key is held

    const rect = mapLayer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Create a new note at clicked position
    const dateTime = new Date().toLocaleString();
    const newName = `_${dateTime}`;


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

  //SEARCH & HOTKEYS
  document.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;

    if (
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.key === "Tab" ||
      (activeElement && activeElement.classList.contains("editing"))
    ) {
      if (event.key === "Escape") {
        console.log(activeElement);
      }

      return; // Do not fire the event handler if keys or div is focused
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
      type: "locations",
      body: "A small place with small-minded people.",
    })
  );

  excelDM.add(
    new Entry({
      title: "Welcome to Excel_DM!",
      type: "locations",
      body: "Information about the software.",
    })
  );

  excelDM.n("Excel_DM").parentOf(excelDM.n("Welcome to Excel_DM!"));

  loadData();
  newCurrent(excelDM.entries[0]);
});
