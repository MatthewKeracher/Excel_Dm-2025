// BFRPG Ruleset Module
// Entry point for the BFRPG plugin. Exports the sections and generators
// interface consumed by editor.js to render the Rules pane and Treasure panel.

export { generateNPC, generateNPCBlock } from './npc.js';
export { generateGem, generateJewelry, generateMagicItem, generatePotion, generateSpellScroll } from './treasure.js';
export { formatMonsterBlock, formatMonsterOneLiner, formatMonsterTable } from './formatters.js';
export { formatSpellBlock, formatSpellOneLiner, formatSpellTable } from './formatters.js';
export { formatItemBlock, formatItemOneLiner, formatItemTable } from './formatters.js';

import {
  formatMonsterBlock, formatMonsterOneLiner, formatMonsterTable,
  formatSpellBlock, formatSpellOneLiner, formatSpellTable,
  formatItemBlock, formatItemOneLiner, formatItemTable,
} from './formatters.js';

import {
  generateGem, generateJewelry, generateMagicItem, generatePotion, generateSpellScroll,
} from './treasure.js';

// Drives the Rules pane in editor.js.
// Each section defines what data key to load, how to group entries, and
// how to format them — without editor.js needing to know BFRPG field names.
export const sections = [
  {
    label: "Monsters",
    key: "monsters",
    groupBy: m => m.family || "Other",
    formatBlock: (m, cache) => formatMonsterBlock(m, cache.monsters),
    formatLine:  (m, cache) => formatMonsterOneLiner(m, cache.spells, cache.monsters),
    formatTable: formatMonsterTable,
  },
  {
    label: "Spells",
    key: "spells",
    groupBy: s => `${s.class} — Level ${s.level}`,
    formatBlock: (s, _cache) => formatSpellBlock(s),
    formatLine:  (s, _cache) => formatSpellOneLiner(s),
    formatTable: formatSpellTable,
  },
  {
    label: "Items",
    key: "items",
    groupBy: i => i.category ? i.category.charAt(0).toUpperCase() + i.category.slice(1) : "Other",
    formatBlock: (i, _cache) => formatItemBlock(i),
    formatLine:  (i, _cache) => formatItemOneLiner(i),
    formatTable: formatItemTable,
  },
];

// Drives the Treasure panel in editor.js.
// Each group becomes a collapsible subsection; each row becomes a Roll button.
// fn receives the loaded data cache so generators can use spell lists etc.
export const generators = [
  {
    label: "Gems",
    rows: [{ label: "Roll Gem", fn: _cache => generateGem() }],
  },
  {
    label: "Jewelry",
    rows: [{ label: "Roll Jewelry", fn: _cache => generateJewelry() }],
  },
  {
    label: "Magic Items",
    rows: [
      { label: "Any",              fn: cache => generateMagicItem("any",           cache.spells) },
      { label: "Weapon or Armor",  fn: cache => generateMagicItem("weaponOrArmor", cache.spells) },
      { label: "Any Exc. Weapons", fn: cache => generateMagicItem("anyExcWeapons", cache.spells) },
      { label: "Mage Scroll",      fn: cache => generateSpellScroll("Mage",    cache.spells) },
      { label: "Cleric Scroll",    fn: cache => generateSpellScroll("Cleric",  cache.spells) },
      { label: "Potion",           fn: _cache => generatePotion() },
    ],
  },
];
