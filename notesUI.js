import {
  notes
} from './jsonManager.js';

export function renderNotecards(notesArray = notes) {
  const container = document.getElementById("notecards");
  container.innerHTML = "";

  notesArray.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "notecard";
    card.style.position = "relative";
    card.style.border = "1px solid #ddd";
    card.style.padding = "10px";
    card.style.marginBottom = "10px";

    const title = document.createElement("div");
    title.className = "notecard-title";
    title.textContent = note.title;

    const body = document.createElement("div");
    body.className = "notecard-body";
    body.dataset.fullText = note.body;
    body.textContent = note.body;
    body.style.marginTop = "8px";

    // Create toolbar container
    const toolbar = document.createElement("div");
    toolbar.className = "notecard-toolbar";
    toolbar.style.display = "flex";
    toolbar.style.justifyContent = "flex-end";
    toolbar.style.gap = "8px";
    toolbar.style.marginTop = "6px";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.title = "Edit note";
    editBtn.innerHTML = "✏";

    let isEditing = false;
    let textarea;

    editBtn.addEventListener("click", () => {
  if (!isEditing) {
    isEditing = true;

    // Replace body div with textarea
    textarea = document.createElement("textarea");
    textarea.className = "notecard-body editing";
    textarea.value = body.dataset.fullText;
    textarea.style.width = "100%";

    // Replace title div with single-line input
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
    notesArray[index].body = newText;
    body.textContent = newText;

    const newTitle = card.querySelector(".notecard-title.editing").value.trim();
    notesArray[index].title = newTitle;
    title.textContent = newTitle;

    card.replaceChild(body, textarea);
    card.replaceChild(title, card.querySelector(".notecard-title.editing"));

    editBtn.title = "Edit note";
    editBtn.innerHTML = "✏";
    initCanvasNotes('note-layer', notesArray);
  }
});


    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete note";
    deleteBtn.innerHTML = "X";

    deleteBtn.addEventListener("click", (event) => {
      if (event.shiftKey) {
        // Shift-click: delete without confirmation
        notesArray.splice(index, 1);
        renderNotecards(notesArray);
      } else {
        if (confirm("Are you sure you want to delete this note?")) {
          notesArray.splice(index, 1);
          renderNotecards(notesArray);
        }
      }
      initCanvasNotes('note-layer', notesArray);
    });

    // Append buttons to toolbar container
    toolbar.appendChild(deleteBtn);
    toolbar.appendChild(editBtn);
    

    // Assemble card content
    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(toolbar);

    container.appendChild(card);
  });
}

export function initCanvasNotes(noteCanvasId = "note-layer", notes) {
  const canvas = document.getElementById(noteCanvasId);
  const ctx = canvas.getContext('2d');

  // Scale canvas for high-DPI screens if needed
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);

  // Track dragging state
  let dragIndex = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  // Ensure each note has coordinates
  notes.forEach(note => {
    if (typeof note.x !== 'number') note.x = 50;
    if (typeof note.y !== 'number') note.y = 50;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 16px Soutane";
    notes.forEach((note, i) => {
      // Draw label background
      ctx.fillStyle = "#fffbe6"; // match note card background
      const textWidth = ctx.measureText(note.title).width;
      const padding = 6;
      const rectWidth = textWidth + padding * 2;
      const rectHeight = 20;

      ctx.fillRect(note.x, note.y - rectHeight + 5, rectWidth, rectHeight);

      // Draw label text
      ctx.fillStyle = "black";
      ctx.fillText(note.title, note.x + padding, note.y + 5);
    });
  }

  function hitTest(x, y) {
    for (let i = notes.length - 1; i >= 0; i--) {
      const note = notes[i];
      ctx.font = "bold 16px Soutane";
      const textWidth = ctx.measureText(note.title).width;
      const padding = 6;
      const rectWidth = textWidth + padding * 2;
      const rectHeight = 20;
      const rectX = note.x;
      const rectY = note.y - rectHeight + 5;
      if (
        x >= rectX &&
        x <= rectX + rectWidth &&
        y >= rectY &&
        y <= rectY + rectHeight
      ) {
        return i; // index of hit note
      }
    }
    return null;
  }

  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const hit = hitTest(mouseX, mouseY);
    if (hit !== null) {
      dragIndex = hit;
      dragOffsetX = mouseX - notes[dragIndex].x;
      dragOffsetY = mouseY - notes[dragIndex].y;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (dragIndex !== null) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      notes[dragIndex].x = mouseX - dragOffsetX;
      notes[dragIndex].y = mouseY - dragOffsetY;
      draw();
    }
  });

  canvas.addEventListener("mouseup", () => {
    dragIndex = null;
  });

  canvas.addEventListener("mouseleave", () => {
    dragIndex = null;
  });

  // Initial draw
  draw();

  

}

