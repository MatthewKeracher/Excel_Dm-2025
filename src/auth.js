const TOKEN_KEY    = "jwt";
const EMAIL_KEY    = "exceldm_email";
const USERNAME_KEY = "exceldm_username";
const AVATAR_KEY   = "exceldm_avatar";

export const getToken   = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(AVATAR_KEY);
};

export const getEmail    = () => localStorage.getItem(EMAIL_KEY)    ?? "";
export const getUsername = () => localStorage.getItem(USERNAME_KEY) ?? "";
export const getAvatar   = () => localStorage.getItem(AVATAR_KEY)   ?? "";
const setEmail    = (e) => localStorage.setItem(EMAIL_KEY, e);
const setUsername = (u) => localStorage.setItem(USERNAME_KEY, u);
const setCachedAvatar = (a) => a ? localStorage.setItem(AVATAR_KEY, a) : localStorage.removeItem(AVATAR_KEY);

export function authHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`,
  };
}

export function showAuthModal() {
  document.getElementById("auth-modal").style.display = "flex";
}

function hideAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
}

async function submit(endpoint, email, password) {
  const res = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  if (data.email) setEmail(data.email);
}

// Fetches the email from the server if not already cached (for existing sessions).
export async function ensureEmail() {
  if (getEmail() && getAvatar()) {
    updateAccountDisplay(getEmail());
    return getEmail();
  }
  try {
    const res = await fetch("/api/account", { headers: authHeaders() });
    if (!res.ok) return "";
    const data = await res.json();
    setEmail(data.email);
    if (data.username) setUsername(data.username);
    if (data.avatar)   setCachedAvatar(data.avatar);
    updateAccountDisplay(data.email);
    return data.email;
  } catch {
    return "";
  }
}

// Renders the account button as a fixed circle — avatar image or username initial.
// When no token is present, renders a "Log in" label instead.
export function updateAccountDisplay(email) {
  const btn = document.getElementById("btn-account");
  if (!btn) return;
  if (!getToken()) {
    btn.title = "Log in";
    btn.innerHTML = `<span class="account-login">Log in</span>`;
    return;
  }
  const avatar   = getAvatar();
  const username = getUsername() || email || "";
  btn.title      = username || email || "Account";
  if (avatar) {
    btn.innerHTML = `<img src="${avatar}" alt="${username}" />`;
  } else {
    const initial = (username[0] || "?").toUpperCase();
    btn.innerHTML = `<span class="account-initial">${initial}</span>`;
  }
}

// initAuth wires up the modal buttons. onSuccess is called after a successful
// login or register — pass it the function that loads the app (loadData).
export function initAuth(onSuccess) {
  const emailInput    = document.getElementById("auth-email");
  const passwordInput = document.getElementById("auth-password");
  const errorMsg      = document.getElementById("auth-error");

  async function attempt(endpoint) {
    errorMsg.textContent = "";
    try {
      await submit(endpoint, emailInput.value.trim(), passwordInput.value);
      updateAccountDisplay(getEmail());
      hideAuthModal();
      onSuccess();
    } catch (err) {
      errorMsg.textContent = err.message.trim();
    }
  }

  document.getElementById("auth-login-btn").addEventListener("click",    () => attempt("login"));
  document.getElementById("auth-register-btn").addEventListener("click", () => attempt("register"));
}

// --- Account modal ---

let accountModalBuilt = false;

export function showAccountModal() {
  if (!accountModalBuilt) buildAccountModal();
  document.getElementById("account-modal").style.display = "flex";
  document.getElementById("account-email-display").textContent = getEmail();
  document.getElementById("account-username-display").textContent = getUsername() || getEmail();
  // Collapse expandable sections
  ["account-username-form", "account-password-form"].forEach(id => {
    document.getElementById(id).style.display = "none";
  });
  // Reset fields
  ["account-cur-pwd", "account-new-pwd", "account-confirm-pwd"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("account-msg").textContent = "";
  document.getElementById("account-msg").className = "account-msg";
  document.getElementById("account-username-input").value = getUsername();
  document.getElementById("account-username-msg").textContent = "";
  document.getElementById("account-username-msg").className = "account-msg";
  // Load current avatar
  loadAvatarPreview();
}

function buildAccountModal() {
  const modal = document.createElement("div");
  modal.id = "account-modal";
  modal.innerHTML = `
    <div id="account-box">
      <button id="account-close-btn" title="Close">✕</button>

      <div id="account-identity">
        <div id="account-avatar-area">
          <img id="account-avatar-img" alt="Avatar" />
          <div id="account-avatar-placeholder">?</div>
        </div>
        <div id="account-identity-text">
          <p id="account-username-display" class="account-username-display"></p>
          <p id="account-email-display" class="account-email"></p>
        </div>
      </div>

      <div class="account-section">
        <div class="account-thumbnail-row">
          <button id="account-avatar-btn">Upload Thumbnail</button>
          <button id="account-avatar-clear-btn">Remove</button>
        </div>
        <p id="account-avatar-msg" class="account-msg"></p>
      </div>

      <div class="account-section">
        <button id="account-toggle-username-btn" class="account-action-btn">Change Username</button>
        <div id="account-username-form" style="display:none">
          <input id="account-username-input" type="text" placeholder="New username" autocomplete="username" />
          <button id="account-username-btn">Save</button>
          <p id="account-username-msg" class="account-msg"></p>
        </div>
      </div>

      <div class="account-section">
        <button id="account-toggle-pwd-btn" class="account-action-btn">Change Password</button>
        <div id="account-password-form" style="display:none">
          <input id="account-cur-pwd"     type="password" placeholder="Current password" autocomplete="current-password" />
          <input id="account-new-pwd"     type="password" placeholder="New password"     autocomplete="new-password" />
          <input id="account-confirm-pwd" type="password" placeholder="Confirm new password" autocomplete="new-password" />
          <button id="account-save-btn">Save</button>
          <p id="account-msg" class="account-msg"></p>
        </div>
      </div>

      <div class="account-section">
        <button id="account-logout-btn">Log out</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  accountModalBuilt = true;

  // Hidden file input for avatar
  const avatarInput = document.createElement("input");
  avatarInput.type = "file";
  avatarInput.accept = "image/*";
  avatarInput.style.display = "none";
  document.body.appendChild(avatarInput);

  avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      await saveAvatar(dataUrl);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("account-avatar-btn").addEventListener("click", () => {
    avatarInput.value = "";
    avatarInput.click();
  });

  // Clicking the avatar circle also triggers upload
  document.getElementById("account-avatar-area").addEventListener("click", () => {
    avatarInput.value = "";
    avatarInput.click();
  });

  document.getElementById("account-avatar-clear-btn").addEventListener("click", () => saveAvatar(""));

  function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = form.style.display === "none" ? "" : "none";
  }

  document.getElementById("account-toggle-username-btn").addEventListener("click", () => toggleForm("account-username-form"));
  document.getElementById("account-toggle-pwd-btn").addEventListener("click",      () => toggleForm("account-password-form"));
  document.getElementById("account-username-btn").addEventListener("click", changeUsername);

  document.getElementById("account-close-btn").addEventListener("click", () => {
    document.getElementById("account-modal").style.display = "none";
  });

  document.getElementById("account-save-btn").addEventListener("click", changePassword);

  document.getElementById("account-logout-btn").addEventListener("click", () => {
    document.getElementById("account-modal").style.display = "none";
    document.getElementById("btn-logout").click();
  });
}

export async function loadAvatarPreview() {
  try {
    const res = await fetch("/api/account", { headers: authHeaders() });
    if (!res.ok) return;
    const { avatar } = await res.json();
    setAvatarPreview(avatar || "");
  } catch { /* silent */ }
}

export function setAvatarPreview(dataUrl) {
  const img = document.getElementById("account-avatar-img");
  const placeholder = document.getElementById("account-avatar-placeholder");
  if (dataUrl) {
    img.src = dataUrl;
    img.style.display = "block";
    placeholder.style.display = "none";
  } else {
    img.src = "";
    img.style.display = "none";
    placeholder.style.display = "flex";
  }
}

export async function saveAvatar(dataUrl) {
  const msgEl = document.getElementById("account-avatar-msg");
  msgEl.textContent = "";
  try {
    const res = await fetch("/api/account/avatar", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ avatar: dataUrl }),
    });
    if (!res.ok) throw new Error(await res.text());
    setCachedAvatar(dataUrl);
    updateAccountDisplay(getEmail());
    setAvatarPreview(dataUrl);
    msgEl.className = "account-msg account-msg-ok";
    msgEl.textContent = dataUrl ? "✓ Thumbnail updated." : "✓ Thumbnail removed.";
  } catch (err) {
    msgEl.className = "account-msg";
    msgEl.textContent = err.message;
  }
}

export async function changeUsername() {
  const input = document.getElementById("account-username-input");
  const msgEl = document.getElementById("account-username-msg");
  const newUsername = input.value.trim();
  msgEl.className = "account-msg";
  msgEl.textContent = "";

  if (!newUsername) {
    msgEl.textContent = "Username cannot be empty.";
    return;
  }

  const btn = document.getElementById("account-username-btn");
  btn.disabled = true;
  try {
    const res = await fetch("/api/account/username", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ username: newUsername }),
    });
    if (!res.ok) throw new Error(await res.text());
    setUsername(newUsername);
    updateAccountDisplay(getEmail());
    document.getElementById("account-username-display").textContent = newUsername;
    document.getElementById("account-username-form").style.display = "none";
    msgEl.className = "account-msg account-msg-ok";
    msgEl.textContent = "✓ Username updated.";
  } catch (err) {
    msgEl.textContent = err.message;
  } finally {
    btn.disabled = false;
  }
}

export async function changePassword() {
  const cur     = document.getElementById("account-cur-pwd").value;
  const next    = document.getElementById("account-new-pwd").value;
  const confirm = document.getElementById("account-confirm-pwd").value;
  const msgEl   = document.getElementById("account-msg");
  msgEl.className = "account-msg";
  msgEl.textContent = "";

  if (!cur || !next || !confirm) {
    msgEl.textContent = "All fields are required.";
    return;
  }
  if (next !== confirm) {
    msgEl.textContent = "New passwords do not match.";
    return;
  }

  const btn = document.getElementById("account-save-btn");
  btn.disabled = true;
  try {
    const res = await fetch("/api/account/password", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ currentPassword: cur, newPassword: next }),
    });
    if (!res.ok) throw new Error(await res.text());
    msgEl.className = "account-msg account-msg-ok";
    msgEl.textContent = "✓ Password updated.";
    ["account-cur-pwd", "account-new-pwd", "account-confirm-pwd"].forEach((id) => {
      document.getElementById(id).value = "";
    });
  } catch (err) {
    msgEl.textContent = err.message;
  } finally {
    btn.disabled = false;
  }
}
