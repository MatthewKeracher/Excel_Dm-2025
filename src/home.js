import { authHeaders } from "./auth.js";
import { loadEditor } from "./editor.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { setHttpState } from "./syncState.js";

let homeNotices = [];
let homePoster = null;

export function getHomePoster() {
  return homePoster;
}

export async function setHomePoster(hex) {
  homePoster = hex || null;
  const { HexToMap } = await import("./right.js");
  await HexToMap({ image: homePoster });
  await saveHome();
}

export async function initHome() {
  try {
    const res = await fetch("/api/home", { headers: authHeaders() });
    if (!res.ok) return;
    const data = await res.json();
    homeNotices = data.notices ?? [];
    homePoster = data.poster || null;
  } catch {}
}

export async function showHome() {
  await initHome(); // always fetch latest shared notices

  // Clear title bar and map labels
  const currentTitle = document.getElementById("currentTitle");
  if (currentTitle) currentTitle.innerHTML = "";
  const noteLayer = document.getElementById("note-layer");
  if (noteLayer) noteLayer.innerHTML = "";

  // Hide tabs while on home screen
  const tabsEl = document.querySelector(".tabs");
  if (tabsEl) tabsEl.style.display = "none";

  renderHomeNotices();
  const { HexToMap, setGridType } = await import("./right.js");
  setGridType("square");
  HexToMap({ image: homePoster });
}

function renderHomeNotices() {
  const container = document.getElementById("leftPanel");
  container.innerHTML = "";

  homeNotices.forEach((notice) => {
    container.appendChild(makeHomeNoticeCard(notice));
  });
}

export function addHomeNotice() {
  const dateTime = new Date().toLocaleString();
  const notice = {
    id: null,
    title: `_${dateTime}`,
    body: "",
    color: "",
    category: "Notice",
    sort_order: homeNotices.length,
  };
  homeNotices.push(notice);
  renderHomeNotices();
  saveHome();
}

function makeHomeNoticeCard(notice) {
  const card = document.createElement("div");
  card.className = "notecard";
  card.style.backgroundColor = notice.color || "";

  const titleEl = document.createElement("div");
  titleEl.className = "notecard-title";
  titleEl.textContent = notice.title;

  const bodyEl = document.createElement("div");
  bodyEl.className = "notecard-body";
  bodyEl.dataset.fullText = notice.body || "";
  bodyEl.innerHTML = marked.parse(notice.body || "");
  bodyEl.style.marginTop = "8px";
  bodyEl.style.backgroundColor = notice.color || "";
  bodyEl.style.maxHeight = "4.6em";

  card.addEventListener("click", () => {
    bodyEl.style.maxHeight = bodyEl.style.maxHeight === "100%" ? "4.6em" : "100%";
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-top-right";

  const categoryEl = document.createElement("div");
  categoryEl.className = "notecard-category";
  categoryEl.textContent = "Notice";

  // Color button
  const clrBtn = document.createElement("button");
  clrBtn.className = "clr-btn";
  clrBtn.title = "Change Colour";
  clrBtn.innerHTML = "🎨";
  clrBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const existing = card.querySelector(".color-grid-container");
    if (existing) { existing.remove(); return; }

    const colorGrid = document.createElement("div");
    colorGrid.style.display = "grid";
    colorGrid.style.gridTemplateColumns = "repeat(3, 40px)";
    colorGrid.style.gridGap = "8px";
    colorGrid.style.padding = "10px";
    colorGrid.classList.add("color-grid-container");
    colorGrid.addEventListener("mouseleave", () => colorGrid.remove());

    const pastelColors = [
      "rgba(255, 179, 186, 1)", "rgba(233, 157, 71, 1)", "rgba(255, 255, 186, 1)",
      "rgba(142, 194, 154, 1)", "rgba(186, 225, 255, 1)", "rgba(109, 196, 188, 1)",
      "rgba(148, 140, 187, 1)", "rgba(221, 186, 255, 1)", "rgba(245, 245, 245, 1)",
    ];

    pastelColors.forEach((color) => {
      const btn = document.createElement("button");
      btn.style.cssText = `background:${color};border:none;width:40px;height:40px;cursor:pointer`;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        notice.color = color;
        card.style.backgroundColor = color;
        bodyEl.style.backgroundColor = color;
        colorGrid.remove();
        saveHome();
      });
      colorGrid.appendChild(btn);
    });

    card.appendChild(colorGrid);
  });

  // Edit button
  const editState = { isEditing: false };
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.title = "Edit notice";
  editBtn.innerHTML = "🖉";
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (editState.isEditing) return;
    editState.isEditing = true;
    loadEditor(notice, bodyEl, titleEl, categoryEl, editBtn, true, marked, () => {
      editState.isEditing = false;
      saveHome();
      renderHomeNotices();
    });
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Delete notice";
  deleteBtn.innerHTML = "❌";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("Delete this notice?")) {
      homeNotices = homeNotices.filter((n) => n !== notice);
      renderHomeNotices();
      saveHome();
    }
  });

  buttonsContainer.appendChild(clrBtn);
  buttonsContainer.appendChild(deleteBtn);
  buttonsContainer.appendChild(editBtn);

  card.appendChild(categoryEl);
  card.appendChild(buttonsContainer);
  card.appendChild(titleEl);
  card.appendChild(bodyEl);

  return card;
}

export async function saveHome() {
  setHttpState("saving");
  try {
    const res = await fetch("/api/home", {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ notices: homeNotices, poster: homePoster ?? "" }),
    });
    setHttpState(res.ok ? "saved" : "error");
  } catch {
    setHttpState("error");
  }
}
