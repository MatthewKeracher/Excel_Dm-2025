import { current } from "./main.js";
import { loadNoteCards } from "./left.js";

export let currentTab = "locations";

export function initTabs(tabsArray) {
  const tabsContainer = document.querySelector('.tabs');
  tabsContainer.innerHTML = ''; // Clear existing buttons

  tabsArray.forEach((name, index) => {
    // Create button element
    const button = document.createElement('button');
    button.className = 'tab-button';
    if (index === 0) button.classList.add('active'); // activate first tab
    button.dataset.tab = name; 
    button.textContent = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    tabsContainer.appendChild(button);
  });

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

      const validTabs = tabsArray;
      if (validTabs.includes(tab)) {
        currentTab = tab;
      }

      loadNoteCards(current);
    });
  });
};