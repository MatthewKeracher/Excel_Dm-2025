const TOKEN_KEY = "jwt";

export const getToken  = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

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
  const { token } = await res.json();
  localStorage.setItem(TOKEN_KEY, token);
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
      hideAuthModal();
      onSuccess();
    } catch (err) {
      errorMsg.textContent = err.message.trim();
    }
  }

  document.getElementById("auth-login-btn").addEventListener("click", () => attempt("login"));
  document.getElementById("auth-register-btn").addEventListener("click", () => attempt("register"));
}
