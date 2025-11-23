import { Entry } from "./locations.js";
import { excelDM, reCurrent, newCurrent, currentTab } from "./main.js";

export function loadNoteCards(data) {
  let entries;

  switch (currentTab) {
    case "locations":
      entries = data.children.filter((entry) => entry.type === "locations");
      break;
    case "people":
      entries = excelDM.entries.filter((entry) => entry.type === "people");
      break;
    case "quests":
      entries = excelDM.entries.filter((entry) => entry.type === "quests");
      break;
    default:
      entries = [];
      break;
  }

  const container = document.getElementById("leftPanel");
  container.innerHTML = "";

  entries.forEach((entry, index) => {
    let div = makeNoteCard(entry, index);
    container.appendChild(div);
  });
}

function makeNoteCard(entry, index) {
  const card = document.createElement("div");
  card.dataset.entryTitle = entry.title;
  card.className = "notecard";

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
  body.textContent = entry.body;
  body.style.marginTop = "8px";

  card.addEventListener("click", () => {
    if (body.style.maxHeight === "100%") {
      body.style.maxHeight = "3.6em";
    } else {
      body.style.maxHeight = "100%";
    }
  });

  card.addEventListener("mouseenter", () => {
    const label = document.querySelector(
      `.label[data-entry-title="${CSS.escape(entry.title)}"]`
    );

    card.classList.add("highlight");

    if (label) label.classList.add("highlight");
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
    case "people":
      targetArray = excelDM.entries;
      break;
    case "quests":
      targetArray = excelDM.entries;
      break;
    default:
      targetArray = [];
      break;
  }

  // Find the index of the entry to delete
  const deleteIndex = targetArray.indexOf(entry);

  if (deleteIndex >= 0) {
    if (event.shiftKey || confirm("Are you sure you want to delete this note?")) {
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

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.className = "notecard-title editing";
      titleInput.value = title.textContent;

      card.replaceChild(textarea, body);
      card.replaceChild(titleInput, title);
      card.classList.remove("highlight");

      editBtn.title = "Save note";
      editBtn.innerHTML = "💾";
      titleInput.focus();
    } else {
      isEditing = false;
      const newText = textarea.value.trim();
      body.dataset.fullText = newText;
      entry.body = newText;
      body.textContent = newText;

      const newTitle = card
        .querySelector(".notecard-title.editing")
        .value.trim();
      entry.title = newTitle;
      title.textContent = newTitle;

      card.replaceChild(body, textarea);
      card.replaceChild(title, card.querySelector(".notecard-title.editing"));

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
      let newEntry = new Entry({ title: `Outside ${entry.parent.title}` });
      excelDM.add(newEntry);
      excelDM.n(`Outside ${entry.parent.title}`).parentOf(entry.parent);
    }

    newCurrent(entry.parent.parent);
  });

  if (entry.type === "locations") {
    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(nextBtn);
  }

  buttonsContainer.appendChild(deleteBtn);
  buttonsContainer.appendChild(editBtn);

  card.appendChild(buttonsContainer);

  card.appendChild(title);
  card.appendChild(body);

  return card;
}
