import { setApiUrl, loadData } from "./localStorage.js";
import { authHeaders, clearToken, showAuthModal } from "./auth.js";

let modalBuilt = false;

export async function showCampaignPicker() {
  if (!modalBuilt) buildModal();
  document.getElementById("campaign-modal").style.display = "flex";
  await refreshList();
}

export function hideCampaignPicker() {
  document.getElementById("campaign-modal").style.display = "none";
}

function buildModal() {
  const modal = document.createElement("div");
  modal.id = "campaign-modal";
  modal.innerHTML = `
    <div id="campaign-box">
      <button id="campaign-close-btn" title="Close">✕</button>
      <h2 id="campaign-modal-title">Worlds</h2>
      <div id="campaign-list"></div>
      <hr id="campaign-divider" />
      <div id="campaign-new-form">
        <input id="campaign-name-input" type="text" placeholder="New world name…" autocomplete="off" />
        <button id="campaign-create-btn">+ Create</button>
      </div>
      <p id="campaign-error"></p>
    </div>
  `;
  document.body.appendChild(modal);
  modalBuilt = true;

  document.getElementById("campaign-create-btn").addEventListener("click", createCampaign);
  document.getElementById("campaign-name-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") createCampaign();
  });
  document.getElementById("campaign-close-btn").addEventListener("click", hideCampaignPicker);
}

async function refreshList() {
  const listEl = document.getElementById("campaign-list");
  listEl.innerHTML = '<p class="campaign-loading">Loading…</p>';

  try {
    const res = await fetch("/api/campaigns", { headers: authHeaders() });
    if (res.status === 401) {
      clearToken();
      showAuthModal();
      return;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const campaigns = await res.json();

    listEl.innerHTML = "";
    if (campaigns.length === 0) {
      listEl.innerHTML = '<p class="campaign-empty">No worlds yet — create one below.</p>';
      return;
    }

    campaigns.forEach((c) => {
      const row = document.createElement("div");
      row.className = "campaign-row";
      row.innerHTML = `
        <span class="campaign-name">${escHtml(c.name)}</span>
        <span class="campaign-role campaign-role-${c.role}">${c.role}</span>
        <button class="campaign-open-btn">Open</button>
      `;
      row.querySelector(".campaign-open-btn").addEventListener("click", () => openCampaign(c.id, c.name));
      listEl.appendChild(row);
    });
  } catch (err) {
    listEl.innerHTML = `<p class="campaign-error-msg">Failed to load: ${escHtml(err.message)}</p>`;
  }
}

async function openCampaign(id, name) {
  setApiUrl(`/api/campaigns/${id}`);
  hideCampaignPicker();

  // Show campaign name in header
  const headerLeft = document.querySelector(".header-left");
  if (headerLeft) headerLeft.textContent = name;

  await loadData();
}

async function createCampaign() {
  const nameInput = document.getElementById("campaign-name-input");
  const errorEl = document.getElementById("campaign-error");
  const name = nameInput.value.trim();
  if (!name) return;

  errorEl.textContent = "";
  try {
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name }),
    });
    if (res.status === 401) {
      clearToken();
      showAuthModal();
      return;
    }
    if (!res.ok) throw new Error(await res.text());
    const { id } = await res.json();
    nameInput.value = "";
    await openCampaign(id, name);
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
