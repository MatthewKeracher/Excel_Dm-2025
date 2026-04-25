import { excelDM, current, LOCKED_TABS } from "./main.js";
import { loadNoteCards } from "./left.js";
import { saveData } from "./localStorage.js";
import { isAdmin } from "./userRole.js";
import { promptDialog, alertDialog } from "./dialog.js";

export const DEFAULT_TABS = ["locations", "people", "quests", "monsters", "spells", "items", "misc"];

export let currentTab = "locations";

let _tabs = [...DEFAULT_TABS];

// Re-render tabs when another client changes them via WS
document.addEventListener("exceldm:tabs-updated", () => {
  initTabs(excelDM.tabs ?? DEFAULT_TABS);
});

export function initTabs(tabsArray) {
  _tabs = [...tabsArray];

  // Keep currentTab valid
  if (!_tabs.includes(currentTab)) currentTab = _tabs[0] ?? "locations";

  _render();
}

function _render() {
  const container = document.querySelector(".tabs");
  container.innerHTML = "";
  const admin = isAdmin();

  _tabs.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = "tab-button";
    if (name === currentTab) btn.classList.add("active");
    btn.dataset.tab = name;

    const label = document.createElement("span");
    label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    btn.appendChild(label);

    // Remove button: admin only, non-locked, no entries of that type
    if (admin && !LOCKED_TABS.includes(name)) {
      const isEmpty = excelDM.entries.every((e) => e.type !== name);
      if (isEmpty) {
        const rm = document.createElement("span");
        rm.className = "tab-remove-btn";
        rm.textContent = "×";
        rm.title = `Remove "${name}" tab`;
        rm.addEventListener("click", (e) => {
          e.stopPropagation();
          _removeTab(name);
        });
        btn.appendChild(rm);
      }
    }

    btn.addEventListener("click", () => _activateTab(name));
    container.appendChild(btn);
  });

  // Add tab button (admin only)
  if (admin) {
    const addBtn = document.createElement("button");
    addBtn.className = "tab-add-btn";
    addBtn.textContent = "+";
    addBtn.title = "Add custom tab";
    addBtn.addEventListener("click", _addTab);
    container.appendChild(addBtn);
  }
}

function _activateTab(name) {
  if (!_tabs.includes(name)) return;
  currentTab = name;
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === name);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.style.display = panel.dataset.tab === name ? "block" : "none";
  });
  loadNoteCards(current);
}

async function _addTab() {
  const input = await promptDialog("New tab name:");
  const raw = input?.trim().toLowerCase().replace(/\s+/g, "-");
  if (!raw) return;
  if (_tabs.includes(raw)) { await alertDialog(`Tab "${raw}" already exists.`); return; }
  excelDM.tabs = [..._tabs, raw];
  excelDM.dirtyMeta = true;
  initTabs(excelDM.tabs);
  saveData();
}

function _removeTab(name) {
  excelDM.tabs = _tabs.filter((t) => t !== name);
  excelDM.dirtyMeta = true;
  if (currentTab === name) currentTab = excelDM.tabs[0] ?? "locations";
  initTabs(excelDM.tabs);
  saveData();
}

// Hotkey support: navigate left/right through tabs
export function navigateTab(direction) {
  const idx = _tabs.indexOf(currentTab);
  const next = _tabs[(idx + direction + _tabs.length) % _tabs.length];
  _activateTab(next);
}
