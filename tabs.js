import { current, excelDM, tabNames } from "./main.js";
import { loadNoteCards } from "./left.js";
import { saveData } from "./localStorage.js";

export let currentTab = "locations";

export function compileCategories() {
  const categoriesByType = {};
  
  tabNames.forEach(type => {
    categoriesByType[type] = new Map(); // category -> state
  });
  
  excelDM.entries.forEach((entry) => {
    if (entry.category && categoriesByType[entry.type] && entry.type !== 'locations') {
      // Split comma-separated categories
      const categories = entry.category.split(',').map(cat => cat.trim()).filter(cat => cat);
      categories.forEach(category => {
        categoriesByType[entry.type].set(
          category, 
          entry.categoryState !== undefined ? entry.categoryState : 0
        );
      });
    }
  });

  // SEPARATE LOGIC FOR LOCATIONS - from current.children + comma support
  if (current && current.children) {
    current.children.forEach((entry) => {
      if (entry.category) {
        const categories = entry.category.split(',').map(cat => cat.trim()).filter(cat => cat);
        categories.forEach(category => {
          categoriesByType.locations.set(
            category, 
            entry.categoryState !== undefined ? entry.categoryState : 0
          );
        });
      }
    });
  }
  
  excelDM.categories = {};
  tabNames.forEach(type => {
    excelDM.categories[type] = Object.fromEntries(categoriesByType[type]);
  });
}



// Global event handler references
const filterHandlers = {
  toggleHeader: null,
  toggleCheckbox: null
};

export function updateFilter() {
  compileCategories();

  const filter = document.querySelector(".filter");
  
  // ✅ REMOVE ALL EXISTING LISTENERS FIRST
  if (filterHandlers.toggleHeader) {
    filter.removeEventListener("click", filterHandlers.toggleHeader);
  }
  if (filterHandlers.toggleCheckbox) {
    filter.removeEventListener("change", filterHandlers.toggleCheckbox);
  }

  filter.innerHTML = ""; // Clear existing content

  filter.innerHTML = `
    <div style="padding: 10px;">
      Filter Entries by Tags:<hr><br>
      
      ${tabNames
        .map(
          (tab) => `
          <div style="margin-bottom: 15px;">
            <div class="tab-header" data-tab="${tab}">
              ${tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span class="toggle-icon">▼</span>
            <hr>
            </div>
            <div class="filter-categories" style="display: none; padding: 10px;">
              ${
                excelDM.categories[tab]
                  ? Object.entries(excelDM.categories[tab])
                      .map(
                        ([category, state]) => `
                        <label style="display: block; padding: 6px 0; cursor: pointer;">
                          <input type="checkbox" value="${category}" 
                                 ${state === 1 ? "checked" : ""}> ${category}
                        </label>
                      `
                      )
                      .join("")
                  : '<p style="color: #666; font-style: italic;">No categories</p>'
              }
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;

  // ✅ NAMED HANDLER for header toggle
  filterHandlers.toggleHeader = (e) => {
    if (e.target.matches('.tab-header')) {
      const header = e.target;
      const categories = header.nextElementSibling;
      const icon = header.querySelector(".toggle-icon");

      if (categories.style.display === "block") {
        categories.style.display = "none";
        icon.textContent = "▼";
      } else {
        categories.style.display = "block";
        icon.textContent = "▲";
      }
    }
  };

  // ✅ NAMED HANDLER for checkbox toggle - SINGLE FIRE
  filterHandlers.toggleCheckbox = (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const category = e.target.value;
      const tabType = e.target.closest(".filter-categories").previousElementSibling.dataset.tab;

      // Toggle ONCE per event
      excelDM.categories[tabType][category] = 
        excelDM.categories[tabType][category] === 1 ? 0 : 1;
      
      e.target.checked = excelDM.categories[tabType][category] === 1;
      console.log(excelDM.categories[tabType][category]);
      
      loadNoteCards(current);
    }
  };

  // ✅ ADD LISTENERS BACK - ONE AT A TIME
  filter.addEventListener("click", filterHandlers.toggleHeader);
  filter.addEventListener("change", filterHandlers.toggleCheckbox);
}


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
  activateTab(0);
  updateFilter()

  // Button click handler
  document.querySelectorAll(".tab-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      activateTab(index);
    });
  });
}
