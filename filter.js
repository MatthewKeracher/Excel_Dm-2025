import { excelDM, current } from "./main.js";
import { tabNames } from "./main.js";
import { loadNoteCards } from "./left.js";
import { saveCategories } from "./localStorage.js";

// Global event handler references
const filterHandlers = {
  toggleHeader: null,
  toggleCheckbox: null,
};

export function compileCategories() {
  const categoriesByType = {};

  // ✅ USE tabNames as requested
  tabNames.forEach((type) => {
    categoriesByType[type] = new Map(); // category -> state
  });

  excelDM.entries.forEach((entry) => {
    if (
      entry.category &&
      categoriesByType[entry.type]
    ) {
      // Split comma-separated categories
      const categories = entry.category
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat);
      
      categories.forEach((category) => {
        // ✅ CORRECTLY check nested structure: excelDM.categories[entry.type][category]
        const currentState = excelDM.categories[entry.type]?.[category];
        categoriesByType[entry.type].set(
          category,
          currentState ?? 0
        );
      });
    }
  });

  // ✅ Build nested structure from maps using tabNames
  excelDM.categories = {};
  tabNames.forEach((type) => {
    excelDM.categories[type] = Object.fromEntries(categoriesByType[type]);
  });

  console.log("Compiled Categories:", excelDM.categories);
}


function handleFilter() {
  const topLevelCategories = Object.keys(excelDM.categories || {});

  if (topLevelCategories.length === 0) {
    return `
      <div style="padding: 10px;">
        <p style="color: lime; font-style: italic;">No categories available</p>
      </div>
    `;
  }

  return `
    <div style="padding: 10px;">
      Filter Entries by Tags:<hr><br>
      ${topLevelCategories
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
                      `,
                      )
                      .join("")
                  : '<p style="color: lime; font-style: italic;">No categories</p>'
              }
            </div>
          </div>
        `,
        )
        .join("")}
    </div>
  `;
}

function headerHandlers() {
  return (e) => {
    if (e.target.matches(".tab-header")) {
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
}

function checkboxHandler() {
  return (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const category = e.target.value;
      const tabType =
        e.target.closest(".filter-categories").previousElementSibling.dataset
          .tab;

      excelDM.categories[tabType][category] =
        excelDM.categories[tabType][category] === 1 ? 0 : 1;

      e.target.checked = excelDM.categories[tabType][category] === 1;
      saveCategories();
      loadNoteCards(current);
      console.log(excelDM.categories);
    }
  };
}

// Clear existing event listeners from filter
function clearFilterListeners(filter) {
  if (filterHandlers.toggleHeader) {
    filter.removeEventListener("click", filterHandlers.toggleHeader);
  }
  if (filterHandlers.toggleCheckbox) {
    filter.removeEventListener("change", filterHandlers.toggleCheckbox);
  }
}

// Main orchestrator function
export function updateFilter() {
  compileCategories();

  const filter = document.querySelector(".filter");
  if (!filter) return;

  // Clear existing listeners
  clearFilterListeners(filter);

  // Set new content
  filter.innerHTML = handleFilter();

  // Create and attach new handlers
  filterHandlers.toggleHeader = headerHandlers();
  filterHandlers.toggleCheckbox = checkboxHandler();

  filter.addEventListener("click", filterHandlers.toggleHeader);
  filter.addEventListener("change", filterHandlers.toggleCheckbox);
}
