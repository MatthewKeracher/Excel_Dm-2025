import { current, excelDM, reCurrent, newCurrent, masterEdit, resetCurrent } from "./main.js";
import { Entry, EntryManager } from "./classes.js";
import { saveData, saveDataNow, disconnectWS, setApiUrl } from "./localStorage.js";
import { authHeaders, clearToken, showAuthModal } from "./auth.js";
import { setGridType } from "./right.js";
import { currentTab } from "./tabs.js";
import { returnFiltered } from "./filter.js";
export function initButtons() {
  const buttons = {
    "btn-save":   saveFile,
    "btn-donate": donate,
    "btn-load":   loadFile,
    "btn-add":    addEntry,
    "btn-home":   goHome,
    "btn-logout": logout,
  };

  const accountBtn = document.getElementById("btn-account");
  if (accountBtn) accountBtn.addEventListener("click", () => {
    import("./campaigns.js").then(({ showCampaignPicker }) => showCampaignPicker());
  });

  Object.entries(buttons).forEach(([id, handler]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", handler);
    }
  });
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

// ── Map Settings Modal ────────────────────────────────────────────────────────

let mapModalBuilt = false;

export function loadFile() {
  showMapModal();
}

let mapPreviewUrl = null;

function showMapModal() {
  if (!mapModalBuilt) buildMapModal();
  const isHome = Array.isArray(current);
  const name = isHome ? "" : (current?.title ?? "");
  document.getElementById("map-modal-title").textContent = isHome ? "Poster" : (name ? `Map — ${name}` : "Map Settings");

  if (isHome) {
    import("./home.js").then(({ getHomePoster }) => setMapPreview(getHomePoster()));
  } else {
    setMapPreview(current?.image ?? null);
  }

  const gridSection = document.getElementById("map-grid-section");
  if (gridSection) gridSection.style.display = isHome ? "none" : "";

  if (!isHome) {
    const gridType = current?.gridType ?? "hex";
    document.querySelectorAll(".map-grid-btn").forEach(btn => {
      btn.classList.toggle("map-grid-btn-active", btn.dataset.grid === gridType);
    });
  }

  document.getElementById("map-modal").style.display = "flex";
}

function setMapPreview(hexString) {
  const img = document.getElementById("map-preview-img");
  const placeholder = document.getElementById("map-preview-placeholder");

  // Revoke previous blob URL to free memory
  if (mapPreviewUrl) {
    URL.revokeObjectURL(mapPreviewUrl);
    mapPreviewUrl = null;
  }

  if (hexString) {
    const bytes = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16);
    }
    mapPreviewUrl = URL.createObjectURL(new Blob([bytes], { type: "image/png" }));
    img.src = mapPreviewUrl;
    img.style.display = "block";
    placeholder.style.display = "none";
  } else {
    img.src = "";
    img.style.display = "none";
    placeholder.style.display = "flex";
  }
}

function buildMapModal() {
  const modal = document.createElement("div");
  modal.id = "map-modal";
  modal.innerHTML = `
    <div id="map-box">
      <button id="map-close-btn" title="Close">✕</button>
      <p id="map-modal-title" class="map-modal-heading">Map Settings</p>

      <div id="map-preview-area">
        <img id="map-preview-img" alt="Map preview" style="display:none" />
        <div id="map-preview-placeholder">No map uploaded</div>
      </div>

      <div id="map-grid-section" class="account-section">
        <div class="settings-label">Grid</div>
        <div id="map-grid-selector">
          <button class="map-grid-btn" data-grid="hex">Hex</button>
          <button class="map-grid-btn" data-grid="square">Square</button>
          <button class="map-grid-btn" data-grid="none">None</button>
        </div>
      </div>

      <div class="account-section">
        <button id="map-upload-btn">Upload Image</button>
        <button id="map-clear-btn">Clear Map</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  mapModalBuilt = true;

  // Hidden file input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const hex = Array.from(new Uint8Array(e.target.result))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      if (Array.isArray(current)) {
        import("./home.js").then(({ setHomePoster }) => setHomePoster(hex));
        setMapPreview(hex);
      } else {
        current.image = hex;
        setMapPreview(hex);
        newCurrent(current);
      }
    };
    reader.readAsArrayBuffer(file);
  });

  document.querySelectorAll(".map-grid-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.grid;
      current.gridType = type;
      setGridType(type);
      excelDM.dirtyEntries.add(current);
      saveData();
      document.querySelectorAll(".map-grid-btn").forEach(b => {
        b.classList.toggle("map-grid-btn-active", b === btn);
      });
    });
  });

  document.getElementById("map-close-btn").addEventListener("click", () => {
    document.getElementById("map-modal").style.display = "none";
  });

  document.getElementById("map-upload-btn").addEventListener("click", () => {
    fileInput.value = "";
    fileInput.click();
  });

  document.getElementById("map-clear-btn").addEventListener("click", () => {
    if (Array.isArray(current)) {
      import("./home.js").then(({ setHomePoster }) => setHomePoster(null));
      setMapPreview(null);
    } else {
      current.image = null;
      setMapPreview(null);
      newCurrent(current);
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

export async function goHome() {
  disconnectWS();
  setApiUrl(null);
  resetCurrent();
  const { showHome } = await import("./home.js");
  showHome();
}

export function logout() {
  disconnectWS();
  clearToken();
  showAuthModal();
}

export async function addEntry() {
  if (Array.isArray(current)) {
    const { addHomeNotice } = await import("./home.js");
    addHomeNotice();
    return;
  }
  const dateTime = new Date().toLocaleString();
  const newName = `_${dateTime}`;

  let nextOrder = 0;
  if (currentTab === "quests") {
    const rootQuests = excelDM.entries.filter(
      (e) => e.type === "quests" && e.parent === null
    );
    nextOrder = rootQuests.reduce((max, e) => Math.max(max, e.order), -1) + 1;
  }

  let newEntry = new Entry({
    category: Array.isArray(current) ? "Uncategorised" : current.category,
    title: newName,
    order: nextOrder,
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
