import { Entry } from "./classes.js";
import { excelDM, reCurrent, newCurrent, current } from "./main.js";
import { currentTab } from "./tabs.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

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
    let targetArray;

    // Switch to select correct array for deletion
    switch (currentTab) {
      case "locations":
        targetArray = entry.parent.children;
        break;
      default:
        targetArray = excelDM.entries;
        break;
    }

    // Find the index of the entry to delete
    const deleteIndex = targetArray.indexOf(entry);

    if (deleteIndex >= 0) {
      if (
        event.shiftKey ||
        confirm("Are you sure you want to delete this note?")
      ) {
        targetArray.splice(deleteIndex, 1);
      }
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

  editBtn.addEventListener("click", () => {
    if (!isEditing) {
      isEditing = true;
      textarea = document.createElement("textarea");
      textarea.className = "notecard-body editing";
      textarea.value = body.dataset.fullText;
      textarea.style.width = "100%";
      textarea.style.backgroundColor = entry?.color || "";

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.className = "notecard-title editing";
      titleInput.value = title.textContent;
      titleInput.style.backgroundColor = entry?.color || "";

      card.replaceChild(textarea, body);
      card.replaceChild(titleInput, title);
      card.classList.add("no-highlight");

      editBtn.title = "Save note";
      editBtn.innerHTML = "💾";
      titleInput.focus();
    } else {
      isEditing = false;
      const newText = textarea.value.trim();
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
  nextBtn.title = "Go Inside";
  nextBtn.innerHTML = ">";

  nextBtn.addEventListener("click", () => {
    if (entry.children.length === 0) {
      let newEntry = new Entry({ title: `Inside ${entry.title}` });
      excelDM.add(newEntry);
      excelDM.n(entry.title).parentOf(excelDM.n(`Inside ${entry.title}`));
    }

    newCurrent(entry);
  });

  //PREV BUTTON
  const prevbtn = document.createElement("button");
  prevbtn.className = "prev-btn";
  prevbtn.title = "Go Back";
  prevbtn.innerHTML = "<";

  prevbtn.addEventListener("click", () => {
    if (!entry.parent.parent) {
      // Show confirm dialog with Yes/No buttons
      const userConfirmed = confirm("Do you want to make a new, outer layer?");

      // If user clicks Yes (OK)
      if (userConfirmed) {
        let newEntry = new Entry({ title: `Outside ${entry.parent.title}` });
        excelDM.add(newEntry);
        excelDM.n(`Outside ${entry.parent.title}`).parentOf(entry.parent);
      }
    }

    newCurrent(entry.parent.parent);
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
      "rgba(255, 223, 186, 1)", // Pastel Orange
      "rgba(255, 255, 186, 1)", // Pastel Yellow
      "rgba(142, 194, 154, 1)", // Pastel Green
      "rgba(186, 225, 255, 1)", // Pastel Blue
      "rgba(174, 234, 229, 1)", // Pastel Teal
      "rgba(198, 186, 255, 1)", // Pastel Indigo
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
  } else {
    buttonsContainer.appendChild(lockbtn);
  }

  buttonsContainer.appendChild(deleteBtn);
  buttonsContainer.appendChild(editBtn);

  card.appendChild(buttonsContainer);

  card.appendChild(title);
  card.appendChild(body);

  return card;
}
