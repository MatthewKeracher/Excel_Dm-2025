import { current, excelDM, reCurrent, newCurrent, masterEdit } from "./main.js";
import { Entry, EntryManager } from "./classes.js";
import { saveData } from "./localStorage.js";
import { currentTab } from "./tabs.js";

export function initButtons() {
  const buttons = {
    "btn-new": newFile,
    "btn-save": saveFile,
    "btn-donate": donate,
    "btn-load": loadFile,
    "btn-add": addEntry,
    "btn-demo": loadHommlet,
  };

  Object.entries(buttons).forEach(([id, handler]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", handler);
    }
  });
}

export function newFile() {
  excelDM.deleteAll();
}

export function donate() {
  window.open("https://buymeacoffee.com/excel_dm", "_blank");
}

export async function loadExtData(name, replace = true) {
  try {
    console.log(`Loading from... ${name}`);
    const response = await fetch(name);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const allData = await response.json();

    if (replace === true) {
      excelDM.entries.length = 0;
    }

    allData.entries.forEach((data) => {
      const entry = new Entry(data);
      excelDM.add(entry);
    });

    excelDM.findParents();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

export async function loadHommlet() {
  await loadExtData("./Hommlet.json", true);

  if(masterEdit === false){
  await loadExtData("./BFRPG/items.json", false);
  await loadExtData("./BFRPG/monsters.json", false);
  await loadExtData("./BFRPG/spells.json", false);
  }

  newCurrent(excelDM.entries[0]);
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
    const jsonString = JSON.stringify(excelDM, replacer, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lastPlace = document.getElementById("currentTitle")?.innerHTML
    
    const fileName =
       `${lastPlace}.json`|| "excel_DM.json";

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
    const fileType = file.type; // e.g. "application/json" or "image/png"

    const ext = fileName.split(".").pop().toLowerCase();

    if (fileType === "application/json" || ext === "json") {
      // JSON file logic
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let allData = JSON.parse(e.target.result);

          // Clear existing entries in manager
          excelDM.entries.length = 0;

          // Create Entry instances and add them to manager
          allData.entries.forEach((data) => {
            const entry = new Entry(data);
            excelDM.add(entry);
          });

          excelDM.findParents(); //Imporant to add circulairty to data!

          newCurrent(excelDM.entries[0]);
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
  const dateTime = new Date().toLocaleString();
  const newName = `_${dateTime}`;

  let newEntry = new Entry({
    title: newName,
  });

  excelDM.add(newEntry);

  if (currentTab === "locations") {
    current.parentOf(excelDM.n(newName));
  }

  reCurrent(current);
}

//Managing External and Older Data

function conformTable(extEntry) {
  // Define keys to include as attributes, map keys to prettier column names if needed
  const keysAndLabels = {
    armourClass: "Armor Class",
    hit: "Hit Dice",
    attacks: "No. of Attacks",
    damage: "Damage",
    move: "Movement",
    appearing: "No. Appearing",
    savingThrows: "Save As",
    morale: "Morale",
    treasure: "Treasure Type",
    experience: "XP",
  };

  // Build table header
  let md = "| Attribute      | Value                          |\n";
  md += "|:---------------|:-----------------------------|\n";

  // Append rows only for keys present in the object
  for (const key in extEntry) {
    if (key !== "name" && key !== "description") {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

      if (extEntry[key]) {
        md += `| ${capitalizedKey} | ${extEntry[key]} |\n`;
      }
    }
  }

  if (extEntry.description) {
    md += `\n\n${extEntry.description.replace(/\n/g, "<br>")}\n`;
  }

  return md;
}

function conformExt(entry) {
  let bodyParts = [];
  for (const key in entry) {
    if (key !== "name" && key !== "description") {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      bodyParts.push(`**${capitalizedKey}**: ${entry[key]}`);
    }
  }

  bodyParts.push(`<br>${entry.description}`);
  return bodyParts.join("<br>");
}

function sortExtData(extData) {
  Object.values(extData).forEach((extObj) => {
    extObj.forEach((extEntry) => {
      excelDM.add(
        new Entry({
          title: extEntry.name,
          type: "items",
          body: `${conformTable(extEntry)}`, // Assuming conformTable formats your data to markdown
        })
      );
    });
  });
}
