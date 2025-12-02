import { reCurrent, newCurrent, current, excelDM } from "./main.js";
import { currentTab } from "./tabs.js";

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
        type: "locations",
        current: true,
      })
    );

    this.add(
      new Entry({
        title: "Welcome to Excel_DM!",
        body: "Roleplaying games are played around a table with players and a game master. But in preparing for each session isn't the game master playing their own game? This solitaire has few rules, and much ink has been spilt on the best way to go about playing it. This software, Excel_DM, is my own take on how best the computer can be used to focus and improve the game master's projects.",
        type: "locations",
        current: false,
      })
    );

    this.n("Excel_DM").parentOf(this.n("Welcome to Excel_DM!"));

    newCurrent(this.entries[0]);

    return this.entries;
  }

  deleteEntry(entry) {
    // Remove the entry from the main entries list
    this.entries = this.entries.filter((e) => e !== entry);

    // Remove entry from ALL parents' children lists
    this.entries.forEach((parent) => {
      if (parent.children) {
        parent.children = parent.children.filter((child) => child !== entry);
      }
    });

    entry.children.forEach((child) => {
      if (child.type === "locations") {
        this.deleteEntry(child);
      }
    });
  }
}

export class Entry {
  title = "";
  type = "";
  image = "";
  body = "";
  color = "";
  children = [];
  currentChild = null;
  parent = null;
  current = false;
  x = 0;
  y = 0;

  constructor(data = {}) {
    // this.id = crypto.randomUUID(); // Generates a UUID
    this.title = data.title || "Untitled Entry";
    this.type = data.type || currentTab;
    this.image = data.image || "";
    this.body = data.body || this.defaultBody();
    this.color = data.color || "";
    this.children = data.children || [];
    this.currentChild = data.currentChild || null;
    this.parent = data.parent || null;
    this.current = data.current || false;
    this.x = data.x || this.getMiddle().x;
    this.y = data.y || this.getMiddle().y;
  }

  getMiddle() {
    const container = document.querySelector(".middle-right");
    const rect = container.getBoundingClientRect();
    return { x: rect.width / 2 - 100, y: rect.height / 2 };
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

  defaultBody() {
    let body = ``;

    switch (currentTab) {
      case "people":
        body = `|Level|Class|Alignment|HP |AC |Weapon|Damage|
  |:---:|:---:|:-------:|:-:|:-:|:-----|:-----|
  |Level|Class|Alignment|HP |AC |Weapon|Damage|

  |Ability | Score |      
  |:------:|:-----:|       
  |Str     |   X   |      
  |Dex     |   X   |
  |Int     |   X   |
  |Wis     |   X   |
  |Con     |   X   |
  |Cha     |   X   |
  
  |Spell | Level |      
  |:----:|:-----:|       
  |Spell | Level |      
  `;

        break;
      case "locations":
        body = `<div class="boxed-text">You see and hear the environment around you</div>The players are at a location in space and time.`;
        break;

      default:
        body = `This is an entry.`;
        break;
    }
    return body;
  }

  getNestedAtDepth() {
    let current = this;
    let level = 0;

    while (
      level < current.currentChild &&
      current.children &&
      current.children.length > 0
    ) {
      current = current.children[0]; // Go into first child
      level++;
    }

    return current; // Return the nested object at desired depth or last possible
  }

  findRootNode() {
    //Helper for Tracking Quest State
    let current = this;
    while (current.parent !== null && current.parent !== undefined) {
      current = current.parent; // Traverse up to the parent
    }
    return current; // This is the root node with no parent
  }

  countParentsUp() {
    let count = 0;
    let current = this;

    while (current.parent !== undefined && current.parent !== null) {
      count++;
      current = current.parent; // Move up one level
    }

    return count + 1;
  }
}
