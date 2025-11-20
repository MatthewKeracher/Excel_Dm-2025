// jsonManager.js
export let notes = [
    {
    "title": "Lorem Ipsum",
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "x": 281,
    "y": 107
  }
];

export function setStatus(text) {
  const el = document.getElementById("status-text");
  if (el) el.textContent = text;
}

export function handleNew(renderNotecards, initCanvasNotes) {
  notes = [];
  renderNotecards(notes);
  initCanvasNotes('note-layer', notes);
}

export function handleSave() {
  try {
    const jsonString = JSON.stringify(notes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const fileName = document.getElementById("file-name")?.value || "data.json";

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setStatus("JSON downloaded.");
  } catch (err) {
    console.error("Error saving JSON:", err);
    setStatus("Error saving JSON (see console).");
  }
}

export function handleLoad(renderNotecards, initCanvasNotes) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;

    const fileName = file.name;
    const fileBaseName = fileName.replace(/\.[^/.]+$/, "");

    const fileNameEl = document.getElementById("file-name");
    if (fileNameEl) fileNameEl.textContent = fileBaseName;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonText = e.target.result;
        notes = JSON.parse(jsonText);
        setStatus(`Loaded JSON from "${fileName}".`);
        renderNotecards(notes);
        initCanvasNotes('note-layer', notes);
        console.log("notes after load:", notes);
      } catch (err) {
        console.error("Invalid JSON:", err);
        setStatus("Error: invalid JSON file.");
      }
    };

    reader.onerror = () => {
      console.error("Error reading file:", reader.error);
      setStatus("Error reading file.");
    };

    reader.readAsText(file);
  });

  input.click();
}

