/**
 * Extracts spells and items from oldData.js into structured JSON files.
 * Run: node data/BFRPG/convert-spells-items.js
 */

const fs   = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "../oldData.js"), "utf8");

// ── Helper: extract a JSON array starting after fromIdx ──────────────────────
function extractArray(str, fromIdx) {
  let depth = 0;
  const start = str.indexOf("[", fromIdx);
  for (let i = start; i < str.length; i++) {
    if (str[i] === "[") depth++;
    else if (str[i] === "]") {
      depth--;
      if (depth === 0) return JSON.parse(str.substring(start, i + 1));
    }
  }
  throw new Error("Unmatched array");
}

// ── Spells ───────────────────────────────────────────────────────────────────
const mageIdx   = src.indexOf('"Mage":');
const clericIdx = src.indexOf('"Cleric":');

const mageSpells   = extractArray(src, mageIdx);
const clericSpells = extractArray(src, clericIdx);

// Combine, normalise field names, sort by class then level then name
const allSpells = [...mageSpells, ...clericSpells].map(s => ({
  name:        s.name?.trim() ?? "",
  class:       s.class?.trim() ?? "",
  level:       parseInt(s.level, 10) || 0,
  range:       s.Range?.trim() ?? "",
  duration:    s.Duration?.trim() ?? "",
  description: s.description?.trim() ?? "",
  oneLiner:    `${s.name} (${s.class} L${s.level}, Range: ${s.Range ?? "—"}, Duration: ${s.Duration ?? "—"})`,
}));

allSpells.sort((a, b) =>
  a.class.localeCompare(b.class) || a.level - b.level || a.name.localeCompare(b.name)
);

const spellsPath = path.join(__dirname, "spells.json");
fs.writeFileSync(spellsPath, JSON.stringify(allSpells, null, 2));
console.log(`Spells: ${allSpells.length} written to ${spellsPath}`);
console.log(`  Mage: ${mageSpells.length}  Cleric: ${clericSpells.length}`);
console.log("  Sample:", JSON.stringify(allSpells[0], null, 2));

// ── Items ────────────────────────────────────────────────────────────────────
// Extract each named category array individually (avoids trailing-comma issues)
const ITEM_CATEGORIES = [
  "weapons", "general", "armor", "clothing", "packs",
  "containers", "tools", "dungeon", "provisions",
  "meals", "booze", "services", "mounts",
];

const itemsIdx = src.indexOf('"Items":');
const allItems = [];
for (const category of ITEM_CATEGORIES) {
  const marker = `"${category}":`;
  const idx = src.indexOf(marker, itemsIdx);
  if (idx === -1) { console.warn(`Category "${category}" not found`); continue; }
  let entries;
  try {
    entries = extractArray(src, idx);
  } catch (e) {
    console.warn(`Failed to parse "${category}": ${e.message}`);
    continue;
  }
  entries.forEach(item => {
    allItems.push({
      name:        item.name?.trim() ?? "",
      category,
      cost:        item.cost !== undefined ? String(item.cost) : "",
      weight:      item.weight !== undefined ? String(item.weight) : "",
      damage:      item.damage?.trim() ?? "",
      ac:          item.AC !== undefined ? String(item.AC) : "",
      size:        item.size?.trim() ?? "",
      description: item.description?.trim() ?? "",
      oneLiner:    buildItemOneLiner(item, category),
    });
  });
}

function buildItemOneLiner(item, category) {
  const parts = [item.name];
  if (item.cost)   parts.push(`${item.cost}gp`);
  if (item.damage) parts.push(`Dmg ${item.damage}`);
  if (item.AC)     parts.push(`AC ${item.AC}`);
  if (item.weight) parts.push(`${item.weight}lb`);
  return parts.join(", ");
}

allItems.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

const itemsPath = path.join(__dirname, "items.json");
fs.writeFileSync(itemsPath, JSON.stringify(allItems, null, 2));
console.log(`\nItems: ${allItems.length} written to ${itemsPath}`);
const cats = [...new Set(allItems.map(i => i.category))];
cats.forEach(c => console.log(`  ${c}: ${allItems.filter(i => i.category === c).length}`));
console.log("  Sample weapon:", JSON.stringify(allItems.find(i => i.category === "weapons"), null, 2));
console.log("  Sample armor:", JSON.stringify(allItems.find(i => i.category === "armor"), null, 2));
