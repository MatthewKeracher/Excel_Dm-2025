import { Entry } from "./classes.js";
import { excelDM, reCurrent, newCurrent, current } from "./main.js";
import { currentTab } from "./tabs.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { saveData } from "./localStorage.js";


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
          })
        );
        break;
      case "quests":
        entries = excelDM.entries.filter(
          (entry) => entry.type === "quests" && entry.parent === null
        );

        const updatedEntries = entries.map((entry) => {
          if (entry.currentChild === null) return entry; // Keep unchanged

          const currentQuest = entry.getNestedAtDepth();
          return currentQuest; // Add property instead
        });

        entries = updatedEntries;
        console.log(entries)

        entries.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, {
            numeric: true,
            sensitivity: "base",
          })
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
  }

  entries.forEach((entry, index) => {
    let div = makeNoteCard(entry, index);
    container.appendChild(div);
  });
}

function makeNoteCard(entry, index) {
  const card = document.createElement("div");
  card.dataset.entryTitle = entry.title;
  card.className = "notecard";
  card.style.backgroundColor = entry?.color || "";

  // Title container for title and delete button aligned horizontally
  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.position = "relative";

  const title = document.createElement("div");
  title.className = "notecard-title";
  title.textContent = entry.title;
  titleContainer.appendChild(title);

  const body = document.createElement("div");
  body.className = "notecard-body";
  body.dataset.fullText = entry.body;
  body.innerHTML = marked.parse(entry.body);
  body.style.marginTop = "8px";
  body.style.backgroundColor = entry?.color || "";

  card.addEventListener("click", () => {
    if (body.style.maxHeight === "100%") {
      body.style.maxHeight = "3.6em";
    } else {
      body.style.maxHeight = "100%";
    }
  });

  card.addEventListener("mouseenter", (e) => {
    const label = document.querySelector(
      `.label[data-entry-title="${CSS.escape(entry.title)}"]`
    );

    if (label) {
      label.classList.add("highlight");
      label.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  card.addEventListener("mouseleave", () => {
    const label = document.querySelector(
      `.label[data-entry-title="${CSS.escape(entry.title)}"]`
    );

    card.classList.remove("highlight");

    if (label) label.classList.remove("highlight");
  });

  //BUTTONS CONTAINER
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-top-right";

  //DELETE BUTTON
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Delete note";
  deleteBtn.innerHTML = "❌";

  deleteBtn.addEventListener("click", (event) => {
    if (
      event.shiftKey ||
      confirm(`Delete this ${currentTab} and any children?`)
    ) {
      //targetArray.splice(deleteIndex, 1);
      excelDM.deleteEntry(entry);
    }

    reCurrent();
  });

  //EDIT BUTTON
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.title = "Edit note";
  editBtn.innerHTML = "🖉";

  let isEditing = false;
  let textarea;
  let codeArea;

  editBtn.addEventListener("click", () => {
    if (!isEditing) {
      isEditing = true;
      textarea = document.createElement("textarea");
      textarea.className = "notecard-body editing";
      textarea.value = body.dataset.fullText;
      textarea.style.backgroundColor = entry?.color || "";

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.className = "notecard-title editing";
      titleInput.value = title.textContent;
      titleInput.style.backgroundColor = entry?.color || "";

      card.replaceChild(textarea, body);
      card.replaceChild(titleInput, title);
      card.classList.add("no-highlight");

      // Now replace textarea with CodeMirror editor
      codeArea = CodeMirror.fromTextArea(textarea, {
        mode: "markdown",
        lineNumbers: true,
        lineWrapping: true,
      });

      // Add 'editing' class to CodeMirror editor wrapper for styling/logic
      codeArea.getInputField().classList.add("editing");
      // codeArea.getWrapperElement().style.backgroundColor = entry?.color || "";

      editBtn.title = "Save note";
      editBtn.innerHTML = "💾";
      titleInput.focus();
    } else {
      isEditing = false;
      const newText = codeArea.getValue().trim();
      body.dataset.fullText = newText;
      entry.body = newText;
      body.innerHTML = marked.parse(newText);

      const newTitle = card
        .querySelector(".notecard-title.editing")
        .value.trim();
      entry.title = newTitle;
      title.textContent = newTitle;

      card.replaceChild(body, textarea);
      card.replaceChild(title, card.querySelector(".notecard-title.editing"));
      card.classList.remove("no-highlight");

      editBtn.title = "Edit note";
      editBtn.innerHTML = "🖉";
      reCurrent();
    }
  });

  //NEXT BUTTON
  const nextBtn = document.createElement("button");
  nextBtn.className = "next-btn";
  nextBtn.title = currentTab === "locations" ? "Go Inside" : "Next Objective";
  nextBtn.innerHTML = ">";

  nextBtn.addEventListener("click", () => {
    if (entry.children.length === 0) {
      let newEntry = new Entry({
        title: `Inside ${entry.title}`,
        color: entry.color,
      });
      excelDM.add(newEntry);
      excelDM.n(entry.title).parentOf(excelDM.n(`Inside ${entry.title}`));
    }

    if (currentTab === "locations") {
      newCurrent(entry);
    } else if (currentTab === "quests") {
      let nextObjective = makeNoteCard(entry.children[0]);
      let rootNode = entry.findRootNode();
      rootNode.currentChild = entry.countParentsUp();
      card.replaceWith(nextObjective);
      console.log(rootNode)
      saveData();
    }
  });

  //COUNTER
  const counterBtn = document.createElement("button");
  counterBtn.innerHTML = entry.countParentsUp();

  //PREV BUTTON
  const prevbtn = document.createElement("button");
  prevbtn.className = "prev-btn";
  prevbtn.title =
    currentTab === "locations" ? "Go Outside" : "Previous Objective";
  prevbtn.innerHTML = "<";

  prevbtn.addEventListener("click", () => {
    if (currentTab === "locations") {
      if (!entry.parent.parent) {
        // Show confirm dialog with Yes/No buttons
        const userConfirmed = confirm(
          "Do you want to make a new, outer layer?"
        );

        // If user clicks Yes (OK)
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
    } else if (currentTab === "quests") {
      if (!entry.parent) {
        // Show confirm dialog with Yes/No buttons
        const userConfirmed = confirm(
          "Do you want to make a new, previous objective?"
        );

        // If user clicks Yes (OK)
        if (userConfirmed) {
          let newEntry = new Entry({
            title: `Before ${entry.title}`,
            color: entry.color,
          });
          excelDM.add(newEntry);
          excelDM.n(`Before ${entry.title}`).parentOf(entry);
        }
      }
      let lastObjective = makeNoteCard(entry.parent);
      let rootNode = entry.findRootNode();
      rootNode.currentChild = entry.countParentsUp() - 2;
      card.replaceWith(lastObjective);
      console.log(rootNode)
      saveData()
    }
  });

  //LOCK BUTTON
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

  //COLOUR BUTTON
  const clrbtn = document.createElement("button");
  clrbtn.className = "clr-btn";
  clrbtn.title = "Change Colour";
  clrbtn.innerHTML = "🎨";

  clrbtn.addEventListener("click", () => {
    // Container for the color grid
    const colorGridContainer = document.createElement("div");
    colorGridContainer.style.display = "grid";
    colorGridContainer.style.gridTemplateColumns = "repeat(3, 40px)";
    colorGridContainer.style.gridGap = "8px";
    colorGridContainer.style.padding = "10px";
    colorGridContainer.classList.add("color-grid-container");

    colorGridContainer.addEventListener("mouseleave", () => {
      colorGridContainer.style.display = "none";
    });

    // Generate 9 pastel colors (3x3)
    const pastelColors = [
      "rgba(255, 179, 186, 1)", // Pastel Red
      "rgba(233, 157, 71, 1)", // Pastel Orange
      "rgba(255, 255, 186, 1)", // Pastel Yellow
      "rgba(142, 194, 154, 1)", // Pastel Green
      "rgba(186, 225, 255, 1)", // Pastel Blue
      "rgba(109, 196, 188, 1)", // Pastel Teal
      "rgba(148, 140, 187, 1)", // Pastel Indigo
      "rgba(221, 186, 255, 1)", // Pastel Violet
      "rgba(245, 245, 245, 1)", // White Smoke
    ];

    // Generate buttons for each color
    pastelColors.forEach((color) => {
      const colorBtn = document.createElement("button");
      colorBtn.style.backgroundColor = color;
      colorBtn.style.border = "none";
      colorBtn.style.width = "40px";
      colorBtn.style.height = "40px";
      colorBtn.style.cursor = "pointer";
      colorBtn.title = color;

      // On click, set entry.color
      colorBtn.addEventListener("click", () => {
        entry.color = color;

        // Optionally hide or disable picker here
        colorGridContainer.style.display = "none";
        reCurrent();
      });

      colorGridContainer.appendChild(colorBtn);
    });

    // Add the color grid container to the page as needed
    card.appendChild(colorGridContainer); // Or inside a specific modal/dialog
  });

  buttonsContainer.appendChild(clrbtn);

  if (entry.type === "locations") {
    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(nextBtn);
  } else if (entry.type === "quests") {
    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(counterBtn);
    buttonsContainer.appendChild(nextBtn);
  } else{
    buttonsContainer.appendChild(lockbtn);
  }

  buttonsContainer.appendChild(deleteBtn);
  buttonsContainer.appendChild(editBtn);

  card.appendChild(buttonsContainer);

  card.appendChild(title);
  card.appendChild(body);

  return card;
}
