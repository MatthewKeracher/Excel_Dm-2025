// In-app modal dialogs replacing native confirm/alert/prompt.
// All functions return a Promise. Stack-aware so nested dialogs don't collide.

let stackDepth = 0;

function buildOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "app-dialog-overlay";
  overlay.style.zIndex = String(2000 + stackDepth);

  const box = document.createElement("div");
  box.className = "app-dialog-box";
  overlay.appendChild(box);

  return { overlay, box };
}

function close(overlay) {
  overlay.remove();
  stackDepth = Math.max(0, stackDepth - 1);
}

export function alertDialog(message, { title = "" } = {}) {
  return new Promise((resolve) => {
    stackDepth++;
    const { overlay, box } = buildOverlay();

    if (title) {
      const t = document.createElement("div");
      t.className = "app-dialog-title";
      t.textContent = title;
      box.appendChild(t);
    }

    const msg = document.createElement("div");
    msg.className = "app-dialog-message";
    msg.textContent = message;
    box.appendChild(msg);

    const btns = document.createElement("div");
    btns.className = "app-dialog-buttons";
    const ok = document.createElement("button");
    ok.className = "app-dialog-btn app-dialog-btn-primary";
    ok.textContent = "OK";
    ok.addEventListener("click", () => { close(overlay); resolve(); });
    btns.appendChild(ok);
    box.appendChild(btns);

    document.body.appendChild(overlay);
    ok.focus();

    overlay.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.stopPropagation();
        close(overlay); resolve();
      }
    });
  });
}

export function confirmDialog(message, { title = "", okText = "OK", cancelText = "Cancel" } = {}) {
  return new Promise((resolve) => {
    stackDepth++;
    const { overlay, box } = buildOverlay();

    if (title) {
      const t = document.createElement("div");
      t.className = "app-dialog-title";
      t.textContent = title;
      box.appendChild(t);
    }

    const msg = document.createElement("div");
    msg.className = "app-dialog-message";
    msg.textContent = message;
    box.appendChild(msg);

    const btns = document.createElement("div");
    btns.className = "app-dialog-buttons";

    const cancel = document.createElement("button");
    cancel.className = "app-dialog-btn";
    cancel.textContent = cancelText;
    cancel.addEventListener("click", () => { close(overlay); resolve(false); });

    const ok = document.createElement("button");
    ok.className = "app-dialog-btn app-dialog-btn-primary";
    ok.textContent = okText;
    ok.addEventListener("click", () => { close(overlay); resolve(true); });

    btns.appendChild(cancel);
    btns.appendChild(ok);
    box.appendChild(btns);

    document.body.appendChild(overlay);
    ok.focus();

    overlay.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.stopPropagation(); close(overlay); resolve(false); }
      else if (e.key === "Enter") { e.stopPropagation(); close(overlay); resolve(true); }
    });
  });
}

export function promptDialog(message, defaultValue = "", { title = "", okText = "OK", cancelText = "Cancel" } = {}) {
  return new Promise((resolve) => {
    stackDepth++;
    const { overlay, box } = buildOverlay();

    if (title) {
      const t = document.createElement("div");
      t.className = "app-dialog-title";
      t.textContent = title;
      box.appendChild(t);
    }

    const msg = document.createElement("div");
    msg.className = "app-dialog-message";
    msg.textContent = message;
    box.appendChild(msg);

    const input = document.createElement("input");
    input.type = "text";
    input.className = "app-dialog-input";
    input.value = defaultValue;
    box.appendChild(input);

    const btns = document.createElement("div");
    btns.className = "app-dialog-buttons";

    const cancel = document.createElement("button");
    cancel.className = "app-dialog-btn";
    cancel.textContent = cancelText;
    cancel.addEventListener("click", () => { close(overlay); resolve(null); });

    const ok = document.createElement("button");
    ok.className = "app-dialog-btn app-dialog-btn-primary";
    ok.textContent = okText;
    ok.addEventListener("click", () => { const v = input.value; close(overlay); resolve(v); });

    btns.appendChild(cancel);
    btns.appendChild(ok);
    box.appendChild(btns);

    document.body.appendChild(overlay);
    input.focus();
    input.select();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.stopPropagation(); close(overlay); resolve(null); }
      else if (e.key === "Enter") { e.stopPropagation(); const v = input.value; close(overlay); resolve(v); }
    });
  });
}
