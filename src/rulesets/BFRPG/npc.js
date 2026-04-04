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

function rollNPCHP(hitDiceNotation, conBonus) {
  const m = hitDiceNotation.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (!m) return 1;
  const count = parseInt(m[1]), sides = parseInt(m[2]), flat = m[3] ? parseInt(m[3]) : 0;
  let total = flat;
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return Math.max(1, total + conBonus * count);
}

const CLASS_DEFAULTS = {
  "Fighter":    { baseAC: 18, weapon: "Longsword",  dmg: "1d8" },
  "Cleric":     { baseAC: 16, weapon: "Mace",       dmg: "1d8" },
  "Magic-User": { baseAC: 11, weapon: "Dagger",     dmg: "1d4" },
  "Thief":      { baseAC: 13, weapon: "Shortsword", dmg: "1d6" },
  "Ranger":     { baseAC: 16, weapon: "Longsword",  dmg: "1d8" },
  "Assassin":   { baseAC: 13, weapon: "Dagger",     dmg: "1d4" },
};

export function generateNPC(classEntry, level) {
  const levelData = classEntry.levels.find(l => l.level === level);
  if (!levelData) return "";

  const str = roll3d6(), dex = roll3d6(), int_ = roll3d6();
  const wis = roll3d6(), con = roll3d6(), cha  = roll3d6();
  const strMod = abilityBonus(str), dexMod = abilityBonus(dex), conMod = abilityBonus(con);
  const hp  = rollNPCHP(levelData.hitDice, conMod);
  const def = CLASS_DEFAULTS[classEntry.name] ?? { baseAC: 11, weapon: "Dagger", dmg: "1d4" };
  const ac  = def.baseAC + dexMod;
  const ab  = levelData.attackBonus;
  const dmgStr = strMod === 0 ? def.dmg : strMod > 0 ? `${def.dmg}+${strMod}` : `${def.dmg}${strMod}`;

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
  const strMod = abilityBonus(str), dexMod = abilityBonus(dex), conMod = abilityBonus(con);
  const hp  = rollNPCHP(levelData.hitDice, conMod);
  const def = CLASS_DEFAULTS[classEntry.name] ?? { baseAC: 11, weapon: "Dagger", dmg: "1d4" };
  const ac  = def.baseAC + dexMod;
  const ab  = levelData.attackBonus;
  const dmgStr = strMod === 0 ? def.dmg : strMod > 0 ? `${def.dmg}+${strMod}` : `${def.dmg}${strMod}`;
  const fmtBonus = n => n > 0 ? `+${n}` : n === 0 ? "—" : `${n}`;

  const combatTable = `| | |\n|:---|:---|\n` +
    `| HP | ${hp} |\n| AC | ${ac} |\n| Attack Bonus | +${ab} |\n| Weapon | ${def.weapon} (${dmgStr}) |`;

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
      .map((n, i) => n > 0 ? `L${i + 1}: ${n}` : null).filter(Boolean).join("  ");
    if (slotLabels) spellSection = `\n\n**Spell Slots:** ${slotLabels}`;
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
      skillSection = `\n\n#### Thief Skills\n\n| Skill | Chance |\n|:---|:---:|\n${rows}`;
    }
  }

  return `# ${classEntry.name} ${level}\n\n---\n\n${combatTable}\n\n#### Ability Scores\n\n${abilityTable}${saveSection}${spellSection}${skillSection}`;
}
