import { currentTab } from "./tabs.js";

export class EntryManager {
  constructor() {
    this.entries = [];
    this.dirtyEntries = new Set();
    this.deletedServerIds = new Set();
    this.tabs = null;      // null = use DEFAULT_TABS
    this.dirtyMeta = false; // true when tabs changed and need saving
  }

  clearDirtyState() {
    this.dirtyEntries.clear();
    this.deletedServerIds.clear();
    this.dirtyMeta = false;
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

  deleteAll(newCurrentFn) {
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

    newCurrentFn?.(this.entries[0]);

    return this.entries;
  }

  deleteEntry(entry) {
    if (entry._serverId != null) {
      this.deletedServerIds.add(entry._serverId);
    }
    this.dirtyEntries.delete(entry);
    this.entries = this.entries.filter((e) => e !== entry);

    // Remove entry from all parents' children lists
    this.entries.forEach((parent) => {
      if (parent.children) {
        parent.children = parent.children.filter((child) => child !== entry);
      }
    });

    if (entry.type === "quests") {
      if (entry.parent === null) {
        // Root quest: wipe the entire objective chain, then shift sort_order
        this._deleteQuestChain(entry.children);
        this._renumberQuests(entry.order);
      } else {
        // Objective: splice out of chain, re-linking parent to next objective
        if (entry.children.length > 0) {
          const next = entry.children[0];
          entry.parent.children = [next];
          next.parent = entry.parent;
          this.dirtyEntries.add(entry.parent);
          this.dirtyEntries.add(next);
        }
        // Clamp root's currentChild to the new chain length
        const root = entry.findRootNode();
        const deletedDepth = entry.countParentsUp() - 1;
        if (root.currentChild !== null && root.currentChild >= deletedDepth) {
          root.currentChild = deletedDepth > 0 ? deletedDepth - 1 : null;
          this.dirtyEntries.add(root);
        }
      }
    } else {
      entry.children.forEach((child) => {
        if (child.type === "locations") {
          this.deleteEntry(child);
        }
      });
    }
  }

  _deleteQuestChain(children) {
    children.forEach((child) => {
      if (child._serverId != null) {
        this.deletedServerIds.add(child._serverId);
      }
      this.dirtyEntries.delete(child);
      this.entries = this.entries.filter((e) => e !== child);
      this._deleteQuestChain(child.children);
    });
  }

  _renumberQuests(deletedOrder) {
    this.entries
      .filter((e) => e.type === "quests" && e.parent === null && e.order > deletedOrder)
      .forEach((quest) => {
        quest.order -= 1;
        this.dirtyEntries.add(quest);
      });
  }

  // Reset parent Entry-object refs back to raw server IDs and clear children.
  // Called before re-running prepareFromJSON after a delta WS update.
  resetParentLinks() {
    this.entries.forEach((e) => {
      if (e.parent != null && typeof e.parent === "object") {
        e.parent = e.parent._serverId ?? null;
      }
      e.children = [];
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
      // New data: rebuild children from parent (parent field is a server ID)
      this.entries.forEach((entry) => {
        entry.children = [];
      });

      const serverIdMap = new Map(
        this.entries.filter((e) => e._serverId != null).map((e) => [e._serverId, e])
      );

      this.entries.forEach((entry) => {
        const parentId = entry.parent;
        if (parentId == null || !Number.isInteger(parentId)) return;

        const parentEntry = serverIdMap.get(parentId);
        if (!parentEntry) return;

        entry.parent = parentEntry;
        if (!Array.isArray(parentEntry.children)) parentEntry.children = [];
        if (!parentEntry.children.includes(entry)) parentEntry.children.push(entry);
      });
    } // If both present, assume data is consistent
  }
}

export class Entry {
  _serverId = null;
  category = "";
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
  gridType = "hex";
  order = 0;

  constructor(data = {}) {
    this._serverId = data._serverId ?? null;
    this.category = data.category || "Uncategorised";
    this.title = data.title || "Untitled Entry";
    this.type = data.type || currentTab;
    this.image = data.image || "";
    this.gridType = data.gridType || "hex";
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
    this.order = data.order || 0;
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
        body = `|Ability|Score|
|:-----:|:-----:|
| S T R | ?? |
| D E X | ?? |
| I N T | ?? |
| W I S | ?? |
| C O N | ?? |
| C H A | ?? |
| - - - | - - - |
| H I T | ?? |
| A R M | ?? |
| D A M | ?? |
| X P   | ?? |
| - - - | - - - |
| P P | ?? |
| E P | ?? |
| G P | ?? |
| S P | ?? |
| C P | ?? |


<b>Inventory</b><hr>

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
