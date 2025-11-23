import { Entry, EntryManager } from './class.js'; 
import { loadNoteCards } from './left.js';
import { initNotesCanvas, drawNotesCanvas } from './right.js';

// Create EntryManager instance
export const loc = new EntryManager();

// Add some entries, including nested ones as desired
loc.add(
  new Entry({
    title: "Hommlet",
    body: "A small place with small-minded people.",
  })
);

loc.add(
  new Entry({
    title: "Wicked Wench Inn",
    body: "The only Inn for miles around.",
  })
);

loc.add(
  new Entry({
    title: "Toilet",
    body: "Give it five minutes.",
  })
);

console.log(loc.all()); 

loc.n("Hommlet").goIn(loc.n("Wicked Wench Inn"));
loc.n("Wicked Wench Inn").goIn(loc.n("Toilet"));
console.log(loc.all()); 

initNotesCanvas(loc.n("Hommlet"));
drawNotesCanvas(loc.n("Hommlet"))
loadNoteCards(loc.n("Hommlet"))



