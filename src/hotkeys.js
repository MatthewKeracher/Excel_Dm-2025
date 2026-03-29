import { current, excelDM, reCurrent } from "./main.js";
import { loadNoteCards } from "./left.js";
import { currentTab } from "./tabs.js";
import { addEntry, saveFile } from "./buttons.js";

let currentIndex = -1;
let tabTracker = currentTab;

// --- Guards ---

function isModalOpen() {
  const authModal    = document.getElementById("auth-modal");
  const campaignModal = document.getElementById("campaign-modal");
  const accountModal  = document.getElementById("account-modal");
  return authModal?.style.display === "flex"
      || campaignModal?.style.display === "flex"
      || accountModal?.style.display === "flex";
}

function isEditing(event) {
  const activeElement = document.activeElement;
  if (activeElement?.closest(".snippet-panel")) return true;
  if (!activeElement?.classList.contains("editing")) return false;

  if (event.key === "Escape") {
    const currentEditor = document.querySelector(".editor");
    if (currentEditor) {
      const saveBtn = currentEditor.querySelector(".save-btn");
      if (saveBtn) {
        saveBtn.click();
      } else if (confirm("Close Editor without Saving?")) {
        currentEditor.remove();
      }
    }
  }
  return true;
}

// --- Command handlers ---

function toggleFilter(event) {
  event.preventDefault();
  const filter = document.querySelector(".filter");
  filter.style.display = filter.style.display === "block" ? "none" : "block";
}

function navigateRight() {
  const focusableCards = document.querySelectorAll(".notecard");
  const currentCard = focusableCards[currentIndex];
  currentCard.querySelector(".next-btn").click();
  currentIndex = -1;
}

function navigateLeft() {
  const focusableCards = document.querySelectorAll(".notecard");
  const currentCard = focusableCards[currentIndex];
  currentCard.querySelector(".prev-btn").click();
  currentIndex = -1;
}

function navigateVertical(event, direction) {
  event.preventDefault();

  if (currentTab !== tabTracker) {
    currentIndex = -1;
    tabTracker = currentTab;
  }

  const focusableCards = document.querySelectorAll(".notecard");
  document.querySelectorAll(".highlight").forEach((el) => el.classList.remove("highlight"));

  currentIndex += direction;
  if (currentIndex >= focusableCards.length) currentIndex = 0;
  if (currentIndex < -1) currentIndex = focusableCards.length - 1;

  focusableCards[currentIndex].classList.add("highlight");
  focusableCards[currentIndex].focus();
  focusableCards[currentIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });

  const title = focusableCards[currentIndex].getAttribute("data-entry-title");
  const label = document.querySelector(`.label[data-entry-title="${CSS.escape(title)}"]`);
  if (label) {
    label.classList.add("highlight");
    label.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function handleEscape() {
  const searchBox = document.getElementById("search-box");
  const searchBar = document.getElementById("search-bar");
  if (searchBox.style.display === "block") {
    searchBox.style.display = "none";
    searchBar.value = "";
  }
}

function handleEnter() {
  const searchBox = document.getElementById("search-box");
  const searchBar = document.getElementById("search-bar");
  if (searchBox.style.display !== "block") return;

  if (searchBar.value === ">add") {
    addEntry();
  } else if (searchBar.value === ">save filter") {
    saveFile(true);
  } else if (searchBar.value === ">save") {
    saveFile();
  }

  searchBox.style.display = "none";
  searchBar.value = "";
  reCurrent();
}

function openSearch() {
  const searchBox = document.getElementById("search-box");
  const searchBar = document.getElementById("search-bar");
  if (searchBox.style.display === "none" || !searchBox.style.display) {
    document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
    searchBox.style.display = "block";
    searchBar.focus();
  }
}

// --- Dispatch table ---

const commands = {
  Tab:        (e) => toggleFilter(e),
  ArrowRight: ()  => navigateRight(),
  ArrowLeft:  ()  => navigateLeft(),
  ArrowDown:  (e) => navigateVertical(e, 1),
  ArrowUp:    (e) => navigateVertical(e, -1),
  Escape:     ()  => handleEscape(),
  Enter:      ()  => handleEnter(),
};

// --- Init ---

export function addHotkeys() {
  document.addEventListener("keydown", (event) => {
    if (isModalOpen()) return;
    if (isEditing(event)) return;
    if (event.key === "Alt" || event.key === "Shift" || event.ctrlKey) return;

    const handler = commands[event.key];
    if (handler) {
      handler(event);
    } else {
      openSearch();
    }
  });

  const searchBar = document.getElementById("search-bar");
  const searchBox = document.getElementById("search-box");

  searchBar.addEventListener("blur", () => {
    if (searchBox.style.display === "block") {
      searchBox.style.display = "none";
      searchBar.value = "";
    }
  });

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const results = excelDM.entries.filter(
      (entry) =>
        entry.title?.toLowerCase().includes(query) ||
        entry.category?.toLowerCase().includes(query),
    );
    loadNoteCards(results, "search");
  });
}
