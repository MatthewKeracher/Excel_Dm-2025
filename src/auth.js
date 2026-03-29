const TOKEN_KEY = "jwt";
const EMAIL_KEY = "exceldm_email";

export const getToken   = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
};

export const getEmail  = () => localStorage.getItem(EMAIL_KEY) ?? "";
const setEmail = (e)   => localStorage.setItem(EMAIL_KEY, e);

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
  if (getEmail()) return getEmail();
  try {
    const res = await fetch("/api/account", { headers: authHeaders() });
    if (!res.ok) return "";
    const { email } = await res.json();
    setEmail(email);
    return email;
  } catch {
    return "";
  }
}

// Updates the account button label in the header.
export function updateAccountDisplay(email) {
  const btn = document.getElementById("btn-account");
  if (btn) btn.textContent = email || "Account";
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
  // Reset form
  ["account-cur-pwd", "account-new-pwd", "account-confirm-pwd"].forEach((id) => {
    document.getElementById(id).value = "";
  });
  document.getElementById("account-msg").textContent = "";
  document.getElementById("account-msg").className = "account-msg";
}

function buildAccountModal() {
  const modal = document.createElement("div");
  modal.id = "account-modal";
  modal.innerHTML = `
    <div id="account-box">
      <button id="account-close-btn" title="Close">✕</button>
      <img src="/assets/logo.gif" alt="Excel DM" class="account-logo" />
      <p id="account-email-display" class="account-email"></p>

      <div class="account-section">
        <div class="settings-label">Change Password</div>
        <input id="account-cur-pwd"     type="password" placeholder="Current password" autocomplete="current-password" />
        <input id="account-new-pwd"     type="password" placeholder="New password"     autocomplete="new-password" />
        <input id="account-confirm-pwd" type="password" placeholder="Confirm new password" autocomplete="new-password" />
        <button id="account-save-btn">Save</button>
        <p id="account-msg" class="account-msg"></p>
      </div>

      <div class="account-section">
        <button id="account-logout-btn">Log out</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  accountModalBuilt = true;

  document.getElementById("account-close-btn").addEventListener("click", () => {
    document.getElementById("account-modal").style.display = "none";
  });

  document.getElementById("account-save-btn").addEventListener("click", changePassword);

  document.getElementById("account-logout-btn").addEventListener("click", () => {
    document.getElementById("account-modal").style.display = "none";
    // Trigger the existing logout button logic
    document.getElementById("btn-logout").click();
  });
}

async function changePassword() {
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
