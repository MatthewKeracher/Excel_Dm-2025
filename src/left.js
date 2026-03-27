import { Entry } from "./classes.js";
import { excelDM, reCurrent, newCurrent, current } from "./main.js";
import { currentTab } from "./tabs.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { saveData } from "./localStorage.js";
import { loadEditor } from "./editor.js";

export function loadNoteCards(data, search = "no") {
  let entries;
  const container = document.getElementById("leftPanel");
  container.innerHTML = "";

  if (search === "search") {
    entries = data;
  } else if (search === "no") {
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
          if (entry.currentChild === null) return entry; // Keep unchanged

          const currentQuest = entry.getNestedAtDepth();
          return currentQuest; // Add property instead
        });

        entries = updatedEntries;

        entries.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        );

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

    // ✅ Filter out unchecked categories - comma-separated support
    const checkedCategories = Object.entries(excelDM.categories[currentTab])
      .filter(([cat, state]) => state === 1)
      .map(([cat]) => cat);

    // Expand comma-separated checked categories
    const expandedCheckedCategories = [];
    checkedCategories.forEach((cat) => {
      // If category itself contains commas, split it
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
          return true; // No category = show all

        // Split entry's category by commas
        const entryCats = entry.category
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c);

        // Show if ANY of entry's categories match checked ones
        return entryCats.some((cat) => expandedCheckedCategories.includes(cat));
      });
    }
  }

  entries.forEach((entry) => {
    if (entry.popOut) {
      return;
    }
    let div = makeNoteCard(entry);
    container.appendChild(div);
  });
}

let nextZIndex = 51;

function makeDraggable(element, saveCoordsCallback = null) {
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  // Drag handle (whole element)
  element.style.cursor = "move";
  element.style.userSelect = "none";
  element.style.position = "fixed"; // Ensure positioned

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - element.getBoundingClientRect().left;
    dragOffsetY = e.clientY - element.getBoundingClientRect().top;
    element.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    element.style.zIndex = (nextZIndex++).toString();
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    element.style.left = `${e.clientX - dragOffsetX}px`;
    element.style.top = `${e.clientY - dragOffsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (saveCoordsCallback) {
      saveCoordsCallback({
        x: element.style.left,
        y: element.style.top,
      });
    }
    isDragging = false;
    element.style.cursor = "grab";
    document.body.style.userSelect = "";
  });

  return { isDragging, dragOffsetX, dragOffsetY };
}

export function loadPopUp() {
  document.querySelectorAll(".popout").forEach((popout) => {
    popout.remove();
  });

  const popOuts = excelDM.entries.filter((entry) => entry.popOut === true);
  if (popOuts.length > 0) {
    popOuts.forEach((popOut) => {
      let div = makePopOut(popOut);
      document.body.appendChild(div);
    });
  }
}

function makePopOut(entry, coords) {
  entry.popOut = true;
  excelDM.dirtyEntries.add(entry);
  saveData();

  const popOut = makeNoteCard(entry, true);
  popOut.classList.add("popout");

  popOut.style.left = coords ? coords.x : entry.coords.x;
  popOut.style.top = coords ? coords.y : entry.coords.y;

  const popOutBody = popOut.querySelector(".notecard-body");
  popOutBody.style.maxHeight = "60vh";
  popOutBody.style.overflowY = "scroll";

  // Make draggable using refactored function
  makeDraggable(popOut, (coords) => {
    entry.coords = coords;
    excelDM.dirtyEntries.add(entry);
    saveData();
  });

  const popOutBtn = popOut.querySelector(".pop-btn");
  popOutBtn.remove();

  const deleteBtn = popOut.querySelector(".delete-btn");
  if (deleteBtn) {
    deleteBtn.title = "Close Window";
    deleteBtn.replaceWith(deleteBtn.cloneNode(true));
    const newDeleteBtn = popOut.querySelector(".delete-btn");
    newDeleteBtn.addEventListener("click", () => {
      popOut.remove();
      entry.popOut = false;
      reCurrent();
    });
  }

  return popOut;
}

// --- Card builder helpers ---

function createCardBase(entry) {
  const card = document.createElement("div");
  card.dataset.entryTitle = entry.title;
  card.className = "notecard";
  card.style.backgroundColor = entry?.color || "";

  const title = document.createElement("div");
  title.className = "notecard-title";
  title.textContent = entry.title;

  const body = document.createElement("div");
  body.className = "notecard-body";
  body.dataset.fullText = entry.body;
  body.innerHTML = marked.parse(entry.body);
  body.style.marginTop = "8px";
  body.style.backgroundColor = entry?.color || "";

  return { card, title, body };
}

function addCollapseToggle(card, body, editState) {
  card.addEventListener("click", () => {
    if (body.style.maxHeight === "100%" && editState.isEditing === false) {
      body.style.maxHeight = "4.6em";
    } else {
      body.style.maxHeight = "100%";
    }
  });
}

function addMapHighlight(card, entry) {
  card.addEventListener("mouseenter", (e) => {
    const label = document.querySelector(
      `.label[data-entry-title="${CSS.escape(entry.title)}"]`,
    );
    if (label) {
      label.classList.add("highlight");
      label.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  card.addEventListener("mouseleave", () => {
    const label = document.querySelector(
      `.label[data-entry-title="${CSS.escape(entry.title)}"]`,
    );
    card.classList.remove("highlight");
    if (label) label.classList.remove("highlight");
  });
}

function createDeleteButton(entry) {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Delete note";
  deleteBtn.innerHTML = "❌";

  deleteBtn.addEventListener("click", (event) => {
    if (
      event.shiftKey ||
      confirm(`Delete this ${currentTab} and any children?`)
    ) {
      excelDM.deleteEntry(entry);
    }
    reCurrent();
  });

  return deleteBtn;
}

function createEditButton(entry, body, title, category, editState) {
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.title = "Edit note";
  editBtn.innerHTML = "🖉";

  editBtn.addEventListener("click", () => {
    if (!editState.isEditing) {
      editState.isEditing = true;
      loadEditor(entry, body, title, category, editBtn, editState.isEditing, marked);
    }
  });

  return editBtn;
}

function createNextButton(entry, card) {
  const nextBtn = document.createElement("button");
  nextBtn.className = "next-btn";
  nextBtn.title = entry.type === "locations" ? "Go Inside" : "Next Objective";
  nextBtn.innerHTML = ">";

  nextBtn.addEventListener("click", () => {
    if (entry.children.length === 0) {
      let newEntry = new Entry({
        category: entry.category,
        title: `Inside ${entry.title}`,
        color: entry.color,
      });
      excelDM.add(newEntry);
      excelDM.n(entry.title).parentOf(excelDM.n(`Inside ${entry.title}`));
    }

    if (entry.type === "locations") {
      newCurrent(entry);
    } else if (entry.type === "quests") {
      let nextObjective;

      if (entry.popOut) {
        entry.popOut = false;
        nextObjective = makePopOut(entry.children[0], entry.coords);
      } else {
        console.log(entry)
        nextObjective = makeNoteCard(entry.children[0]);
      }

      let rootNode = entry.findRootNode();
      rootNode.currentChild = entry.countParentsUp();
      card.replaceWith(nextObjective);

      const newBody = nextObjective.querySelector(".notecard-body");
      if (newBody) {
        newBody.style.maxHeight = "100%";
      }

      saveData();
    }
  });

  return nextBtn;
}

function createCounterButton(entry) {
  const counterBtn = document.createElement("button");
  counterBtn.innerHTML = entry.countParentsUp();
  return counterBtn;
}

function createPrevButton(entry, card) {
  const prevbtn = document.createElement("button");
  prevbtn.className = "prev-btn";
  prevbtn.title = entry.type === "locations" ? "Go Outside" : "Previous Objective";
  prevbtn.innerHTML = "<";

  prevbtn.addEventListener("click", () => {
    if (entry.type === "locations") {
      if (!entry.parent.parent) {
        const userConfirmed = confirm("Do you want to make a new, outer layer?");
        if (userConfirmed) {
          let newEntry = new Entry({
            title: `Outside ${entry.parent.title}`,
            color: entry.parent.color,
          });
          excelDM.add(newEntry);
          excelDM.n(`Outside ${entry.parent.title}`).parentOf(entry.parent);
        }
      }
      newCurrent(entry.parent.parent);
    } else if (entry.type === "quests") {
      if (!entry.parent) {
        const userConfirmed = confirm("Do you want to make a new, previous objective?");
        if (userConfirmed) {
          let newEntry = new Entry({
            title: `Before ${entry.title}`,
            color: entry.color,
          });
          excelDM.add(newEntry);
          excelDM.n(`Before ${entry.title}`).parentOf(entry);
        }
      }

      let lastObjective;
      if (entry.popOut) {
        entry.popOut = false;
        lastObjective = makePopOut(entry.parent, entry.coords);
      } else {
        lastObjective = makeNoteCard(entry.parent);
      }

      let rootNode = entry.findRootNode();
      rootNode.currentChild = entry.countParentsUp() - 2;
      card.replaceWith(lastObjective);

      const newBody = lastObjective.querySelector(".notecard-body");
      if (newBody) {
        newBody.style.maxHeight = "100%";
      }

      saveData();
    }
  });

  return prevbtn;
}

function createLockButton(entry) {
  const lockbtn = document.createElement("button");
  lockbtn.className = "lock-btn";
  lockbtn.title = "Pin";

  if (entry.parent === current) {
    lockbtn.innerHTML = "🔒";
    lockbtn.style.backgroundColor = "red";
  } else {
    lockbtn.innerHTML = "🔓";
    lockbtn.style.backgroundColor = "transparent";
  }

  lockbtn.addEventListener("click", () => {
    if (lockbtn.innerHTML === "🔓") {
      lockbtn.innerHTML = "🔒";
      lockbtn.style.backgroundColor = "red";
      current.parentOf(entry);
    } else {
      lockbtn.innerHTML = "🔓";
      entry.parent.children = entry.parent.children.filter((e) => e !== entry);
      entry.parent = [];
      lockbtn.style.backgroundColor = "transparent";
    }
    reCurrent();
  });

  return lockbtn;
}

function createColorButton(entry, card) {
  const clrbtn = document.createElement("button");
  clrbtn.className = "clr-btn";
  clrbtn.title = "Change Colour";
  clrbtn.innerHTML = "🎨";

  clrbtn.addEventListener("click", () => {
    const colorGridContainer = document.createElement("div");
    colorGridContainer.style.display = "grid";
    colorGridContainer.style.gridTemplateColumns = "repeat(3, 40px)";
    colorGridContainer.style.gridGap = "8px";
    colorGridContainer.style.padding = "10px";
    colorGridContainer.classList.add("color-grid-container");

    colorGridContainer.addEventListener("mouseleave", () => {
      colorGridContainer.style.display = "none";
    });

    const pastelColors = [
      "rgba(255, 179, 186, 1)", // Pastel Red
      "rgba(233, 157, 71, 1)",  // Pastel Orange
      "rgba(255, 255, 186, 1)", // Pastel Yellow
      "rgba(142, 194, 154, 1)", // Pastel Green
      "rgba(186, 225, 255, 1)", // Pastel Blue
      "rgba(109, 196, 188, 1)", // Pastel Teal
      "rgba(148, 140, 187, 1)", // Pastel Indigo
      "rgba(221, 186, 255, 1)", // Pastel Violet
      "rgba(245, 245, 245, 1)", // White Smoke
    ];

    pastelColors.forEach((color) => {
      const colorBtn = document.createElement("button");
      colorBtn.style.backgroundColor = color;
      colorBtn.style.border = "none";
      colorBtn.style.width = "40px";
      colorBtn.style.height = "40px";
      colorBtn.style.cursor = "pointer";
      colorBtn.title = color;

      colorBtn.addEventListener("click", () => {
        entry.color = color;
        colorGridContainer.style.display = "none";
        reCurrent();
      });

      colorGridContainer.appendChild(colorBtn);
    });

    card.appendChild(colorGridContainer);
  });

  return clrbtn;
}

function createPopOutButton(entry) {
  const popbtn = document.createElement("button");
  popbtn.className = "pop-btn";
  popbtn.title = "Pop Out";
  popbtn.innerHTML = "⟰";

  popbtn.addEventListener("click", () => {
    entry.popOut = true;
    loadPopUp();
    reCurrent();
  });

  return popbtn;
}

function assembleCard(card, title, body, buttonsContainer, category, buttons, entry) {
  const { deleteBtn, editBtn, nextBtn, counterBtn, prevbtn, lockbtn, clrbtn, popbtn } = buttons;

  buttonsContainer.appendChild(clrbtn);
  buttonsContainer.appendChild(popbtn);

  if (entry.type === "locations") {
    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(nextBtn);
  } else if (entry.type === "quests") {
    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(counterBtn);
    buttonsContainer.appendChild(nextBtn);
  } else {
    buttonsContainer.appendChild(lockbtn);
  }

  card.appendChild(category);

  buttonsContainer.appendChild(deleteBtn);
  buttonsContainer.appendChild(editBtn);

  card.appendChild(buttonsContainer);
  card.appendChild(title);
  card.appendChild(body);
}

function makeNoteCard(entry, isPopOut = false) {
  const { card, title, body } = createCardBase(entry);
  const editState = { isEditing: false };

  if (!isPopOut) addCollapseToggle(card, body, editState);
  addMapHighlight(card, entry);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-top-right";

  const category = document.createElement("div");
  category.className = "notecard-category";
  category.textContent = entry.category || "Uncategorised";

  const deleteBtn  = createDeleteButton(entry);
  const editBtn    = createEditButton(entry, body, title, category, editState);
  const nextBtn    = createNextButton(entry, card);
  const counterBtn = createCounterButton(entry);
  const prevbtn    = createPrevButton(entry, card);
  const lockbtn    = createLockButton(entry);
  const clrbtn     = createColorButton(entry, card);
  const popbtn     = createPopOutButton(entry);

  assembleCard(card, title, body, buttonsContainer, category,
    { deleteBtn, editBtn, nextBtn, counterBtn, prevbtn, lockbtn, clrbtn, popbtn },
    entry);

  return card;
}
