import { current, excelDM, tabNames } from "./main.js";
import { loadNoteCards } from "./left.js";
import { saveData } from "./localStorage.js";

export let currentTab = "locations";


export function initTabs(tabsArray) {
  const tabsContainer = document.querySelector(".tabs");
  tabsContainer.innerHTML = ""; // Clear existing buttons

  tabsArray.forEach((name, index) => {
    const button = document.createElement("button");
    button.className = "tab-button";
    if (index === 0) button.classList.add("active");
    button.dataset.tab = name;
    button.textContent =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    tabsContainer.appendChild(button);
  });

  function activateTab(index) {
    const buttons = document.querySelectorAll(".tab-button");
    const validTabs = tabsArray;

    // Wrap index cyclically
    if (index < 0) index = validTabs.length - 1;
    if (index >= validTabs.length) index = 0;

    const tab = validTabs[index];
    currentTab = tab;

    buttons.forEach((btn) => btn.classList.remove("active"));
    buttons[index].classList.add("active");

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.style.display = panel.dataset.tab === tab ? "block" : "none";
    });
    loadNoteCards(current);
  }

  // Initial activation
  // activateTab(0);

  // Button click handler
  document.querySelectorAll(".tab-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      activateTab(index);
    });
  });
}
