//Global Variables
let allData = [];
let notesHistory = [];
let currentDataView = [];
let currentTab = "locations";

//Left Panel
function loadNoteCards(notesArray = currentDataView) {
  const container = document.getElementById("notecards");
  container.innerHTML = "";

  notesArray.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "notecard";
    card.style.position = "relative";
    card.style.border = "1px solid #ddd";
    card.style.padding = "10px";
    card.style.marginBottom = "10px";

    // Title container for title and delete button aligned horizontally
    const titleContainer = document.createElement("div");
    titleContainer.style.display = "flex";
    titleContainer.style.justifyContent = "space-between";
    titleContainer.style.alignItems = "center";
    titleContainer.style.position = "relative";

    const title = document.createElement("div");
    title.className = "notecard-title";
    title.textContent = note.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete note";
    deleteBtn.innerHTML = "❌";

    deleteBtn.addEventListener("click", (event) => {
      if (event.shiftKey) {
        notesArray.splice(index, 1);
      } else {
        if (confirm("Are you sure you want to delete this note?")) {
          notesArray.splice(index, 1);
        }
      }
      refresh();
    });

    titleContainer.appendChild(title);
    titleContainer.appendChild(deleteBtn);

    const body = document.createElement("div");
    body.className = "notecard-body";
    body.dataset.fullText = note.body;
    body.textContent = note.body;
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
        notesArray[index].body = newText;
        body.textContent = newText;

        const newTitle = card
          .querySelector(".notecard-title.editing")
          .value.trim();
        notesArray[index].title = newTitle;
        title.textContent = newTitle;

        card.replaceChild(body, textarea);
        card.replaceChild(title, card.querySelector(".notecard-title.editing"));

        editBtn.title = "Edit note";
        editBtn.innerHTML = "🖉";
        refresh();
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.className = "next-btn";
    nextBtn.title = "Go Inside";
    nextBtn.innerHTML = ">";

    nextBtn.addEventListener("click", () => {
      notesHistory.push(currentDataView);

      if (!notesArray[index].nested || notesArray[index].nested.length === 0) {
        notesArray[index].nested = [
          {
            x: 100,
            y: 100,
            title: "New Note",
            body: "",
            nested: [],
          },
        ];
      }

      const nestedNotes = notesArray[index].nested || [];
      currentDataView = nestedNotes; // Now current points to nested
      refresh();
      initNotesCanvas(currentDataView);
    });

    const prevbtn = document.createElement("button");
    prevbtn.className = "prev-btn";
    prevbtn.title = "Go Back";
    prevbtn.innerHTML = "<";

    prevbtn.addEventListener("click", () => {
      if (notesHistory.length > 0) {
        currentDataView = notesHistory.pop(); // Restore previous notesArray
        refresh();
      }
    });

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-top-right";

    buttonsContainer.appendChild(prevbtn);
    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(nextBtn);

    card.appendChild(buttonsContainer);
    card.appendChild(title);
    card.appendChild(body);

    container.appendChild(card);
  });
}

//Right Panel
function HexToMap() {
  return new Promise((resolve, reject) => {
    const hexString = currentDataView[0]?.image;
    const canvas = document.getElementById("map-layer");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!hexString) {
      resolve(); // No image, resolve immediately
      return;
    }

    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.slice(i, i + 2), 16));
    }
    const uint8arr = new Uint8Array(bytes);

    const blob = new Blob([uint8arr], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth * dpr;
      canvas.height = img.naturalHeight * dpr;
      canvas.style.width = img.naturalWidth + "px";
      canvas.style.height = img.naturalHeight + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);
      resolve(); // Resolve the promise when done
    };

    img.onerror = (error) => {
      reject(error); // Reject if loading fails
    };

    img.src = url;
  });
}

function initNotesCanvas(notesArray = currentDataView) {
  const canvas = document.getElementById("note-layer");
  const ctx = canvas.getContext("2d");

  // Track dragging state
  let dragIndex = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  let lastHoverIndex = -1;
  let hoverIndex = -1; // current hover index

  function hitTest(x, y) {
    for (let i = notesArray.length - 1; i >= 0; i--) {
      const note = notesArray[i];
      ctx.font = "bold 1.1em Soutane";
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

  function getHoverIndex(mouseX, mouseY, notes, ctx) {
    for (let i = notes.length - 1; i >= 0; i--) {
      const note = notes[i];
      ctx.font = "bold 1.1em Soutane";
      const padding = 6;
      const rectHeight = 20;
      const textWidth = ctx.measureText(note.title).width;
      const rectWidth = textWidth + padding * 2;
      const rectX = note.x;
      const rectY = note.y - rectHeight / 2;

      if (
        mouseX >= rectX &&
        mouseX <= rectX + rectWidth &&
        mouseY >= rectY &&
        mouseY <= rectY + rectHeight
      ) {
        return i; // Found hovered note
      }
    }
    return -1; // No hover
  }

  function updateHighlight() {
    const container = document.getElementById("notecards");
    const cards = container.getElementsByClassName("notecard");

    for (let i = 0; i < cards.length; i++) {
      if (i === hoverIndex) {
        cards[i].classList.add("highlight");
        cards[i].scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        cards[i].classList.remove("highlight");
      }
    }
  }

  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const hit = hitTest(mouseX, mouseY);
    if (hit !== null) {
      dragIndex = hit;
      dragOffsetX = mouseX - notesArray[dragIndex].x;
      dragOffsetY = mouseY - notesArray[dragIndex].y;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (dragIndex !== null) {
      currentDataView[dragIndex].x = mouseX - dragOffsetX;
      currentDataView[dragIndex].y = mouseY - dragOffsetY;
      drawNotesCanvas(currentDataView);
      return;
    }

    hoverIndex = getHoverIndex(mouseX, mouseY, currentDataView, ctx);

    if (hoverIndex !== lastHoverIndex) {
      lastHoverIndex = hoverIndex;
      updateHighlight();
      drawNotesCanvas(currentDataView);
    }
  });

  canvas.addEventListener("mouseup", () => {
    dragIndex = null;
  });

  canvas.addEventListener("mouseleave", () => {
    dragIndex = null;
  });
}

function drawNotesCanvas(notesArray = currentDataView) {
  const canvas = document.getElementById("note-layer");
  const ctx = canvas.getContext("2d");

  // Scale canvas to same size as map.
  const mapCanvas = document.getElementById("map-layer");

  canvas.width = mapCanvas.clientWidth;
  canvas.height = mapCanvas.clientHeight;

  // Ensure each note has coordinates
  notesArray.forEach((note) => {
    if (typeof note.x !== "number") note.x = 50;
    if (typeof note.y !== "number") note.y = 50;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 1.1em Soutane";
    ctx.globalAlpha = 0.7;
    notesArray.forEach((note, i) => {
      // Draw label background
      ctx.fillStyle = "#fffbe6"; // match note card background
      const padding = 6;
      const rectHeight = 20;
      const textWidth = ctx.measureText(note.title).width;
      const rectWidth = textWidth + padding * 2;

      // Draw rectangle
      // Adjust rectY so rect aligns with note.y at vertical center
      const rectX = note.x;
      const rectY = note.y - rectHeight / 2;

      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

      // Draw label text
      ctx.fillStyle = "black";
      ctx.textBaseline = "middle"; // vertically center text
      ctx.fillText(note.title, rectX + padding, note.y);
    });
  }

  // Initial draw
  draw();
}

async function refresh() {
  loadNoteCards(currentDataView);
  try {
    await HexToMap();
  } catch (err) {
    console.error("Error loading map image", err);
  }
  drawNotesCanvas(currentDataView);
  saveData();
}

//Autosave
function saveData() {
  try {
    const jsonString = JSON.stringify(allData);
    const fileName = document.getElementById("file-name")?.value || "Excel_DM";
    localStorage.setItem("savedData", jsonString);
    localStorage.setItem("fileName", fileName);
  } catch (err) {
    console.error("Error saving data to localStorage", err);
  }
}

function loadData() {
  try {
    const jsonString = localStorage.getItem("savedData");
    const fileName = localStorage.getItem("fileName");

    if (fileName) {
      document.getElementById("file-name").value = fileName;
    }

    if (jsonString) {
      allData = JSON.parse(jsonString);
      currentDataView = allData; // set current view to top-level data
      refresh(); // refresh UI and canvas to show loaded data
    }
  } catch (err) {
    console.error("Error loading data from localStorage", err);
  }
}

//On Startup
window.addEventListener("DOMContentLoaded", () => {
  loadData();

  //Add UI Button Functionality

  const newButton = document.getElementById("btn-new");
  const saveButton = document.getElementById("btn-save");
  const loadButton = document.getElementById("btn-load");
  const addButton = document.getElementById("btn-add");

  newButton.addEventListener("click", () => {
    allData = [];
    notesHistory = [];
    currentDataView = [];
    refresh();
  });

  saveButton.addEventListener("click", () => {
    try {
      const jsonString = JSON.stringify(allData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const fileName =
        document.getElementById("file-name")?.value || "data.json";

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error saving JSON:", err);
    }
  });

  loadButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json,image/*"; // Allow both JSON and images

    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;

      const fileName = file.name;
      const fileNameWithoutExt =
        fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
      const fileType = file.type; // e.g. "application/json" or "image/png"
      const fileNameInput = document.getElementById("file-name");

      if (fileNameInput) {
        fileNameInput.value = fileNameWithoutExt;
      }
      const ext = fileName.split(".").pop().toLowerCase();

      if (fileType === "application/json" || ext === "json") {
        // JSON file logic
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            allData = JSON.parse(e.target.result);
            currentDataView = allData;
            refresh();
          } catch (err) {
            console.error("Invalid JSON:", err);
          }
        };
        reader.onerror = () => {
          console.error("Error reading file:", reader.error);
        };
        reader.readAsText(file);
      } else if (
        fileType.startsWith("image/") ||
        ["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)
      ) {
        // Read image as binary
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = e.target.result; // ArrayBuffer
          const hex = Array.from(new Uint8Array(buffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          currentDataView[0].image = hex;
          refresh();
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert("Unsupported file type.");
      }
    });

    input.click();
  });

  addButton.addEventListener("click", () => {
    console.log(currentTab)
    let newNote;
    
    if (currentTab === "locations") {
      newNote = {
        x: 100,
        y: 100,
        title: "New Note",
        body: "",
        nested: [
          {
            x: 100,
            y: 100,
            title: "New Note",
            body: "",
            nested: [],
          },
        ],
      };
      
    } else if (currentTab === "people") {
       newNote = {
        type: "person",
        title: "Unnamed Person",
        body: "",
        nested: [],
      };

     
    }

     currentDataView.push(newNote);
     refresh();

  });

  //TABS
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;

      // Set active button
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Show corresponding panel
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.style.display = panel.dataset.tab === tab ? "block" : "none";
      });

      // Optionally load or filter content corresponding to the tab
      if (tab === "locations") {
        currentTab = "locations";
        currentDataView = allData.filter((note) => note.type !== "person");
      } else if (tab === "people") {
        currentDataView = allData.filter((note) => note.type === "person");
        currentTab = "people";
      } else if (tab === "logs") {
        currentTab = "logs";
      }

      loadNoteCards(currentDataView);

    });
  });

  const canvas = document.getElementById("note-layer");

  //Shift Click on Map for new Note
  canvas.addEventListener("click", (e) => {
    if (!e.shiftKey) return; // Only proceed if Shift key is held

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Create a new note at clicked position
    const newNote = {
      x: mouseX,
      y: mouseY,
      title: "New Note",
      body: "",
      nested: [],
    };

    currentDataView.push(newNote); // Add to current notes array
    refresh(); // Redraw UI and canvas
  });

  initNotesCanvas();

  //Refresh Canvas on Window Resize
  window.addEventListener("resize", () => {
    refresh();
  });
});
