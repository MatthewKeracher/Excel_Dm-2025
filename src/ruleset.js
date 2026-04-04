import { authHeaders } from "./auth.js";

const TREASURE_TABLE = {
  A: { Copper:{pct:50,dice:'5d6'}, Silver:{pct:60,dice:'5d6'}, Electrum:{pct:40,dice:'5d4'}, Gold:{pct:70,dice:'10d6'}, Platinum:{pct:50,dice:'1d10'}, Gems:{pct:50,dice:'6d6'}, Jewelry:{pct:50,dice:'6d6'}, 'Magic Items':{pct:50,dice:'6d6'} },
  B: { Copper:{pct:75,dice:'5d10'}, Silver:{pct:50,dice:'5d6'}, Electrum:{pct:50,dice:'5d4'}, Gold:{pct:50,dice:'3d6'}, Platinum:{pct:0,dice:null}, Gems:{pct:25,dice:'1d6'}, Jewelry:{pct:50,dice:'6d6'}, 'Magic Items':{pct:25,dice:'1d6'} },
  C: { Copper:{pct:60,dice:'6d6'}, Silver:{pct:60,dice:'5d4'}, Electrum:{pct:30,dice:'2d6'}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:25,dice:'1d4'}, Jewelry:{pct:50,dice:'1d4'}, 'Magic Items':{pct:15,dice:'1d2'} },
  D: { Copper:{pct:30,dice:'4d6'}, Silver:{pct:45,dice:'6d6'}, Electrum:{pct:0,dice:null}, Gold:{pct:90,dice:'5d8'}, Platinum:{pct:0,dice:null}, Gems:{pct:30,dice:'1d8'}, Jewelry:{pct:30,dice:'1d8'}, 'Magic Items':{pct:20,dice:'1d2'} },
  E: { Copper:{pct:30,dice:'2d8'}, Silver:{pct:60,dice:'6d10'}, Electrum:{pct:50,dice:'3d8'}, Gold:{pct:50,dice:'4d10'}, Platinum:{pct:0,dice:null}, Gems:{pct:10,dice:'1d10'}, Jewelry:{pct:10,dice:'1d10'}, 'Magic Items':{pct:30,dice:'1d4'} },
  F: { Copper:{pct:0,dice:null}, Silver:{pct:40,dice:'3d8'}, Electrum:{pct:50,dice:'4d8'}, Gold:{pct:85,dice:'6d10'}, Platinum:{pct:70,dice:'2d8'}, Gems:{pct:20,dice:'2d12'}, Jewelry:{pct:10,dice:'1d12'}, 'Magic Items':{pct:35,dice:'1d4'} },
  G: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:90,dice:'4d6x10'}, Platinum:{pct:75,dice:'5d8'}, Gems:{pct:25,dice:'3d6'}, Jewelry:{pct:25,dice:'1d10'}, 'Magic Items':{pct:50,dice:'1d4'} },
  H: { Copper:{pct:'*',dice:'8d10'}, Silver:{pct:'*',dice:'6d10x10'}, Electrum:{pct:'*',dice:'3d10x10'}, Gold:{pct:'*',dice:'5d8x10'}, Platinum:{pct:'*',dice:'9d8'}, Gems:{pct:25,dice:'3d6'}, Jewelry:{pct:25,dice:'1d10'}, 'Magic Items':{pct:25,dice:'1d10'} },
  I: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:80,dice:'3d10'}, Gems:{pct:50,dice:'2d6'}, Jewelry:{pct:50,dice:'6d6'}, 'Magic Items':{pct:15,dice:'1d1'} },
  J: { Copper:{pct:45,dice:'3d8'}, Silver:{pct:45,dice:'1d8'}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  K: { Copper:{pct:0,dice:null}, Silver:{pct:90,dice:'2d10'}, Electrum:{pct:35,dice:'1d8'}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  L: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:50,dice:'1d4'}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  M: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:90,dice:'4d10'}, Platinum:{pct:90,dice:'2d8'}, Gems:{pct:55,dice:'5d4'}, Jewelry:{pct:45,dice:'2d6'}, 'Magic Items':{pct:0,dice:null} },
  N: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:40,dice:'2d4'} },
  O: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:50,dice:'1d4'} },
  P: { Copper:{pct:100,dice:'3d8'}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  Q: { Copper:{pct:0,dice:null}, Silver:{pct:100,dice:'3d6'}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  R: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:100,dice:'2d6'}, Gold:{pct:0,dice:null}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  S: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:100,dice:'2d4'}, Platinum:{pct:0,dice:null}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  T: { Copper:{pct:0,dice:null}, Silver:{pct:0,dice:null}, Electrum:{pct:0,dice:null}, Gold:{pct:0,dice:null}, Platinum:{pct:100,dice:'1d6'}, Gems:{pct:0,dice:null}, Jewelry:{pct:0,dice:null}, 'Magic Items':{pct:0,dice:null} },
  U: { Copper:{pct:50,dice:'1d20'}, Silver:{pct:50,dice:'1d20'}, Electrum:{pct:0,dice:null}, Gold:{pct:25,dice:'1d20'}, Platinum:{pct:0,dice:null}, Gems:{pct:5,dice:'1d4'}, Jewelry:{pct:5,dice:'1d4'}, 'Magic Items':{pct:2,dice:'1d1'} },
  V: { Copper:{pct:0,dice:null}, Silver:{pct:25,dice:'1d20'}, Electrum:{pct:25,dice:'1d20'}, Gold:{pct:50,dice:'1d20'}, Platinum:{pct:25,dice:'1d20'}, Gems:{pct:10,dice:'1d4'}, Jewelry:{pct:10,dice:'1d4'}, 'Magic Items':{pct:5,dice:'1d1'} },
};

function expandTreasureLetter(letter) {
  const table = TREASURE_TABLE[letter.toUpperCase()];
  if (!table) return '';
  return Object.entries(table)
    .filter(([, { pct, dice }]) => (pct === '*' || pct > 0) && dice)
    .map(([name, { pct, dice }]) =>
      `<tr class="treasure-row"><td class="treasure-item">${name}</td><td>${pct === '*' ? 'Always' : pct + '%'} &middot; ${dice}</td></tr>`)
    .join('');
}

function expandLetterGroup(letters, label) {
  let rows = '';
  if (label) rows += `<tr class="treasure-section"><td colspan="2"><i>${label}</i></td></tr>`;
  letters.forEach(l => {
    if (letters.length > 1) rows += `<tr class="treasure-section"><td colspan="2"><i>Type ${l.toUpperCase()}</i></td></tr>`;
    rows += expandTreasureLetter(l);
  });
  return rows;
}

function expandTreasureCode(code, label) {
  if (!code) return '';
  let rows = '';
  if (label) rows += `<tr class="treasure-section"><td colspan="2"><i>${label}</i></td></tr>`;

  // "None"
  if (/^none$/i.test(code.trim())) return rows + `<tr class="treasure-row"><td class="treasure-item" colspan="2">None</td></tr>`;

  // Special / See X — no expansion
  if (/^special$/i.test(code.trim()) || /^see\s/i.test(code.trim()))
    return rows + `<tr class="treasure-row"><td class="treasure-item" colspan="2">${code}</td></tr>`;

  // "U or special"
  if (/^u or special$/i.test(code.trim()))
    return rows + expandTreasureLetter('U')
      + `<tr class="treasure-row"><td class="treasure-item" colspan="2"><i>or Special</i></td></tr>`;

  // Letter + bonus gold: "E plus 1d8x1000 gp" / "C + 1d20x100 gp"
  const plusGoldMatch = code.match(/^([A-V])\s*(?:plus|\+)\s*([\dd×xX]+)\s*gp/i);
  if (plusGoldMatch)
    return rows + expandTreasureLetter(plusGoldMatch[1])
      + `<tr class="treasure-row"><td class="treasure-item">Gold (bonus)</td><td>Always &middot; ${plusGoldMatch[2]}</td></tr>`;

  // One or more plain letters: "A" / "B, I" / "Q, R, S"
  const letters = code.match(/\b[A-V]\b/gi) || [];
  if (letters.length > 0) return rows + expandLetterGroup(letters, null);

  // Unknown — show as text
  return rows + `<tr class="treasure-row"><td class="treasure-item" colspan="2">${code}</td></tr>`;
}

function buildTreasureRows(m) {
  const ind  = m.treasureIndividual;
  const lair = m.treasureLair;
  if (!ind && !lair) return '';

  const hasLair = lair && lair.trim();

  if (hasLair) {
    return expandTreasureCode(ind,  `Individual — ${ind}`)
         + expandTreasureCode(lair, `In Lair — ${lair}`);
  }

  return expandTreasureCode(ind, `Treasure — ${ind}`);
}

let currentRuleset = "";
const cache = {}; // { monsters: [...], spells: [...], items: [...] }

export function setCurrentRuleset(name) {
  if (name !== currentRuleset) {
    currentRuleset = name ?? "";
    // Clear cache when ruleset changes
    Object.keys(cache).forEach(k => delete cache[k]);
  }
}

export function getCurrentRuleset() {
  return currentRuleset;
}

export async function fetchRulesets() {
  const res = await fetch("/api/rulesets", { headers: authHeaders() });
  if (!res.ok) return [];
  return res.json();
}

export async function getRulesetData(category) {
  if (!currentRuleset) return [];
  if (cache[category]) return cache[category];
  try {
    const res = await fetch(`/api/rulesets/${currentRuleset}/${category}`, { headers: authHeaders() });
    if (!res.ok) return [];
    const data = await res.json();
    cache[category] = Array.isArray(data) ? data : [];
    return cache[category];
  } catch {
    return [];
  }
}

// Format a structured monster entry as a full HTML stat block
export function formatMonsterBlock(m) {
  const statRows = [
    ["AC", m.ac], ["HD", m.hd], ["Attacks", m.attacks],
    ["Damage", m.damage], ["Movement", m.movement],
    ["Appearing", m.appearing], ["Save As", m.saveAs],
    ["Morale", m.morale], ["XP", m.xp],
  ].filter(([, v]) => v)
   .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`)
   .join('');

  const treasureRows = buildTreasureRows(m);

  let html = `<h2>${m.name}</h2><hr><table class="monster-stat-block"><tbody>${statRows}${treasureRows}</tbody></table>`;
  if (m.special) html += `\n\n<p>${m.special}</p>`;
  if (m.description) html += `\n\n<p>${m.description}</p>`;
  return html;
}

// Format a one-liner from a structured monster entry
export function formatMonsterOneLiner(m) {
  return m.oneLiner || `**${m.name}**: AC ${m.ac}, HD ${m.hd}, Dmg ${m.damage}, MV ${m.movement}`;
}

// Format a structured spell entry as a full markdown block
export function formatSpellBlock(s) {
  const rows = [
    ["Class", s.class], ["Level", s.level],
    ["Range", s.range], ["Duration", s.duration],
  ].filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => `| ${k} | ${v} |`).join("\n");

  return `# ${s.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}\n\n${s.description}`;
}

// Format a one-liner from a structured spell entry
export function formatSpellOneLiner(s) {
  return s.oneLiner || `**${s.name}** (${s.class} L${s.level}, Range: ${s.range}, Duration: ${s.duration})`;
}

// Format a structured item entry as a full markdown block
export function formatItemBlock(item) {
  const rows = [
    ["Cost", item.cost ? `${item.cost} gp` : ""],
    ["Weight", item.weight ? `${item.weight} lb` : ""], ["Damage", item.damage],
    ["AC", item.ac], ["Size", item.size],
  ].filter(([, v]) => v).map(([k, v]) => `| ${k} | ${v} |`).join("\n");

  const block = `# ${item.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}`;
  return item.description ? `${block}\n\n${item.description}` : block;
}

// Format a one-liner from a structured item entry
export function formatItemOneLiner(item) {
  return item.oneLiner || item.name;
}

// ── NPC Generator ────────────────────────────────────────────────────────────

function abilityBonus(score) {
  if (score <= 3)  return -3;
  if (score <= 5)  return -2;
  if (score <= 8)  return -1;
  if (score <= 12) return  0;
  if (score <= 15) return +1;
  if (score <= 17) return +2;
  return +3;
}

function roll3d6() {
  return Math.floor(Math.random() * 6) + 1
       + Math.floor(Math.random() * 6) + 1
       + Math.floor(Math.random() * 6) + 1;
}

function rollHP(hitDiceNotation, conBonus) {
  const m = hitDiceNotation.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (!m) return 1;
  const count = parseInt(m[1]);
  const sides = parseInt(m[2]);
  const flat  = m[3] ? parseInt(m[3]) : 0;
  let total = flat;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return Math.max(1, total + conBonus * count);
}

const CLASS_DEFAULTS = {
  "Fighter":    { baseAC: 18, weapon: "Longsword",   dmg: "1d8" },
  "Cleric":     { baseAC: 16, weapon: "Mace",        dmg: "1d8" },
  "Magic-User": { baseAC: 11, weapon: "Dagger",      dmg: "1d4" },
  "Thief":      { baseAC: 13, weapon: "Shortsword",  dmg: "1d6" },
  "Ranger":     { baseAC: 16, weapon: "Longsword",   dmg: "1d8" },
  "Assassin":   { baseAC: 13, weapon: "Dagger",      dmg: "1d4" },
};

export function generateNPC(classEntry, level) {
  const levelData = classEntry.levels.find(l => l.level === level);
  if (!levelData) return "";

  const str = roll3d6(), dex = roll3d6(), int_ = roll3d6();
  const wis = roll3d6(), con = roll3d6(), cha  = roll3d6();

  const strMod = abilityBonus(str);
  const dexMod = abilityBonus(dex);
  const conMod = abilityBonus(con);

  const hp = rollHP(levelData.hitDice, conMod);

  const def = CLASS_DEFAULTS[classEntry.name] ?? { baseAC: 11, weapon: "Dagger", dmg: "1d4" };
  const ac  = def.baseAC + dexMod;
  const ab  = levelData.attackBonus;

  const dmgStr = strMod === 0 ? def.dmg
               : strMod  > 0  ? `${def.dmg}+${strMod}`
               :                `${def.dmg}${strMod}`;

  let extra = "";
  if (levelData.spellSlots) {
    const slots = levelData.spellSlots.filter(s => s > 0);
    if (slots.length > 0) extra = `, Spells ${slots.join("/")}`;
  }

  return `**${classEntry.name} ${level}** — HP ${hp}, AC ${ac}, AB +${ab}, ${def.weapon} ${dmgStr}${extra} | STR ${str} DEX ${dex} INT ${int_} WIS ${wis} CON ${con} CHA ${cha}`;
}

export function generateNPCBlock(classEntry, level) {
  const levelData = classEntry.levels.find(l => l.level === level);
  if (!levelData) return "";

  const str = roll3d6(), dex = roll3d6(), int_ = roll3d6();
  const wis = roll3d6(), con = roll3d6(), cha  = roll3d6();

  const strMod = abilityBonus(str);
  const dexMod = abilityBonus(dex);
  const conMod = abilityBonus(con);

  const hp = rollHP(levelData.hitDice, conMod);

  const def = CLASS_DEFAULTS[classEntry.name] ?? { baseAC: 11, weapon: "Dagger", dmg: "1d4" };
  const ac  = def.baseAC + dexMod;
  const ab  = levelData.attackBonus;

  const dmgStr = strMod === 0 ? def.dmg
               : strMod  > 0  ? `${def.dmg}+${strMod}`
               :                `${def.dmg}${strMod}`;

  function fmtBonus(n) { return n > 0 ? `+${n}` : n === 0 ? "—" : `${n}`; }

  const combatTable = `| | |\n|:---|:---|\n` +
    `| HP | ${hp} |\n` +
    `| AC | ${ac} |\n` +
    `| Attack Bonus | +${ab} |\n` +
    `| Weapon | ${def.weapon} (${dmgStr}) |`;

  const abilityTable = `| Ability | Score | Bonus |\n|:--------|:-----:|:-----:|\n` +
    `| STR | ${str} | ${fmtBonus(strMod)} |\n` +
    `| DEX | ${dex} | ${fmtBonus(dexMod)} |\n` +
    `| INT | ${int_} | ${fmtBonus(abilityBonus(int_))} |\n` +
    `| WIS | ${wis} | ${fmtBonus(abilityBonus(wis))} |\n` +
    `| CON | ${con} | ${fmtBonus(conMod)} |\n` +
    `| CHA | ${cha} | ${fmtBonus(abilityBonus(cha))} |`;

  let saveSection = "";
  if (classEntry.savingThrows) {
    const save = classEntry.savingThrows.find(s => s.level === level);
    if (save) {
      saveSection = `\n\n#### Saving Throws\n\n| Save | Roll |\n|:---|:---:|\n` +
        `| Death Ray / Poison | ${save.deathRay} |\n` +
        `| Magic Wands | ${save.magicWands} |\n` +
        `| Paralysis / Petrify | ${save.paralysisPetrify} |\n` +
        `| Dragon Breath | ${save.dragonBreath} |\n` +
        `| Spells | ${save.spells} |`;
    }
  }

  let spellSection = "";
  if (levelData.spellSlots) {
    const slotLabels = levelData.spellSlots
      .map((n, i) => n > 0 ? `L${i + 1}: ${n}` : null)
      .filter(Boolean).join("  ");
    if (slotLabels) spellSection = `\n\n**Spell Slots:** ${slotLabels}`;
  }

  let skillSection = "";
  if (classEntry.skills) {
    const skillData = classEntry.skills.find(s => s.level === level);
    if (skillData) {
      const skillNames = {
        openLocks: "Open Locks", removeTraps: "Remove Traps",
        pickPockets: "Pick Pockets", moveSilently: "Move Silently",
        climbWalls: "Climb Walls", hide: "Hide in Shadows", listen: "Listen",
      };
      const rows = Object.entries(skillNames)
        .filter(([k]) => skillData[k] !== undefined)
        .map(([k, label]) => `| ${label} | ${skillData[k]}% |`)
        .join("\n");
      skillSection = `\n\n#### Thief Skills\n\n| Skill | Chance |\n|:---|:---:|\n${rows}`;
    }
  }

  return `# ${classEntry.name} ${level}\n\n---\n\n${combatTable}\n\n#### Ability Scores\n\n${abilityTable}${saveSection}${spellSection}${skillSection}`;
}

// ── Table formatters (for an entire subcategory group) ────────────────────────

export function formatMonsterTable(monsters) {
  const header = "| Name | AC | HD | Attacks | Damage | Movement | XP |";
  const sep    = "|:---|:---|:---|:---|:---|:---|:---|";
  const rows   = monsters.map(m =>
    `| ${m.name} | ${m.ac ?? ""} | ${m.hd ?? ""} | ${m.attacks ?? ""} | ${m.damage ?? ""} | ${m.movement ?? ""} | ${m.xp ?? ""} |`
  );
  return [header, sep, ...rows].join("\n");
}

export function formatSpellTable(spells) {
  const header = "| Name | Range | Duration |";
  const sep    = "|:---|:---|:---|";
  const rows   = spells.map(s =>
    `| ${s.name} | ${s.range ?? ""} | ${s.duration ?? ""} |`
  );
  return [header, sep, ...rows].join("\n");
}

export function formatItemTable(items) {
  // Only include columns that have at least one non-empty value in this group
  const cols = [
    { key: "name",   label: "Name",   get: i => i.name ?? "" },
    { key: "cost",   label: "Cost",   get: i => i.cost   ? `${i.cost} gp`  : "" },
    { key: "damage", label: "Damage", get: i => i.damage ?? "" },
    { key: "ac",     label: "AC",     get: i => i.ac     ?? "" },
    { key: "weight", label: "Weight", get: i => i.weight ? `${i.weight} lb` : "" },
    { key: "size",   label: "Size",   get: i => i.size   ?? "" },
  ].filter(c => items.some(i => c.get(i)));

  const header = "| " + cols.map(c => c.label).join(" | ") + " |";
  const sep    = "| " + cols.map(() => ":---").join(" | ") + " |";
  const rows   = items.map(i => "| " + cols.map(c => c.get(i)).join(" | ") + " |");
  return [header, sep, ...rows].join("\n");
}
