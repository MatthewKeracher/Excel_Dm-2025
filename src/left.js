import { excelDM, current } from "./main.js";
import { currentTab } from "./tabs.js";
import { makeNoteCard, loadPopUp } from "./notecard.js";

export { loadPopUp };

export function loadNoteCards(data, search = "no") {
  let entries;
  const container = document.getElementById("leftPanel");
  container.innerHTML = "";

  if (search === "search") {
    entries = data;
  } else if (search === "no") {
    if (Array.isArray(data)) return; // home.js handles rendering when no world is open
    switch (currentTab) {
      case "locations":
        entries = data.children.filter((entry) => entry.type === "locations");
        entries.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        );
        break;
      case "quests":
        entries = excelDM.entries.filter(
          (entry) => entry.type === "quests" && entry.parent === null,
        );

        const updatedEntries = entries.map((entry) => {
          if (entry.currentChild === null) return entry;
          return entry.getNestedAtDepth();
        });

        entries = updatedEntries;

        entries.sort((a, b) => a.order - b.order);

        break;

      default:
        entries = excelDM.entries.filter((entry) => entry.type === currentTab);
        entries.sort((a, b) => {
          if (a.parent === current && !(b.parent === current)) return -1;
          if (!(a.parent === current) && b.parent === current) return 1;
          return a.title.localeCompare(b.title, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        });

        break;
    }

    // Filter out unchecked categories - comma-separated support
    const checkedCategories = Object.entries(excelDM.categories[currentTab])
      .filter(([cat, state]) => state === 1)
      .map(([cat]) => cat);

    const expandedCheckedCategories = [];
    checkedCategories.forEach((cat) => {
      if (cat.includes(",")) {
        const subCats = cat
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c);
        expandedCheckedCategories.push(...subCats);
      } else {
        expandedCheckedCategories.push(cat);
      }
    });

    if (expandedCheckedCategories.length > 0) {
      entries = entries.filter((entry) => {
        if (!entry.category || entry.category.trim() === "Uncategorised")
          return true;

        const entryCats = entry.category
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c);

        return entryCats.some((cat) => expandedCheckedCategories.includes(cat));
      });
    }
  }

  entries.forEach((entry) => {
    if (entry.popOut) return;
    let div = makeNoteCard(entry);
    container.appendChild(div);
  });
}
