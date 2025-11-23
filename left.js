import { Entry, EntryManager } from "./class.js";
import { loc } from "./main.js";
import { initNotesCanvas, drawNotesCanvas } from "./right.js";

export function loadNoteCards(data) {
  const entries = data.children;

  console.log("loading Notecards from...", data.title);
  const container = document.getElementById("leftPanel");
  container.innerHTML = "";

  entries.forEach((entry, index) => {
    let div = makeNoteCard(entry, index);
    container.appendChild(div);
  });
}

function makeNoteCard(entry, index) {
  const card = document.createElement("div");
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
      card.style.backgroundColor = "#ffffffff";
    } else {
      body.style.maxHeight = "100%";
      card.style.backgroundColor = "#fffbe6";
    }
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
    if (event.shiftKey) {
      entry.parent.children.splice(index, 1);
    } else {
      if (confirm("Are you sure you want to delete this note?")) {
      entry.parent.children.splice(index, 1);
      }
    }

    loadNoteCards(entry);
    initNotesCanvas(entry)

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

      editBtn.title = "Save note";
      editBtn.innerHTML = "💾";
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
      loc.add(newEntry);
      loc.n(entry.title).goIn(loc.n(`Inside ${entry.title}`));

      console.log(loc);

      loadNoteCards(entry);
    initNotesCanvas(entry)
    } else {
      loadNoteCards(entry);
    initNotesCanvas(entry)
    }
  });

  //PREV BUTTON
  const prevbtn = document.createElement("button");
  prevbtn.className = "prev-btn";
  prevbtn.title = "Go Back";
  prevbtn.innerHTML = "<";

  prevbtn.addEventListener("click", () => {
    if (entry.parent.parent) {
      loadNoteCards(entry.parent.parent);
      initNotesCanvas(entry.parent.parent)
    } else {
      let newEntry = new Entry({ title: `Outside ${entry.parent.title}` });
      loc.add(newEntry);
      loc.n(`Outside ${entry.parent.title}`).goIn(entry.parent);
      loadNoteCards(entry.parent.parent);
      
    initNotesCanvas(entry.parent.parent)
    }

    //initNotesCanvas(parent.children);
  });

  buttonsContainer.appendChild(prevbtn);
  buttonsContainer.appendChild(deleteBtn);
  buttonsContainer.appendChild(editBtn);
  buttonsContainer.appendChild(nextBtn);

  card.appendChild(buttonsContainer);

  card.appendChild(title);
  card.appendChild(body);

  return card;
}
