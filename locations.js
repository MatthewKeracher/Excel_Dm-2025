import { reCurrent, newCurrent } from "./main.js";

export class EntryManager {
  constructor() {
    this.entries = [];
  }

  add(entry) {
    this.entries.push(entry);
    return this.entries;
  }

  all() {
    return this.entries;
  }

  n(title) {
    let result = this.entries.find(
      (entry) => entry.title.toUpperCase() === title.toUpperCase()
    );

    return result; //Example of use: obj = loc.n("Hommlet");
  }

  erase(entry) {
    this.entries = this.entries.filter((e) => e !== entry);
    return this.entries; //Ex. of use: entries = loc.erase(loc.n("Hommlet"));
  }

  findParents() {
    this.entries.forEach((entry) => {
      entry.children = entry.children.map((child) => {
        const childEntry = this.n(child.title); // Lookup full child Entry by title
        if (childEntry) {
          childEntry.parent = entry; // Set parent reference on child
          return childEntry; // Replace shallow child with full Entry object
        }
        return child; // Return original if no full object found
      });
    });
  }

  deleteAll() {
    this.entries.splice(0, this.entries.length);
    // Add some entries, including nested ones as desired
    this.add(
      new Entry({
        title: "Excel_DM",
        body: "A small place with small-minded people.",
      })
    );

    this.add(
      new Entry({
        title: "Welcome to Excel_DM!",
        body: "Information about the software.",
      })
    );

    this.n("Excel_DM").parentOf(this.n("Welcome to Excel_DM!"));

    newCurrent(this.entries[0]);

    return this.entries;
  }
}

export class Entry {
  title = "";
  image = "";
  body = "";
  children = [];
  parent = null;
  x = 0;
  y = 0;

  constructor(data = {}) {
    // this.id = crypto.randomUUID(); // Generates a UUID
    this.title = data.title || "Untitled Entry";
    this.image = data.image || "";
    this.body = data.body || "This is an entry.";
    this.children = data.children || [];
    this.parent = data.parent || null;
    this.x = data.x || 400;
    this.y = data.y || 400;
  }

  save(title, body) {
    this.title = title;
    this.body = body;
  }

  parentOf(entry) {
    // Add Location inside this Location
    const alreadyChildren = this.children.includes(entry);
    const isTheirChildren = entry.children.includes(this);

    if (!alreadyChildren && !isTheirChildren) {
      this.children.push(entry);
      entry.parent = this; // assign this as parent of entry
      return `${entry.title} is now inside ${this.title}!`;
    } else if (alreadyChildren) {
      return `${entry.title} is already inside ${this.title}!`;
    } else if (isTheirChildren) {
      return `${this.title} is already inside ${entry.title}!`;
    }
  }

  goOut() {
    // Return Parent Location
    if (this.parent) {
      return this.parent;
    } else {
      return `${this.title} has no parent location!`;
    }
  }
}
