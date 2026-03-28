// Sync state machine
// httpState: idle | saving | retrying | saved | error
// wsState:   disconnected | connecting | connected | reconnecting | updating

let httpState = "idle";
let wsState = "disconnected";
let savedTimer = null;
let updatingTimer = null;

export function setHttpState(state) {
  httpState = state;
  if (state === "saved") {
    clearTimeout(savedTimer);
    savedTimer = setTimeout(() => {
      httpState = "idle";
      render();
    }, 2000);
  }
  render();
}

export function setWsState(state) {
  wsState = state;
  if (state === "updating") {
    clearTimeout(updatingTimer);
    updatingTimer = setTimeout(() => {
      wsState = "connected";
      render();
    }, 2000);
  }
  render();
}

function render() {
  const el = document.getElementById("sync-status");
  if (!el) return;

  let text = "";
  let cls = "";

  if (httpState === "error") {
    text = "Save failed";
    cls = "error";
  } else if (httpState === "retrying") {
    text = "Retrying\u2026";
    cls = "saving";
  } else if (httpState === "saving") {
    text = "Saving\u2026";
    cls = "saving";
  } else if (httpState === "saved") {
    text = "Saved \u2713";
    cls = "saved";
  } else if (wsState === "updating") {
    text = "Updating\u2026";
    cls = "saving";
  } else if (wsState === "reconnecting") {
    text = "Reconnecting\u2026";
    cls = "reconnecting";
  } else if (wsState === "connecting") {
    text = "Connecting\u2026";
    cls = "connecting";
  }

  el.textContent = text;
  el.className = "sync-status" + (cls ? " " + cls : "");
}
