import { Entry, EntryManager } from "./classes.js";
import { loadNoteCards, loadPopUp } from "./left.js";
import { draw, HexToMap, initMap, setGridType } from "./right.js";
import { initButtons, loadExtData } from "./buttons.js";
import { saveData, loadData, openDB } from "./localStorage.js";
import { currentTab, initTabs } from "./tabs.js";
import { addHotkeys } from "./hotkeys.js";
import { updateFilter } from "./filter.js";
import { getToken, initAuth, showAuthModal, ensureEmail, updateAccountDisplay } from "./auth.js";
import { isSuppressSave } from "./sync.js";

//State
export let excelDM = new EntryManager();
export let current = [];
export let masterEdit = true; //For Editing Demo File

//tab names
export let tabNames = ["locations", "people", "quests", "monsters", "spells", "items", "misc"];
export const LOCKED_TABS = ["locations", "people", "quests"];


export function reCurrent() {
  if (Array.isArray(current)) {
    import("./home.js").then(({ showHome }) => showHome());
    return;
  }
  draw(current);
  updateFilter();
  loadNoteCards(current);
  loadPopUp();
  if (!isSuppressSave()) {
    excelDM.dirtyEntries.add(current);
  }
  saveData();
}

export function resetCurrent() {
  if (current && !Array.isArray(current) && current.current) {
    current.current = false;
  }
  current = [];
}

export function newCurrent(entry = excelDM.entries.find(e => e.current === true)) {

  if(entry === undefined){entry = excelDM.entries[0]}
  if(entry === undefined) return;

  if(current?.current){
  current.current = false;
  }

  // Restore tabs when entering a campaign
  const tabsEl = document.querySelector(".tabs");
  if (tabsEl) tabsEl.style.display = "";

  current = entry;
  current.current = true;
  setGridType(entry.gridType ?? "hex");
  HexToMap(entry);
  reCurrent();

  const currentTitle = document.getElementById("currentTitle");
  currentTitle.innerHTML = `<img src="/assets/torch.gif" class="title-torch" alt="">${current.title}<img src="/assets/torch.gif" class="title-torch" alt="">`;
}


window.addEventListener("DOMContentLoaded", async () => {
  //ADD TOP BUTTON FUNCTIONALITY

  initButtons();
  addHotkeys();
  initTabs(tabNames);
  initMap();

  const inviteMatch = window.location.pathname.match(/^\/invite\/([0-9a-f]+)$/i);

  if (inviteMatch) {
    // Invite links still require auth to accept.
    const token = inviteMatch[1];
    const { handleInviteFlow } = await import("./campaigns.js");
    initAuth(async () => {
      const { initHome } = await import("./home.js");
      await initHome();
      updateAccountDisplay(await ensureEmail());
      handleInviteFlow(token);
    });
    if (getToken()) {
      const { initHome } = await import("./home.js");
      await initHome();
      updateAccountDisplay(await ensureEmail());
      await handleInviteFlow(token);
    } else {
      showAuthModal();
    }
  } else {
    // Default: show the home/notice board to everyone, logged in or not.
    // The auth modal only opens when the user clicks the account button.
    const { initHome, showHome } = await import("./home.js");
    initAuth(async () => {
      await initHome();
      updateAccountDisplay(await ensureEmail());
      showHome();
    });
    await initHome();
    if (getToken()) {
      updateAccountDisplay(await ensureEmail());
    } else {
      updateAccountDisplay("");
    }
    showHome();
  }

  
  


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
    if (!Array.isArray(current)) current.parentOf(excelDM.n(newName));

    excelDM.dirtyEntries.add(newEntry);
    // Redraw all notes (as DOM elements)
    reCurrent();

  });

  //Refresh Canvas on Window Resize
  window.addEventListener("resize", () => {
    if (current && !Array.isArray(current)) newCurrent(current);
  });


});

//  const logo = document.getElementById('logoContainer');
//     function hideLogo() {
//       logo.style.display = 'none';
//       window.removeEventListener('click', hideLogo);
//     }
//     window.addEventListener('click', hideLogo);
