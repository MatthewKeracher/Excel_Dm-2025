// BFRPG NPC Generator
// Generates randomised NPC stat blocks from class/level data.

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

function rollPrime() {
  let s;
  do { s = roll3d6(); } while (s < 13);
  return s;
}

function rollNPCHP(hitDiceNotation, conBonus) {
  const m = hitDiceNotation.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (!m) return 1;
  const count = parseInt(m[1]), sides = parseInt(m[2]), flat = m[3] ? parseInt(m[3]) : 0;
  let total = flat;
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return Math.max(1, total + conBonus * count);
}

// Starting gear by class name — armour and weapon names match items.json exactly.
const CLASS_GEAR = {
  "Fighter":    { armorName: "Chain Mail",          weaponName: "Longsword / Scimitar" },
  "Cleric":     { armorName: "Chain Mail",          weaponName: "Mace" },
  "Magic-User": { armorName: "No Armor",            weaponName: "Dagger" },
  "Thief":      { armorName: "Leather",             weaponName: "Shortsword / Cutlass" },
  "Ranger":     { armorName: "Chain Mail",          weaponName: "Longsword / Scimitar" },
  "Assassin":   { armorName: "Leather",             weaponName: "Dagger" },
};

// Fallback when items data is not available.
const CLASS_FALLBACK = {
  "Fighter":    { baseAC: 15, weapon: "Longsword",  dmg: "1d8" },
  "Cleric":     { baseAC: 15, weapon: "Mace",       dmg: "1d8" },
  "Magic-User": { baseAC: 11, weapon: "Dagger",     dmg: "1d4" },
  "Thief":      { baseAC: 13, weapon: "Shortsword", dmg: "1d6" },
  "Ranger":     { baseAC: 15, weapon: "Longsword",  dmg: "1d8" },
  "Assassin":   { baseAC: 13, weapon: "Dagger",     dmg: "1d4" },
};

function pickGear(classEntry, items) {
  const gear = CLASS_GEAR[classEntry.name] ?? { armorName: "No Armor", weaponName: "Dagger" };
  const fb   = CLASS_FALLBACK[classEntry.name] ?? { baseAC: 11, weapon: "Dagger", dmg: "1d4" };

  if (!items || items.length === 0) {
    return { baseAC: fb.baseAC, weaponName: fb.weapon, weaponDmg: fb.dmg, armorCost: 0, weaponCost: 0, armorName: gear.armorName };
  }

  const armorItem  = items.find(i => i.category === "armor"   && i.name === gear.armorName);
  const weaponItem = items.find(i => i.category === "weapons" && i.name === gear.weaponName);

  const baseAC     = armorItem  ? parseInt(armorItem.ac)  || fb.baseAC : fb.baseAC;
  const weaponName = weaponItem ? weaponItem.name          : fb.weapon;
  const weaponDmg  = weaponItem ? weaponItem.damage        : fb.dmg;
  const armorCost  = armorItem  ? parseFloat(armorItem.cost)  || 0 : 0;
  const weaponCost = weaponItem ? parseFloat(weaponItem.cost) || 0 : 0;

  return { baseAC, weaponName, weaponDmg, armorCost, weaponCost, armorName: gear.armorName };
}

function rollStartingGold() {
  return (Math.floor(Math.random() * 6) + 1
        + Math.floor(Math.random() * 6) + 1
        + Math.floor(Math.random() * 6) + 1) * 10;
}

// spells.json uses "Mage" for Magic-User spells
const SPELL_CLASS_ALIAS = { "Magic-User": "Mage" };

function pickSpells(classEntry, levelData, spells) {
  if (!levelData.spellSlots || !spells || spells.length === 0) return [];
  const spellClass = SPELL_CLASS_ALIAS[classEntry.name] ?? classEntry.name;
  const known = [];
  levelData.spellSlots.forEach((count, i) => {
    if (count <= 0) return;
    const spellLevel = i + 1;
    const pool = spells.filter(s => s.class === spellClass && s.level === spellLevel);
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    known.push(pick.name);
  });
  return known;
}

export function generateNPC(classEntry, level, cache = {}) {
  const levelData = classEntry.levels.find(l => l.level === level);
  if (!levelData) return "";

  const str = roll3d6(), dex = roll3d6(), int_ = roll3d6();
  const wis = roll3d6(), con = roll3d6(), cha  = roll3d6();
  const strMod = abilityBonus(str), dexMod = abilityBonus(dex), conMod = abilityBonus(con);
  const hp  = rollNPCHP(levelData.hitDice, conMod);
  const gear = pickGear(classEntry, cache.items);
  const ac  = gear.baseAC + dexMod;
  const ab  = levelData.attackBonus;
  const dmgStr = strMod === 0 ? gear.weaponDmg : strMod > 0 ? `${gear.weaponDmg}+${strMod}` : `${gear.weaponDmg}${strMod}`;

  let extra = "";
  if (levelData.spellSlots) {
    const slots = levelData.spellSlots.filter(s => s > 0);
    if (slots.length > 0) extra = `, Spells ${slots.join("/")}`;
  }

  return `**${classEntry.name} ${level}** — HP <span data-field="hp">${hp}</span>, AC ${ac} (${gear.armorName}), AB +${ab}, ${gear.weaponName} ${dmgStr}${extra} | S ${str} D ${dex} I ${int_} W ${wis} C ${con} Ch ${cha}`;
}

function pickRace(classEntry, races) {
  if (!races || races.length === 0) return null;
  const eligible = races.filter(r =>
    r.allowedClasses === null || r.allowedClasses.includes(classEntry.name)
  );
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export function generateNPCBlock(classEntry, level, cache = {}) {
  const levelData = classEntry.levels.find(l => l.level === level);
  if (!levelData) return "";

  const race = pickRace(classEntry, cache.races);

  const prime = classEntry.primeRequisite;
  const str  = prime === "STR" ? rollPrime() : roll3d6();
  const dex  = prime === "DEX" ? rollPrime() : roll3d6();
  const int_ = prime === "INT" ? rollPrime() : roll3d6();
  const wis  = prime === "WIS" ? rollPrime() : roll3d6();
  const con  = prime === "CON" ? rollPrime() : roll3d6();
  const cha  = prime === "CHA" ? rollPrime() : roll3d6();
  const strMod = abilityBonus(str), dexMod = abilityBonus(dex), conMod = abilityBonus(con);
  // Apply racial hit die cap (Elves and Halflings cap at d6)
  let hitDiceNotation = levelData.hitDice;
  if (race?.hitDieCap) {
    hitDiceNotation = hitDiceNotation.replace(/d(\d+)/, (_, sides) =>
      `d${Math.min(parseInt(sides), race.hitDieCap)}`
    );
  }
  const hp   = rollNPCHP(hitDiceNotation, conMod);
  const gear = pickGear(classEntry, cache.items);
  const ac   = gear.baseAC + dexMod;
  const ab   = levelData.attackBonus;
  const dmgStr = strMod === 0 ? gear.weaponDmg : strMod > 0 ? `${gear.weaponDmg}+${strMod}` : `${gear.weaponDmg}${strMod}`;
  const fmtBonus = n => n > 0 ? `+${n}` : n === 0 ? "" : `${n}`;

  // Starting gold and remaining coins
  const gold = rollStartingGold();
  const spent = gear.armorCost + gear.weaponCost;
  const remaining = Math.max(0, gold - spent);
  const coinStr = remaining > 0 ? ` (${remaining} gp remaining)` : "";

  const combatTable = `| | |\n|:---|:---|\n` +
    `| HP | <span data-field="hp">${hp}</span> |\n| AC | ${ac} |\n| Attack Bonus | +${ab} |\n` +
    `| Armour | ${gear.armorName}${coinStr} |\n| Weapon | ${gear.weaponName} (${dmgStr}) |`;

  const abilityRow = (name, score) => {
    const b = fmtBonus(abilityBonus(score));
    return b ? `| ${name} | ${score} | ${b} |` : `| ${name} | ${score} | |`;
  };
  const abilityTable = `| Ability | Score | Bonus |\n|:--------|:-----:|:-----:|\n` +
    [["STR", str], ["DEX", dex], ["INT", int_], ["WIS", wis], ["CON", con], ["CHA", cha]]
      .map(([n, s]) => abilityRow(n, s)).join("\n");

  let saveSection = "";
  if (classEntry.savingThrows) {
    const save = classEntry.savingThrows.find(s => s.level === level);
    if (save) {
      const rb = race?.saveBonuses ?? {};
      const adj = (base, bonus) => bonus ? base - bonus : base;
      saveSection = `\n\n| Save | Roll |\n|:---|:---:|\n` +
        `| Death Ray / Poison | ${adj(save.deathRay, rb.deathRay)} |\n` +
        `| Magic Wands | ${adj(save.magicWands, rb.magicWands)} |\n` +
        `| Paralysis / Petrify | ${adj(save.paralysisPetrify, rb.paralysisPetrify)} |\n` +
        `| Dragon Breath | ${adj(save.dragonBreath, rb.dragonBreath)} |\n` +
        `| Spells | ${adj(save.spells, rb.spells)} |`;
    }
  }

  let spellSection = "";
  if (levelData.spellSlots) {
    const slotLabels = levelData.spellSlots
      .map((n, i) => n > 0 ? `L${i + 1}: ${n}` : null).filter(Boolean).join("  ");
    if (slotLabels) {
      spellSection = `\n\n**Spell Slots:** ${slotLabels}`;
      const known = pickSpells(classEntry, levelData, cache.spells);
      if (known.length > 0) spellSection += `\n\n**Spells:** ${known.join(", ")}`;
    }
  }

  let skillSection = "";
  if (classEntry.skills) {
    const skillData = classEntry.skills.find(s => s.level === level);
    if (skillData) {
      const skillNames = {
        openLocks: "Open Locks", removeTraps: "Remove Traps", pickPockets: "Pick Pockets",
        moveSilently: "Move Silently", climbWalls: "Climb Walls", hide: "Hide in Shadows", listen: "Listen",
      };
      const rows = Object.entries(skillNames)
        .filter(([k]) => skillData[k] !== undefined)
        .map(([k, label]) => `| ${label} | ${skillData[k]}% |`).join("\n");
      skillSection = `\n\n| Skill | Chance |\n|:---|:---:|\n${rows}`;
    }
  }

  const title = race ? `${race.name} ${classEntry.name}` : classEntry.name;
  const raceSection = race?.notes ? `\n\n*${race.notes}*` : "";

  return `# ${title} ${level}\n\n---\n\n${combatTable}\n\n${abilityTable}${saveSection}${spellSection}${skillSection}${raceSection}`;
}
