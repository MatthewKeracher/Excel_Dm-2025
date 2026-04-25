import { Entry } from "./classes.js";
import { excelDM, reCurrent, newCurrent, current } from "./main.js";
import { currentTab } from "./tabs.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { saveData } from "./localStorage.js";
import { loadEditor } from "./editor.js";
import { makeDraggable } from "./dragging.js";
import { setPopOut, clearPopOut } from "./popoutState.js";
import { isPinned, setPinned } from "./pinState.js";
import { isViewer, isAdmin } from "./userRole.js";
import { wireInlineFields } from "./inlineFields.js";
import { confirmDialog } from "./dialog.js";

// --- Card base ---

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
  if (isPinned(entry._serverId)) body.style.maxHeight = "100%";

  wireInlineFields(body, entry, {
    disabled: isViewer(),
    onFocus: () => excelDM.dirtyEntries.add(entry),
    onSave: () => saveData(),
  });

  return { card, title, body };
}

function addCollapseToggle(card, body, editState, entry) {
  card.addEventListener("click", () => {
    // Pinned cards stay fully expanded — clicks don't collapse them.
    if (isPinned(entry?._serverId)) {
      body.style.maxHeight = "100%";
      return;
    }
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

// --- Button factories ---

function createDeleteButton(entry) {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Delete note";
  deleteBtn.innerHTML = "❌";

  deleteBtn.addEventListener("click", async (event) => {
    if (event.shiftKey || await confirmDialog(`Delete this ${currentTab} and any children?`)) {
      clearPopOut(entry._serverId);
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
    if (editState.isEditing) return;
    editState.isEditing = true;
    loadEditor(entry, body, title, category, editBtn, editState.isEditing, marked);
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
        console.log(entry);
        nextObjective = makeNoteCard(entry.children[0]);
      }

      let rootNode = entry.findRootNode();
      rootNode.currentChild = entry.countParentsUp();
      excelDM.dirtyEntries.add(rootNode);
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

  prevbtn.addEventListener("click", async () => {
    if (entry.type === "locations") {
      if (!entry.parent.parent) {
        const userConfirmed = await confirmDialog("Do you want to make a new, outer layer?");
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
        const userConfirmed = await confirmDialog("Do you want to make a new, previous objective?");
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
      excelDM.dirtyEntries.add(rootNode);
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

function createObjectivesButton(entry, card) {
  const btn = document.createElement("button");
  btn.className = "objectives-btn";
  btn.title = "Show Objectives";
  btn.innerHTML = "≡";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const existing = card.querySelector(".objectives-panel");
    if (existing) {
      existing.remove();
      return;
    }

    const root = entry.findRootNode();

    // Walk the chain root → leaf collecting each node and its depth
    const chain = [];
    let node = root;
    let depth = 0;
    while (node) {
      chain.push({ node, depth });
      node = node.children.length > 0 ? node.children[0] : null;
      depth++;
    }

    const panel = document.createElement("div");
    panel.className = "objectives-panel";

    chain.forEach(({ node: obj, depth: d }) => {
      const item = document.createElement("div");
      item.className = "objective-item";
      const currentDepth = root.currentChild ?? 0;
      if (d === currentDepth) item.classList.add("objective-current");
      item.textContent = obj.title;

      item.addEventListener("click", (e) => {
        e.stopPropagation();
        root.currentChild = d === 0 ? null : d;
        excelDM.dirtyEntries.add(root);
        saveData();
        reCurrent();
      });

      panel.appendChild(item);
    });

    card.appendChild(panel);
  });

  return btn;
}

function createLockButton(entry, body) {
  const lockbtn = document.createElement("button");
  lockbtn.className = "lock-btn";
  lockbtn.title = "Pin (keep card expanded)";

  const paint = () => {
    const pinned = isPinned(entry._serverId);
    lockbtn.innerHTML = pinned ? "🔒" : "🔓";
    lockbtn.style.backgroundColor = pinned ? "red" : "transparent";
  };
  paint();

  lockbtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const next = !isPinned(entry._serverId);
    setPinned(entry._serverId, next);
    paint();
    if (body) body.style.maxHeight = next ? "100%" : "4.6em";
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
        if (entry.type === "quests") {
          // Recolour the whole questline (root + every descendant).
          const root = entry.findRootNode();
          const stack = [root];
          while (stack.length) {
            const node = stack.pop();
            node.color = color;
            excelDM.dirtyEntries.add(node);
            (node.children ?? []).forEach((c) => stack.push(c));
          }
        } else {
          entry.color = color;
          excelDM.dirtyEntries.add(entry);
        }
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
    setPopOut(entry._serverId, entry.coords);
    loadPopUp();
    reCurrent();
  });

  return popbtn;
}

function assembleCard(card, title, body, buttonsContainer, category, buttons, entry) {
  const { deleteBtn, editBtn, nextBtn, counterBtn, prevbtn, lockbtn, clrbtn, popbtn, objectivesBtn } = buttons;
  const viewer = isViewer();

  if (!viewer) {
    buttonsContainer.appendChild(clrbtn);
    buttonsContainer.appendChild(popbtn);
  }

  if (entry.type === "locations") {
    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(nextBtn);
  } else if (entry.type === "quests") {
    buttonsContainer.appendChild(objectivesBtn);
    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(counterBtn);
    buttonsContainer.appendChild(nextBtn);
  }

  // Pin button available on every card type.
  if (!viewer) buttonsContainer.appendChild(lockbtn);

  card.appendChild(category);

  if (!viewer) {
    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(editBtn);
  }

  card.appendChild(buttonsContainer);
  card.appendChild(title);
  card.appendChild(body);
}

// --- Public API ---

export function makeNoteCard(entry, isPopOut = false) {
  const { card, title, body } = createCardBase(entry);
  const editState = { isEditing: false };

  if (!isPopOut) addCollapseToggle(card, body, editState, entry);
  addMapHighlight(card, entry);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-top-right";

  const category = document.createElement("div");
  category.className = "notecard-category";
  category.textContent = entry.category || "Uncategorised";

  const deleteBtn     = createDeleteButton(entry);
  const editBtn       = createEditButton(entry, body, title, category, editState);
  const nextBtn       = createNextButton(entry, card);
  const counterBtn    = createCounterButton(entry);
  const prevbtn       = createPrevButton(entry, card);
  const lockbtn       = createLockButton(entry, body);
  const clrbtn        = createColorButton(entry, card);
  const popbtn        = createPopOutButton(entry);
  const objectivesBtn = createObjectivesButton(entry, card);

  assembleCard(card, title, body, buttonsContainer, category,
    { deleteBtn, editBtn, nextBtn, counterBtn, prevbtn, lockbtn, clrbtn, popbtn, objectivesBtn },
    entry);

  return card;
}

export function makePopOut(entry, coords) {
  entry.popOut = true;

  const popOut = makeNoteCard(entry, true);
  popOut.classList.add("popout");

  popOut.style.left = coords ? coords.x : entry.coords.x;
  popOut.style.top = coords ? coords.y : entry.coords.y;

  const popOutBody = popOut.querySelector(".notecard-body");
  popOutBody.style.maxHeight = "60vh";
  popOutBody.style.overflowY = "scroll";

  makeDraggable(popOut, (newCoords) => {
    entry.coords = newCoords;
    setPopOut(entry._serverId, newCoords);
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
      clearPopOut(entry._serverId);
      reCurrent();
    });
  }

  return popOut;
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
