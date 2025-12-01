import { Entry, EntryManager } from "./classes.js";
import { loadNoteCards } from "./left.js";
import { draw, HexToMap } from "./right.js";
import { initButtons, loadExtData } from "./buttons.js";
import { saveData, loadData, openDB } from "./localStorage.js";
import { initTabs } from "./tabs.js";
import { addHotkeys } from "./hotkeys.js";

//State
export let excelDM = new EntryManager();
export let current = [];
export let masterEdit = true; //For Editing Demo File

export function reCurrent() {
  //Reload current obj on UI.
  draw(current);
  loadNoteCards(current);
  saveData();
}

export function newCurrent(entry = excelDM.entries.find(e => e.current === true)) {
  
  if(entry === undefined){entry = excelDM.entries[0]}

  if(current?.current){
  current.current = false;
  }
  
  current = entry;
  current.current = true;
  HexToMap(entry);
  reCurrent();

  const currentTitle = document.getElementById("currentTitle");
  currentTitle.innerHTML = current.title;
}

window.addEventListener("DOMContentLoaded", async () => {
  //ADD TOP BUTTON FUNCTIONALITY

  await openDB();
  initButtons();
  addHotkeys();


  // Add some entries, including nested ones as desired
  excelDM.add(
    new Entry({
      title: "Excel_DM",
      type: "locations",
      body: "A small place with small-minded people.",
      current: false,
    })
  );

  excelDM.add(
    new Entry({
      title: "Welcome to Excel_DM!",
      type: "locations",
      body: "Information about the software.",
      current: true,
    })
  );


  excelDM.n("Excel_DM").parentOf(excelDM.n("Welcome to Excel_DM!"));

  await loadData();
  newCurrent();

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
      x: mouseX - 75,
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
});

 const logo = document.getElementById('logoContainer');
    function hideLogo() {
      logo.style.display = 'none';
      window.removeEventListener('click', hideLogo);
    }
    window.addEventListener('click', hideLogo);
