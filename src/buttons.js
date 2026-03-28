import { current, excelDM, reCurrent, newCurrent, masterEdit } from "./main.js";
import { Entry, EntryManager } from "./classes.js";
import { saveData, saveDataNow, disconnectWS } from "./localStorage.js";
import { authHeaders, clearToken, showAuthModal, showAccountModal } from "./auth.js";
import { currentTab } from "./tabs.js";
import { returnFiltered } from "./filter.js";
export function initButtons() {
  const buttons = {
    "btn-new":     newFile,
    "btn-save":    saveFile,
    "btn-donate":  donate,
    "btn-load":    loadFile,
    "btn-add":     addEntry,
    "btn-logout":  logout,
    "btn-account": showAccountModal,
  };

  Object.entries(buttons).forEach(([id, handler]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", handler);
    }
  });
}

export function newFile() {
  import("./campaigns.js").then(({ showCampaignPicker }) => showCampaignPicker());
}

export function donate() {
  window.open("https://buymeacoffee.com/excel_dm", "_blank");
}

export async function loadExtData(name, replace = true) {
  try {
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

    excelDM.prepareFromJSON();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}


export async function saveFile() {
  await saveDataNow();
}

export function loadFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target.result;
      const hex = Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      current.image = hex;
      newCurrent(current);
    };
    reader.readAsArrayBuffer(file);
  });

  input.click();
}

export function logout() {
  disconnectWS();
  clearToken();
  showAuthModal();
}

export function addEntry() {
  const dateTime = new Date().toLocaleString();
  const newName = `_${dateTime}`;

  let newEntry = new Entry({
    category: Array.isArray(current) ? "Uncategorised" : current.category,
    title: newName,
  });

  excelDM.add(newEntry);

  if (currentTab === "locations" && !Array.isArray(current)) {
    current.parentOf(excelDM.n(newName));
  }

  // Mark newEntry dirty so pushToServer sees _serverId==null → uses PUT (full broadcast)
  excelDM.dirtyEntries.add(newEntry);
  if (Array.isArray(current)) {
    newCurrent(newEntry); // Empty campaign: make the new entry current so draw() works
  } else {
    reCurrent();
  }
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
