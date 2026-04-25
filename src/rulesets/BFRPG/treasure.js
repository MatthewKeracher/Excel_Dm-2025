// BFRPG Treasure Tables & Generation
// All dice rolling, treasure rolling, and item generation for BFRPG.

// ── Treasure display table (A–V) ─────────────────────────────────────────────

export const TREASURE_TABLE = {
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

// ── Treasure HTML display helpers (used by formatters.js) ────────────────────

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

export function expandTreasureCode(code, label) {
  if (!code) return '';
  let rows = '';
  if (label) rows += `<tr class="treasure-section"><td colspan="2"><i>${label}</i></td></tr>`;

  if (/^none$/i.test(code.trim())) return rows + `<tr class="treasure-row"><td class="treasure-item" colspan="2">None</td></tr>`;

  if (/^special$/i.test(code.trim()) || /^see\s/i.test(code.trim()))
    return rows + `<tr class="treasure-row"><td class="treasure-item" colspan="2">${code}</td></tr>`;

  if (/^u or special$/i.test(code.trim()))
    return rows + expandTreasureLetter('U')
      + `<tr class="treasure-row"><td class="treasure-item" colspan="2"><i>or Special</i></td></tr>`;

  const plusGoldMatch = code.match(/^([A-V])\s*(?:plus|\+)\s*([\dd×xX]+)\s*gp/i);
  if (plusGoldMatch)
    return rows + expandTreasureLetter(plusGoldMatch[1])
      + `<tr class="treasure-row"><td class="treasure-item">Gold (bonus)</td><td>Always &middot; ${plusGoldMatch[2]}</td></tr>`;

  const letters = code.match(/\b[A-V]\b/gi) || [];
  if (letters.length > 0) return rows + expandLetterGroup(letters, null);

  return rows + `<tr class="treasure-row"><td class="treasure-item" colspan="2">${code}</td></tr>`;
}

export function resolveTreasureCode(code, monsters) {
  if (!code) return { code, resolvedFrom: null };
  const seeMatch = code.match(/^see\s+(.+)$/i);
  if (seeMatch && monsters?.length) {
    const ref = monsters.find(x => x.name.toLowerCase() === seeMatch[1].toLowerCase());
    if (ref?.treasureIndividual) return { code: ref.treasureIndividual, resolvedFrom: seeMatch[1] };
  }
  return { code, resolvedFrom: null };
}

export function buildTreasureRows(m, monsters = null) {
  const { code: ind, resolvedFrom: indRef } = resolveTreasureCode(m.treasureIndividual, monsters);
  const lair = m.treasureLair;
  if (!ind && !lair) return '';

  const hasLair = lair && lair.trim();
  const indLabel = indRef ? `Individual — ${ind} (as ${indRef})` : `Individual — ${ind}`;

  if (hasLair) {
    return expandTreasureCode(ind,  indLabel)
         + expandTreasureCode(lair, `In Lair — ${lair}`);
  }
  return expandTreasureCode(ind, indRef ? `Treasure — ${ind} (as ${indRef})` : `Treasure — ${ind}`);
}

// ── Dice helpers ─────────────────────────────────────────────────────────────

export function rollDice(diceStr) {
  if (!diceStr) return 0;
  const multMatch = diceStr.match(/^(\d+)d(\d+)x(\d+)$/i);
  if (multMatch) {
    const [, n, s, mult] = multMatch.map(Number);
    let total = 0;
    for (let i = 0; i < n; i++) total += Math.floor(Math.random() * s) + 1;
    return total * mult;
  }
  const match = diceStr.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) return 0;
  const n = Number(match[1]), s = Number(match[2]), bonus = Number(match[3] || 0);
  let total = 0;
  for (let i = 0; i < n; i++) total += Math.floor(Math.random() * s) + 1;
  return Math.max(1, total + bonus);
}

export function rollHP(hdStr) {
  if (!hdStr) return 1;
  const s = hdStr.trim();
  if (/^1\s*(hit\s*point|hp)s?$/i.test(s)) return 1;
  const litMatch = s.match(/^(\d+d\d+(?:[+-]\d+)?)/i);
  if (litMatch) return rollDice(litMatch[1]);
  if (/^½/.test(s)) return rollDice('1d4');
  const numMatch = s.match(/^(\d+)/);
  const hdNum = numMatch ? Number(numMatch[1]) : 1;
  const cleaned = s.replace(/\*/g, '').replace(/\(.*?\)/g, '').trim();
  const bonusMatch = cleaned.match(/^\d+([+-]\d+)/);
  const bonus = bonusMatch ? Number(bonusMatch[1]) : 0;
  return Math.max(1, rollDice(`${hdNum}d8`) + bonus);
}

function rollTable(table) {
  const r = Math.floor(Math.random() * 100) + 1;
  return table.find(([lo, hi]) => r >= lo && r <= hi);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Individual treasure roller ────────────────────────────────────────────────

export function rollIndividualTreasure(code, spells = null) {
  if (!code) return '';
  const trimmed = code.trim();
  if (/^none$/i.test(trimmed)) return '';
  if (/^special$/i.test(trimmed) || /^see\b/i.test(trimmed)) return trimmed;

  const letters = [...trimmed.matchAll(/\b([A-V])\b/gi)].map(m => m[1].toUpperCase());
  if (letters.length === 0) return trimmed;

  const totals = { Copper: 0, Silver: 0, Electrum: 0, Gold: 0, Platinum: 0, Gems: 0, Jewelry: 0, 'Magic Items': 0 };
  for (const letter of letters) {
    const table = TREASURE_TABLE[letter];
    if (!table) continue;
    for (const [type, { pct, dice }] of Object.entries(table)) {
      if (!dice) continue;
      if (pct === '*' || Math.random() * 100 < pct) totals[type] += rollDice(dice);
    }
  }

  const parts = [];
  if (totals.Copper)   parts.push(`${totals.Copper.toLocaleString()}cp`);
  if (totals.Silver)   parts.push(`${totals.Silver.toLocaleString()}sp`);
  if (totals.Electrum) parts.push(`${totals.Electrum.toLocaleString()}ep`);
  if (totals.Gold)     parts.push(`${totals.Gold.toLocaleString()}gp`);
  if (totals.Platinum) parts.push(`${totals.Platinum.toLocaleString()}pp`);
  if (totals.Gems)     parts.push(...Array.from({ length: totals.Gems },    () => generateGem()));
  if (totals.Jewelry)  parts.push(...Array.from({ length: totals.Jewelry }, () => generateJewelry()));
  if (totals['Magic Items']) {
    parts.push(...Array.from({ length: totals['Magic Items'] }, () => generateMagicItem('any', spells)));
  }
  return parts.join(', ');
}

// Roll individual-treasure for a group of `count` monsters and sum the
// results into a single one-line string. Cash totals are summed; gems,
// jewelry, and magic items are listed individually.
export function rollGroupTreasure(code, count, spells = null) {
  if (!code || count <= 0) return '';
  const trimmed = code.trim();
  if (/^none$/i.test(trimmed)) return '';
  if (/^special$/i.test(trimmed) || /^see\b/i.test(trimmed)) return trimmed;

  const letters = [...trimmed.matchAll(/\b([A-V])\b/gi)].map(m => m[1].toUpperCase());
  if (letters.length === 0) return trimmed;

  const totals = { Copper: 0, Silver: 0, Electrum: 0, Gold: 0, Platinum: 0, Gems: 0, Jewelry: 0, 'Magic Items': 0 };
  for (let i = 0; i < count; i++) {
    for (const letter of letters) {
      const table = TREASURE_TABLE[letter];
      if (!table) continue;
      for (const [type, { pct, dice }] of Object.entries(table)) {
        if (!dice) continue;
        if (pct === '*' || Math.random() * 100 < pct) totals[type] += rollDice(dice);
      }
    }
  }

  const parts = [];
  if (totals.Copper)   parts.push(`${totals.Copper.toLocaleString()}cp`);
  if (totals.Silver)   parts.push(`${totals.Silver.toLocaleString()}sp`);
  if (totals.Electrum) parts.push(`${totals.Electrum.toLocaleString()}ep`);
  if (totals.Gold)     parts.push(`${totals.Gold.toLocaleString()}gp`);
  if (totals.Platinum) parts.push(`${totals.Platinum.toLocaleString()}pp`);
  if (totals.Gems)     parts.push(...Array.from({ length: totals.Gems },    () => generateGem()));
  if (totals.Jewelry)  parts.push(...Array.from({ length: totals.Jewelry }, () => generateJewelry()));
  if (totals['Magic Items']) {
    parts.push(...Array.from({ length: totals['Magic Items'] }, () => generateMagicItem('any', spells)));
  }
  return parts.join(', ');
}

// ── Gem generation ───────────────────────────────────────────────────────────

const GEMS_VALUE_TABLE = [
  { type: 'Ornamental', baseValue: 10,   die: '1d10' },
  { type: 'Semiprecious', baseValue: 50, die: '1d8'  },
  { type: 'Fancy',      baseValue: 100,  die: '1d6'  },
  { type: 'Precious',   baseValue: 500,  die: '1d4'  },
  { type: 'Gem',        baseValue: 1000, die: '1d2'  },
  { type: 'Jewel',      baseValue: 5000, die: '1'    },
];

const GEM_TYPE_TABLE = [
  [1,5,'Alexandrite'],[6,12,'Amethyst'],[13,20,'Aventurine'],[21,30,'Chlorastrolite'],
  [31,40,'Diamond'],[41,43,'Emerald'],[44,48,'Fire Opal'],[49,57,'Fluorospar'],
  [58,63,'Garnet'],[64,68,'Heliotrope'],[69,78,'Malachite'],[79,88,'Rhodonite'],
  [89,91,'Ruby'],[92,95,'Sapphire'],[96,100,'Topaz'],
];

const GEM_VALUE_ADJ = [
  [2,2,0.5],[3,3,0.5],[4,4,0.75],[5,9,1],[10,10,1.5],[11,11,2],[12,12,2],
];

function rollGemData() {
  const r = Math.floor(Math.random() * 100) + 1;
  const thresholds = [20, 45, 75, 95, 100];
  const tierIdx = thresholds.findIndex(t => r <= t);
  const tier = GEMS_VALUE_TABLE[Math.min(tierIdx, GEMS_VALUE_TABLE.length - 1)];
  const gemRow = rollTable(GEM_TYPE_TABLE);
  const name = gemRow ? gemRow[2] : 'Gem';
  const adj2d6 = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2;
  const adjRow = GEM_VALUE_ADJ.find(([lo, hi]) => adj2d6 >= lo && adj2d6 <= hi);
  const mult = adjRow ? adjRow[2] : 1;
  const value = Math.round(tier.baseValue * mult);
  return { name, tier: tier.type, value };
}

export function generateGem() {
  const { name, tier, value } = rollGemData();
  return `${name} (${tier}, ${value.toLocaleString()}gp)`;
}

// ── Jewelry generation ───────────────────────────────────────────────────────

const JEWELRY_TABLE = [
  [1,6,'Anklet'],[7,12,'Belt'],[13,14,'Bowl'],[15,21,'Bracelet'],[22,27,'Brooch'],
  [28,32,'Buckle'],[33,37,'Chain'],[38,40,'Choker'],[41,42,'Circlet'],[43,47,'Clasp'],
  [48,51,'Comb'],[52,52,'Crown'],[53,55,'Cup'],[56,62,'Earring'],[63,65,'Flagon'],
  [66,68,'Goblet'],[69,73,'Knife'],[74,77,'Letter Opener'],[78,80,'Locket'],
  [81,82,'Medal'],[83,89,'Necklace'],[90,90,'Plate'],[91,95,'Pin'],[96,96,'Scepter'],
  [97,99,'Statuette'],[100,100,'Tiara'],
];

const JEWELRY_METALS = [
  { maxValue: 400,      metals: ['Copper', 'Brass', 'Bronze'] },
  { maxValue: 800,      metals: ['Silver', 'Bronze'] },
  { maxValue: 1300,     metals: ['Gold', 'Silver'] },
  { maxValue: 1600,     metals: ['Gold', 'Electrum'] },
  { maxValue: Infinity, metals: ['Platinum', 'Gold', 'Mithral'] },
];

function pickJewelryMetal(value) {
  const bracket = JEWELRY_METALS.find(b => value <= b.maxValue);
  const pool = bracket ? bracket.metals : ['Gold'];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generateJewelry() {
  const typeRow = rollTable(JEWELRY_TABLE);
  const type = typeRow ? typeRow[2] : 'Jewelry';
  const baseValue = rollDice('2d8') * 100;
  const metal = pickJewelryMetal(baseValue);
  if (Math.random() < 0.5) {
    const gem = rollGemData();
    const total = baseValue + gem.value;
    return `${metal} ${gem.name} ${type} (${total.toLocaleString()}gp — ${baseValue.toLocaleString()}gp base + ${gem.value.toLocaleString()}gp ${gem.name})`;
  }
  return `${metal} ${type} (${baseValue.toLocaleString()}gp)`;
}

// ── Magic item generation ────────────────────────────────────────────────────

const MAGIC_ITEM_TYPE = {
  any:           [[1,25,'Weapon'],[26,35,'Armor'],[36,55,'Potion'],[56,85,'Scroll'],[86,90,'Wand/Staff/Rod'],[91,97,'Miscellaneous'],[98,100,'Rare']],
  weaponOrArmor: [[1,70,'Weapon'],[71,100,'Armor']],
  anyExcWeapons: [[1,12,'Armor'],[13,40,'Potion'],[41,79,'Scroll'],[80,86,'Wand/Staff/Rod'],[87,96,'Miscellaneous'],[97,100,'Rare']],
};

const WEAPON_TYPES = [
  [1,2,'Great Axe'],[3,9,'Battle Axe'],[10,11,'Hand Axe'],[12,19,'Shortbow'],
  [20,27,'Shortbow Arrow'],[28,31,'Longbow'],[32,35,'Longbow Arrow'],
  [36,43,'Light Crossbow Quarrel'],[44,47,'Heavy Crossbow Quarrel'],
  [48,59,'Dagger'],[60,65,'Shortsword'],[66,79,'Longsword'],
  [80,81,'Scimitar'],[82,83,'Two-Handed Sword'],[84,86,'Warhammer'],
  [87,94,'Mace'],[95,95,'Maul'],[96,96,'Pole Arm'],[97,97,'Sling Bullet'],[98,100,'Spear'],
];

const RANGED_WEAPONS = new Set(['Shortbow','Shortbow Arrow','Longbow','Longbow Arrow','Light Crossbow Quarrel','Heavy Crossbow Quarrel','Sling Bullet']);

const MELEE_WEAPON_BONUS = [
  [1,40,'+1'],[41,50,'+2'],[51,55,'+3'],[56,57,'+4'],[58,58,'+5'],
  [59,75,'special_enemy_1'],[76,85,'special_enemy_2'],[86,95,'special_ability'],[96,100,'cursed'],
];

const RANGED_WEAPON_BONUS = [
  [1,46,'+1'],[47,58,'+2'],[59,64,'+3'],
  [65,82,'special_enemy_1'],[83,94,'special_enemy_2'],[95,98,'special_ability'],[99,100,'cursed'],
];

const SPECIAL_ENEMIES = ['Dragons','Enchanted','Lycanthropes','Regenerators','Spell Users','Undead'];
const SPECIAL_ABILITY_LIST = ['Casts Light on Command','Charm Person','Drains Energy','Flames on Command','Locate Objects','Wishes'];

const ARMOR_TYPES = [
  [1,9,'Leather Armor'],[10,28,'Chain Mail'],[29,43,'Plate Mail'],[44,100,'Shield'],
];

const ARMOR_BONUS = [
  [1,50,'+1'],[51,80,'+2'],[81,90,'+3'],[91,95,'cursed_roll'],[96,100,'cursed_ac11'],
];

const POTIONS = [
  [1,3,'Clairaudience'],[4,6,'Clairvoyance'],[7,8,'Cold Resistance'],[9,11,'Control Animal'],
  [12,13,'Control Dragon'],[14,16,'Control Giant'],[17,19,'Control Human'],[20,22,'Control Plant'],
  [23,25,'Control Undead'],[26,32,'Delusion'],[33,35,'Diminution'],[36,39,'Fire Resistance'],
  [40,43,'Flying'],[44,47,'Gaseous Form'],[48,51,'Giant Strength'],[52,55,'Growth'],
  [56,59,'Healing'],[60,63,'Heroism'],[64,68,'Invisibility'],[69,72,'Invulnerability'],
  [73,76,'Levitation'],[77,80,'Longevity'],[81,84,'Mind Reading'],[85,86,'Poison'],
  [87,89,'Polymorph Self'],[90,97,'Speed'],[98,100,'Treasure Finding'],
];

const SCROLLS = [
  [1,3,'Cleric Spell Scroll (1 Spell)'],[4,6,'Cleric Spell Scroll (2 Spells)'],
  [7,8,'Cleric Spell Scroll (3 Spells)'],[9,9,'Cleric Spell Scroll (4 Spells)'],
  [10,15,'Magic-User Spell Scroll (1 Spell)'],[16,20,'Magic-User Spell Scroll (2 Spells)'],
  [21,25,'Magic-User Spell Scroll (3 Spells)'],[26,29,'Magic-User Spell Scroll (4 Spells)'],
  [30,32,'Magic-User Spell Scroll (5 Spells)'],[33,34,'Magic-User Spell Scroll (6 Spells)'],
  [35,35,'Magic-User Spell Scroll (7 Spells)'],[36,40,'Cursed Scroll'],
  [41,46,'Scroll of Protection from Elementals'],[47,56,'Scroll of Protection from Lycanthropes'],
  [57,61,'Scroll of Protection from Magic'],[62,75,'Scroll of Protection from Undead'],
  [76,85,'Map to Treasure Type A'],[86,89,'Map to Treasure Type E'],
  [90,92,'Map to Treasure Type G'],[93,100,'Map to 1d4 Magic Items'],
];

const WANDS = [
  [1,8,'Rod of Cancellation'],[9,13,'Snake Staff'],[14,17,'Staff of Commanding'],
  [18,28,'Staff of Healing'],[29,30,'Staff of Power'],[31,34,'Staff of Striking'],
  [35,35,'Staff of Wizardry'],[36,40,'Wand of Cold'],[41,45,'Wand of Enemy Detection'],
  [46,50,'Wand of Fear'],[51,55,'Wand of Fireballs'],[56,60,'Wand of Illusion'],
  [61,65,'Wand of Lightning Bolts'],[66,73,'Wand of Magic Detection'],
  [74,79,'Wand of Paralysis'],[80,84,'Wand of Polymorph'],
  [85,92,'Wand of Secret Door Detection'],[93,100,'Wand of Trap Detection'],
];

const MISC_SUBTABLE1 = [
  [1,1,'Blasting','G'],[2,5,'Blending','F'],[6,13,'Cold Resistance','F'],
  [14,17,'Comprehension','E'],[18,22,'Control Animal','C'],[23,29,'Control Human','C'],
  [30,35,'Control Plant','C'],[36,37,'Courage','G'],[38,40,'Deception','F'],
  [41,52,'Delusion','A'],[53,55,'Djinni Summoning','C'],[56,56,'Doom','G'],
  [57,67,'Fire Resistance','F'],[68,80,'Invisibility','F'],[81,85,'Levitation','B'],
  [86,95,'Mind Reading','C'],[96,97,'Panic','G'],[98,100,'Penetrating Vision','D'],
];

const MISC_SUBTABLE2 = [
  [1,7,'Protection +1','F'],[8,10,'Protection +2','F'],[11,11,'Protection +3','F'],
  [12,14,'Protection from Energy Drain','F'],[15,20,'Protection from Scrying','F'],
  [21,23,'Regeneration','C'],[24,29,'Scrying','H'],[30,32,'Scrying, Superior','H'],
  [33,39,'Speed','B'],[40,42,'Spell Storing','C'],[43,50,'Spell Turning','F'],
  [51,69,'Stealth','B'],[70,72,'Telekinesis','C'],[73,74,'Telepathy','C'],
  [75,76,'Teleportation','C'],[77,78,'True Seeing','D'],[79,88,'Water Walking','B'],
  [89,99,'Weakness','C'],[100,100,'Wishes','C'],
];

const FORM_TABLE = {
  A: [[1,2,'Bell (or Chime)'],[3,5,'Belt or Girdle'],[6,13,'Boots'],[14,15,'Bowl'],
      [16,28,'Cloak'],[29,31,'Crystal Ball or Orb'],[32,33,'Drums'],[34,38,'Helm'],
      [39,43,'Horn'],[44,46,'Lens'],[47,49,'Mirror'],[50,67,'Pendant'],[68,100,'Ring']],
  B: [[1,25,'Boots'],[26,50,'Pendant'],[51,100,'Ring']],
  C: [[1,40,'Pendant'],[41,100,'Ring']],
  D: [[1,17,'Lens'],[18,21,'Mirror'],[22,50,'Pendant'],[51,100,'Ring']],
  E: [[1,40,'Helm'],[41,80,'Pendant'],[81,100,'Ring']],
  F: [[1,7,'Belt or Girdle'],[8,38,'Cloak'],[39,50,'Pendant'],[51,100,'Ring']],
  G: [[1,17,'Bell (or Chime)'],[18,50,'Drums'],[51,100,'Horn']],
  H: [[1,17,'Bowl'],[18,67,'Crystal Ball or Orb'],[68,100,'Mirror']],
};

const RARE_ITEMS = [
  [1,5,'Bag of Devouring'],[6,20,'Bag of Holding'],[21,32,'Boots of Traveling and Leaping'],
  [33,47,'Broom of Flying'],[48,57,'Device of Summoning Elementals'],[58,59,'Efreeti Bottle'],
  [60,64,'Flying Carpet'],[65,81,'Gauntlets of Ogre Power'],[82,86,'Girdle of Giant Strength'],
  [87,88,'Mirror of Imprisonment'],[89,100,'Rope of Climbing'],
];

function generateWeapon() {
  const wRow = rollTable(WEAPON_TYPES);
  const weapon = wRow ? wRow[2] : 'Sword';
  const isRanged = RANGED_WEAPONS.has(weapon);
  const bonusTable = isRanged ? RANGED_WEAPON_BONUS : MELEE_WEAPON_BONUS;
  const bRow = rollTable(bonusTable);
  const bonusCode = bRow ? bRow[2] : '+1';
  if (bonusCode === 'cursed') return `${weapon} -${Math.floor(Math.random() * 2) + 1} (Cursed)`;
  if (bonusCode === 'special_ability') {
    const base = isRanged ? '+1' : ['+1','+2','+3'][Math.floor(Math.random()*3)];
    return `${weapon} ${base}, ${pickRandom(SPECIAL_ABILITY_LIST)}`;
  }
  if (bonusCode.startsWith('special_enemy')) {
    return `${weapon} +1, ${['+1','+1','+3'][Math.floor(Math.random()*3)]} vs. ${pickRandom(SPECIAL_ENEMIES)}`;
  }
  return `${weapon} ${bonusCode}`;
}

function generateArmor() {
  const aRow = rollTable(ARMOR_TYPES);
  const armor = aRow ? aRow[2] : 'Chain Mail';
  const bRow = rollTable(ARMOR_BONUS);
  const bonusCode = bRow ? bRow[2] : '+1';
  if (bonusCode === 'cursed_ac11') return `${armor} (Cursed, AC 11)`;
  if (bonusCode === 'cursed_roll') return `${armor} -${Math.floor(Math.random() * 3) + 1} (Cursed)`;
  return `${armor} ${bonusCode}`;
}

function generateMiscItem() {
  const sub = Math.random() < 0.57 ? MISC_SUBTABLE1 : MISC_SUBTABLE2;
  const row = rollTable(sub);
  if (!row) return 'Miscellaneous Item';
  const [,,effect, formKey] = row;
  const formRows = FORM_TABLE[formKey];
  const formRow = formRows ? rollTable(formRows) : null;
  return `${formRow ? formRow[2] : 'Ring'} of ${effect}`;
}

function generateScroll(spells) {
  const r = rollTable(SCROLLS);
  if (!r) return 'Scroll';
  const label = r[2];
  const classMatch = label.match(/^(Cleric|Magic-User)/);
  const countMatch = label.match(/\((\d+) Spell/);
  if (!classMatch || !countMatch || !spells?.length) return label;
  const cls = classMatch[1];
  const dataClass = cls === 'Magic-User' ? 'Mage' : cls;
  const pool = spells.filter(s => s.class === dataClass);
  if (pool.length === 0) return label;
  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, Number(countMatch[1])).map(s => s.name);
  return `${cls} Spell Scroll: ${picked.join(', ')}`;
}

export function generateSpellScroll(cls, spells) {
  const label = cls === 'Mage' ? 'Magic-User' : cls;
  const pool = (spells ?? []).filter(s => s.class === cls);
  if (pool.length === 0) return `${label} Spell Scroll`;
  const count = Math.ceil(Math.random() * (cls === 'Mage' ? 6 : 4));
  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, count).map(s => s.name);
  return `${label} Spell Scroll: ${picked.join(', ')}`;
}

export function generatePotion() {
  const r = rollTable(POTIONS);
  return `Potion of ${r ? r[2] : 'Healing'}`;
}

export function generateMagicItem(context = 'any', spells = null) {
  const typeTable = MAGIC_ITEM_TYPE[context] ?? MAGIC_ITEM_TYPE.any;
  const typeRow = rollTable(typeTable);
  const type = typeRow ? typeRow[2] : 'Potion';
  switch (type) {
    case 'Weapon':        return generateWeapon();
    case 'Armor':         return generateArmor();
    case 'Potion':        return `Potion of ${(rollTable(POTIONS) ?? [,,'Healing'])[2]}`;
    case 'Scroll':        return generateScroll(spells);
    case 'Wand/Staff/Rod': { const r = rollTable(WANDS); return r ? r[2] : 'Wand'; }
    case 'Miscellaneous': return generateMiscItem();
    case 'Rare':          { const r = rollTable(RARE_ITEMS); return r ? r[2] : 'Rare Item'; }
    default:              return generateMiscItem();
  }
}
