import {
  notes,
  setStatus,
  handleNew,
  handleSave,
  handleLoad,
} from './jsonManager.js';

import { renderNotecards,
    initCanvasNotes
 } from './notesUI.js';

window.addEventListener("DOMContentLoaded", () => {
  renderNotecards(notes);

  document.getElementById("btn-new")?.addEventListener("click", () => handleNew(renderNotecards, initCanvasNotes));
  document.getElementById("btn-save")?.addEventListener("click", handleSave);
  document.getElementById("btn-load")?.addEventListener("click", () => handleLoad(renderNotecards, initCanvasNotes));
  document.getElementById("btn-json")?.addEventListener("click", handleShowJson);

  setStatus("Ready (JSON in memory).");
});


// Assuming you have your notes JSON array available as `notes`
window.addEventListener('DOMContentLoaded', () => {
  // Initialize the canvas notes on the 'note-layer' canvas element
  initCanvasNotes('note-layer', notes);
});

window.addEventListener('resize', () => {
  initCanvasNotes('note-layer', notes);
});



