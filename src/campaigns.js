import { setApiUrl, loadData } from "./localStorage.js";
import { authHeaders, clearToken, showAuthModal } from "./auth.js";
import { setCurrentRole } from "./userRole.js";
import { initTabs, DEFAULT_TABS } from "./tabs.js";
import { excelDM } from "./main.js";
import { fetchRulesets, setCurrentRuleset } from "./ruleset.js";

let modalBuilt = false;
let currentSettings = null; // { id, name } for the campaign being managed
let openCampaignId = null;  // ID of the currently open campaign

export async function showCampaignPicker() {
  if (!modalBuilt) buildModal();
  showListView();
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

      <div id="campaign-list-view">
        <img src="assets/logo.gif" alt="Excel_DM" style="display:block;width:100%;height:auto;margin-bottom:0.75rem;">
        <div id="campaign-list"></div>
        <hr id="campaign-divider" />
        <div id="campaign-new-form">
          <input id="campaign-name-input" type="text" placeholder="New world name…" autocomplete="off" />
          <button id="campaign-create-btn">+ Create</button>
        </div>
        <p id="campaign-error"></p>
      </div>

      <div id="campaign-settings-view">
        <div id="settings-header">
          <button id="settings-back-btn">← Back</button>
          <h2 id="settings-title"></h2>
        </div>

        <div class="settings-section">
          <div class="settings-label">Rename</div>
          <div class="settings-row">
            <input id="settings-name-input" type="text" autocomplete="off" />
            <button id="settings-rename-btn">Save</button>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-label">Members</div>
          <div id="settings-members-list"></div>
          <div class="settings-row">
            <input id="settings-email-input" type="text" placeholder="email address…" autocomplete="off" />
            <select id="settings-role-select">
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>
            <button id="settings-add-btn">Add</button>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-label">Invite Link</div>
          <div class="settings-row">
            <select id="invite-role-select">
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>
            <button id="invite-generate-btn">Copy Link</button>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-label">Ruleset</div>
          <div class="settings-row">
            <select id="settings-ruleset-select">
              <option value="">None</option>
            </select>
            <button id="settings-ruleset-btn">Save</button>
          </div>
        </div>

        <div class="settings-section settings-danger-zone">
          <div class="settings-label">Danger Zone</div>
          <button id="settings-delete-btn">Delete Campaign</button>
        </div>

        <p id="settings-error"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modalBuilt = true;

  document.getElementById("campaign-close-btn").addEventListener("click", hideCampaignPicker);
  document.getElementById("campaign-create-btn").addEventListener("click", createCampaign);
  document.getElementById("campaign-name-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") createCampaign();
  });

  document.getElementById("settings-back-btn").addEventListener("click", async () => {
    showListView();
    await refreshList();
  });
  document.getElementById("settings-rename-btn").addEventListener("click", renameCampaign);
  document.getElementById("settings-name-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") renameCampaign();
  });
  document.getElementById("settings-add-btn").addEventListener("click", addMember);
  document.getElementById("settings-email-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addMember();
  });
  document.getElementById("invite-generate-btn").addEventListener("click", generateInviteLink);
  document.getElementById("settings-ruleset-btn").addEventListener("click", saveRuleset);
  document.getElementById("settings-delete-btn").addEventListener("click", deleteCampaign);
}

function showListView() {
  document.getElementById("campaign-list-view").style.display = "";
  document.getElementById("campaign-settings-view").style.display = "none";
}

function showSettingsView() {
  document.getElementById("campaign-list-view").style.display = "none";
  document.getElementById("campaign-settings-view").style.display = "flex";
}

async function refreshList() {
  const listEl = document.getElementById("campaign-list");
  listEl.innerHTML = '<p class="campaign-loading">Loading…</p>';

  try {
    const res = await fetch("/api/campaigns", { headers: authHeaders() });
    if (res.status === 401) { clearToken(); showAuthModal(); return; }
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

      const nameSpan = document.createElement("span");
      nameSpan.className = "campaign-name";
      nameSpan.textContent = c.name;

      const roleSpan = document.createElement("span");
      roleSpan.className = `campaign-role campaign-role-${c.role}`;
      roleSpan.textContent = c.role;

      row.appendChild(nameSpan);
      row.appendChild(roleSpan);

      if (c.role === "admin") {
        const settingsBtn = document.createElement("button");
        settingsBtn.className = "campaign-settings-btn";
        settingsBtn.title = "Settings";
        settingsBtn.textContent = "⚙";
        settingsBtn.addEventListener("click", () => openSettings(c));
        row.appendChild(settingsBtn);
      }

      const openBtn = document.createElement("button");
      openBtn.className = "campaign-open-btn";
      openBtn.textContent = "Open";
      openBtn.addEventListener("click", () => openCampaign(c.id, c.name, c.role));
      row.appendChild(openBtn);

      listEl.appendChild(row);
    });
  } catch (err) {
    listEl.innerHTML = `<p class="campaign-error-msg">Failed to load: ${escHtml(err.message)}</p>`;
  }
}

async function openSettings(campaign) {
  currentSettings = { ...campaign };
  document.getElementById("settings-title").textContent = campaign.name;
  document.getElementById("settings-name-input").value = campaign.name;
  document.getElementById("settings-error").textContent = "";
  showSettingsView();
  await Promise.all([refreshMembers(), refreshRulesetDropdown()]);
}

async function refreshRulesetDropdown() {
  const select = document.getElementById("settings-ruleset-select");
  try {
    const rulesets = await fetchRulesets();
    // Rebuild options, preserving "None"
    select.innerHTML = '<option value="">None</option>';
    rulesets.forEach(rs => {
      const opt = document.createElement("option");
      opt.value = rs.id;
      opt.textContent = rs.name;
      select.appendChild(opt);
    });
    // Fetch current ruleset for this campaign from the API
    const res = await fetch(`/api/campaigns/${currentSettings.id}`, { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json();
      select.value = data.ruleset ?? "";
    }
  } catch {}
}

async function saveRuleset() {
  const ruleset = document.getElementById("settings-ruleset-select").value;
  const name = document.getElementById("settings-name-input").value.trim() || currentSettings.name;
  const errorEl = document.getElementById("settings-error");
  errorEl.textContent = "";
  errorEl.style.color = "";
  try {
    const res = await fetch(`/api/campaigns/${currentSettings.id}/settings`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ name, ruleset }),
    });
    if (!res.ok) throw new Error(await res.text());
    setCurrentRuleset(ruleset);
    errorEl.style.color = "#6ecf6e";
    errorEl.textContent = ruleset ? `✓ Ruleset set to ${ruleset}` : "✓ Ruleset removed";
    setTimeout(() => { errorEl.textContent = ""; errorEl.style.color = ""; }, 2000);
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function refreshMembers() {
  const listEl = document.getElementById("settings-members-list");
  listEl.innerHTML = '<p class="campaign-loading">Loading…</p>';

  try {
    const res = await fetch(`/api/campaigns/${currentSettings.id}/members`, { headers: authHeaders() });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();

    listEl.innerHTML = "";
    if (members.length === 0) {
      listEl.innerHTML = '<p class="campaign-empty">No members yet.</p>';
      return;
    }

    members.forEach((m) => {
      const row = document.createElement("div");
      row.className = "member-row";

      const emailSpan = document.createElement("span");
      emailSpan.className = "member-email";
      emailSpan.textContent = m.email;

      const roleSpan = document.createElement("span");
      roleSpan.className = `campaign-role campaign-role-${m.role}`;
      roleSpan.textContent = m.role;

      const removeBtn = document.createElement("button");
      removeBtn.className = "member-remove-btn";
      removeBtn.textContent = "✕";
      removeBtn.title = "Remove";
      removeBtn.addEventListener("click", () => removeMember(m.id));

      row.appendChild(emailSpan);
      row.appendChild(roleSpan);
      row.appendChild(removeBtn);
      listEl.appendChild(row);
    });
  } catch (err) {
    listEl.innerHTML = `<p class="campaign-error-msg">Failed to load: ${escHtml(err.message)}</p>`;
  }
}

async function renameCampaign() {
  const name = document.getElementById("settings-name-input").value.trim();
  const errorEl = document.getElementById("settings-error");
  if (!name) return;
  errorEl.textContent = "";
  errorEl.style.color = "";

  try {
    const res = await fetch(`/api/campaigns/${currentSettings.id}/settings`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error(await res.text());
    currentSettings.name = name;
    document.getElementById("settings-title").textContent = name;
    if (currentSettings.id === openCampaignId) {
      const headerLeft = document.querySelector(".header-left");
      if (headerLeft) headerLeft.textContent = name;
    }
    errorEl.style.color = "#6ecf6e";
    errorEl.textContent = "✓ Renamed";
    setTimeout(() => { errorEl.textContent = ""; errorEl.style.color = ""; }, 2000);
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function addMember() {
  const email = document.getElementById("settings-email-input").value.trim();
  const role = document.getElementById("settings-role-select").value;
  const errorEl = document.getElementById("settings-error");
  if (!email) return;
  errorEl.textContent = "";
  errorEl.style.color = "";

  try {
    const res = await fetch(`/api/campaigns/${currentSettings.id}/members`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ email, role }),
    });
    if (!res.ok) throw new Error(await res.text());
    document.getElementById("settings-email-input").value = "";
    await refreshMembers();
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function removeMember(userId) {
  const errorEl = document.getElementById("settings-error");
  errorEl.textContent = "";
  errorEl.style.color = "";

  try {
    const res = await fetch(`/api/campaigns/${currentSettings.id}/members/${userId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    await refreshMembers();
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function generateInviteLink() {
  const role = document.getElementById("invite-role-select").value;
  const errorEl = document.getElementById("settings-error");
  errorEl.textContent = "";
  errorEl.style.color = "";

  try {
    const res = await fetch(`/api/campaigns/${currentSettings.id}/invites`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ role }),
    });
    if (!res.ok) throw new Error(await res.text());
    const { url } = await res.json();
    await navigator.clipboard.writeText(url);
    errorEl.style.color = "#6ecf6e";
    errorEl.textContent = "✓ Invite link copied to clipboard!";
    setTimeout(() => { errorEl.textContent = ""; errorEl.style.color = ""; }, 3000);
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function deleteCampaign() {
  if (!confirm(`Delete "${currentSettings.name}" and all its entries? This cannot be undone.`)) return;
  const errorEl = document.getElementById("settings-error");
  errorEl.textContent = "";
  errorEl.style.color = "";

  try {
    const res = await fetch(`/api/campaigns/${currentSettings.id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    currentSettings = null;
    showListView();
    await refreshList();
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function openCampaign(id, name, role = "editor") {
  openCampaignId = id;
  setCurrentRole(role);
  setApiUrl(`/api/campaigns/${id}`);
  hideCampaignPicker();
  const headerLeft = document.querySelector(".header-left");
  if (headerLeft) headerLeft.textContent = name;
  await loadData();
  initTabs(excelDM.tabs ?? DEFAULT_TABS);
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
    if (res.status === 401) { clearToken(); showAuthModal(); return; }
    if (!res.ok) throw new Error(await res.text());
    const { id } = await res.json();
    nameInput.value = "";
    await openCampaign(id, name, "admin");
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

// --- Invite flow ---

export async function handleInviteFlow(token) {
  const res = await fetch(`/api/invites/${token}`);
  if (!res.ok) {
    showInviteModal("Invalid invite", "This invite link is invalid.", null);
    return;
  }
  const data = await res.json();
  if (data.used) {
    showInviteModal("Invite used", "This invite link has already been used.", null);
    return;
  }
  showInviteModal(
    `Join "${escHtml(data.campaignName)}"`,
    `You've been invited to join <strong>${escHtml(data.campaignName)}</strong> as <strong>${escHtml(data.role)}</strong>.`,
    async () => {
      const acceptRes = await fetch(`/api/invites/${token}/accept`, {
        method: "POST",
        headers: authHeaders(),
      });
      if (acceptRes.status === 410) {
        alert("This invite link has already been used.");
        return;
      }
      if (!acceptRes.ok) {
        alert("Failed to accept invite.");
        return;
      }
      const accepted = await acceptRes.json();
      window.history.replaceState({}, "", "/");
      hideInviteModal();
      await openCampaign(accepted.campaignId, accepted.campaignName, accepted.role);
    }
  );
}

function showInviteModal(title, bodyHtml, onAccept) {
  let modal = document.getElementById("invite-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "invite-modal";
    modal.innerHTML = `
      <div id="invite-box">
        <h2 id="invite-title"></h2>
        <p id="invite-body"></p>
        <div id="invite-btns">
          <button id="invite-accept-btn">Accept</button>
          <button id="invite-decline-btn">Not now</button>
        </div>
        <p id="invite-error"></p>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("invite-decline-btn").addEventListener("click", async () => {
      hideInviteModal();
      window.history.replaceState({}, "", "/");
      const { showCampaignPicker } = await import("./campaigns.js");
      await showCampaignPicker();
    });
  }

  document.getElementById("invite-title").textContent = title;
  document.getElementById("invite-body").innerHTML = bodyHtml;
  modal.style.display = "flex";

  const acceptBtn = document.getElementById("invite-accept-btn");
  const newAcceptBtn = acceptBtn.cloneNode(true);
  acceptBtn.replaceWith(newAcceptBtn);

  if (onAccept) {
    newAcceptBtn.style.display = "";
    newAcceptBtn.addEventListener("click", async () => {
      newAcceptBtn.disabled = true;
      try { await onAccept(); } catch { newAcceptBtn.disabled = false; }
    });
  } else {
    newAcceptBtn.style.display = "none";
  }
}

function hideInviteModal() {
  const modal = document.getElementById("invite-modal");
  if (modal) modal.style.display = "none";
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
