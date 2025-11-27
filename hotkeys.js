import { excelDM, reCurrent } from "./main.js";
import { loadNoteCards } from "./left.js";
import { currentTab } from "./tabs.js";
import { addEntry, saveFile } from "./buttons.js";

let currentIndex = -1; // tracks highlighted card index
let tabTracker = currentTab;

export function addHotkeys() {
  document.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;

    // Check if currently editing
    if (activeElement && activeElement.classList.contains("editing")) {
      if (event.key === "Escape") {
        const inputElem = document.querySelector(
          "input.notecard-title.editing"
        );
        const parent = inputElem.parentElement;
        const editBtn = parent.querySelector("button.edit-btn");
        editBtn.click();
      }
      return; // Exit early if editing
    }

    // For other keys except modifiers, tab, and arrows
    if (event.key === "Alt" || event.key === "Shift") {
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const focusableCards = document.querySelectorAll(".notecard");
      const currentCard = focusableCards[currentIndex];

      currentCard.querySelector(".edit-btn").click();
      return;
    }

    if (event.key === "ArrowRight") {
      const focusableCards = document.querySelectorAll(".notecard");
      const currentCard = focusableCards[currentIndex];

      currentCard.querySelector(".next-btn").click();
      currentIndex = -1;

      return;
    }

    if (event.key === "ArrowLeft") {
      const focusableCards = document.querySelectorAll(".notecard");
      const currentCard = focusableCards[currentIndex];

      currentCard.querySelector(".prev-btn").click();
      currentIndex = -1;

      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (currentTab !== tabTracker) {
        currentIndex = -1;
        console.log(currentIndex);
        tabTracker = currentTab;
      }

      const focusableCards = document.querySelectorAll(".notecard");

      document
        .querySelectorAll(".highlight")
        .forEach((el) => el.classList.remove("highlight"));

      // Update currentIndex
      if (event.key === "ArrowDown") {
        currentIndex++;
        if (currentIndex === focusableCards.length) {
          currentIndex = 0;
        }
      } else if (event.key === "ArrowUp") {
        currentIndex--;
        if (currentIndex < -1) {
          currentIndex = focusableCards.length - 1;
        }
      }

      focusableCards[currentIndex].classList.add("highlight");
      focusableCards[currentIndex].focus();
      focusableCards[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

      const title =
        focusableCards[currentIndex].getAttribute("data-entry-title");

      const label = document.querySelector(
        `.label[data-entry-title="${CSS.escape(title)}"]`
      );

      if (label) {
        label.classList.add("highlight");
        label.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
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

    if (event.key === "Escape") {
      if (searchBox.style.display === "block") {
        searchBox.style.display = "none";
        searchBar.value = "";
      }
    }

    if (event.key === "Enter") {
      if (searchBox.style.display === "block") {
        if (searchBar.value === "> add") {
          addEntry();
        } else if (searchBar.value === "> save") {
          saveFile();
        }

        searchBox.style.display = "none";
        searchBar.value = "";
        reCurrent();
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
}
