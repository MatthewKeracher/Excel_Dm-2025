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

  prepareForJSON() {
    // Build index map: entry id/title -> array index
    const entryIndexMap = {};
    this.entries.forEach((entry, index) => {
      if (entry.id !== undefined) {
        entryIndexMap[entry.id] = index;
      } else if (entry.title) {
        entryIndexMap[entry.title] = index;
      }
    });

    const stripChildren = (obj) => {
      if (obj && typeof obj === "object") {
        const copy = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
          if (key === "children") {
            copy.children = [];
          } else if (key === "parent") {
            // Replace with parent's array index (or -1/null if no match)
            const parentId = obj.parent?.id || obj.parent?.title || obj.parent;
            copy.parent =
              parentId !== undefined ? entryIndexMap[parentId] ?? null : null;
          } else {
            copy[key] = stripChildren(obj[key]);
          }
        }

        return copy;
      }
      return obj;
    };

    const Copy = {};
    Copy.entries = stripChildren(this.entries);
    return Copy;
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

    // Recount currentChildren length on rootNode.
    let rootNode = entry.findRootNode();
    let newNumber = rootNode.getLowestEntry();
    rootNode.currentChild = newNumber - 1;

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

  prepareFromJSON() {
    const hasChildren = this.entries.some(
      (e) => Array.isArray(e.children) && e.children.length > 0
    );
    const hasParent = this.entries.some((e) => e.parent);

    if (hasChildren && !hasParent) {
      // Old data: rebuild parent from children
      console.log("Rebuilding parents from children...");
      this.entries.forEach((entry) => {
        if (!Array.isArray(entry.children)) return;

        entry.children = entry.children.map((child) => {
          const childEntry = this.n(child.title); // Lookup full child Entry by title
          if (childEntry) {
            childEntry.parent = entry; // Set parent reference on child
            return childEntry; // Use full Entry object
          }
          return child; // Fallback
        });
      });
    } else if (hasParent && !hasChildren) {
      // New data: rebuild children from parent
      // Clear existing children arrays
      this.entries.forEach((entry) => {
        entry.children = [];
      });

      // For every entry with a parent index, replace index with parent entry AND add to children
      this.entries.forEach((entry, entryIndex) => {
        const parentIndex = entry.parent;
        if (
          parentIndex !== null &&
          parentIndex !== undefined &&
          Number.isInteger(parentIndex) &&
          parentIndex >= 0 &&
          parentIndex < this.entries.length
        ) {
          // 1. Replace index with actual parent entry reference
          entry.parent = this.entries[parentIndex];

          // 2. Add this entry to parent's children array
          const parent = entry.parent;
          if (!Array.isArray(parent.children)) {
            parent.children = [];
          }
          if (!parent.children.includes(entry)) {
            parent.children.push(entry);
          }
        } else {
          // console.log(entry.title, parentIndex);
        }
      });
    } // If both present, assume data is consistent
  }
}

export class Entry {
  title = "";
  type = "";
  body = "";
  color = "";
  children = [];
  currentChild = null;
  parent = null;
  popOut = false;
  coords = { x: 0, y: 0 }; //coords for popOuts
  current = false;
  x = 0;
  y = 0;
  image = "";

  constructor(data = {}) {
    // this.id = crypto.randomUUID(); // Generates a UUID
    this.title = data.title || "Untitled Entry";
    this.type = data.type || currentTab;
    this.image = data.image || "";
    this.body = data.body || this.defaultBody();
    this.color = data.color || "";
    this.children = data.children || [];
    this.currentChild = data.currentChild || null;
    this.parent = data.parent !== undefined ? data.parent : null;
    this.popOut = data.popOut || false;
    this.coords = data.coords || {
      x: `${window.innerWidth - 600}px`,
      y: "100px",
    };
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
        body = `|Level|Class|Alignment|HP |AC |Damage|
|:---:|:---:|:-------:|:-:|:-:|:----:|
|Level|Class|Alignment|HP |AC |Damage|

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
        body = `<div class="boxed-text">...</div>`;
        break;

      default:
        body = `<div class="boxed-text">...</div>
        `;
        break;
    }
    return body;
  }

  getNestedAtDepth() {
    const root = this;

    let level = 0;
    let current = this;

    if (root.currentChild) {
      while (level < root.currentChild) {
        current = current.children[0]; // Go into first child
        level++;
      }
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

  getLowestEntry() {
    const rootNode = this.findRootNode();

    if (!rootNode.currentChild) {
      return rootNode; // No currentChild means root is lowest
    }

    let current = rootNode;
    let level = 0;

    // Traverse down to currentChild depth using first children
    while (level < rootNode.currentChild && current.children.length > 0) {
      current = current.children[0];
      level++;
    }

    // Continue down to deepest leaf from that depth
    while (current.children.length > 0) {
      current = current.children[0];
    }

    return level; //current;
  }
}
