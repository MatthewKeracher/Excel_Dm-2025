import { current, loc, reCurrent, newCurrent } from "./main.js";
import { Entry, EntryManager } from "./class.js";

export function newFile() {
  loc.deleteAll();
}

export function saveFile() {
  try {
    function replacer(key, value) {
      if (key === "parent") {
        // Return undefined to omit the parent property during serialization
        return undefined;
        // Or return a non-circular substitute, like parent's title
        // return value?.title || null;
      }
      return value;
    }

    // When saving JSON:
    const jsonString = JSON.stringify(loc, replacer, 2);

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
  } catch (err) {
    console.error("Error saving JSON:", err);
  }
}

export function loadFile() {
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
          let allData = JSON.parse(e.target.result);

          // Clear existing entries in manager
          loc.entries.length = 0;

          // Create Entry instances and add them to manager
          allData.entries.forEach((data) => {
            const entry = new Entry(data);
            loc.add(entry);
          });

          loc.findParents(); //Imporant to add circulairty to data!

          newCurrent(loc.entries[0]);
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

        current.image = hex;
        newCurrent(current);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Unsupported file type.");
    }
  });

  input.click();
}

export function addEntry() {

  const newName = `${current.title} ${loc.entries.length + 1}`

  let newEntry = new Entry({
    title: newName,
  });

  loc.add(newEntry);
  current.parentOf(loc.n(newName));

  reCurrent(current);
}
