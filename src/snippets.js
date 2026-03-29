const STORAGE_KEY   = "exceldm:snippets";
const VERSION_KEY   = "exceldm:snippets-version";
const DEFAULTS_VERSION = "4";

const DEFAULTS = [
  {
    id: "default-ability-table",
    name: "Ability Score Table",
    template: `| Ability | Score |\n|:-------:|:-----:|\n| Str     | {{roll(3d6)}} |\n| Dex     | {{roll(3d6)}} |\n| Int     | {{roll(3d6)}} |\n| Wis     | {{roll(3d6)}} |\n| Con     | {{roll(3d6)}} |\n| Cha     | {{roll(3d6)}} |`,
  },
  {
    id: "default-stat-line",
    name: "HP / AC / Move",
    template: `| HP | AC | Move |\n|:--:|:--:|:----:|\n|    |    |      |`,
  },
  {
    id: "default-boxed-text",
    name: "Boxed Text",
    template: `<div class="boxed-text">\n\n</div>`,
  },
  {
    id: "default-table",
    name: "Table Skeleton",
    template: `| Header 1 | Header 2 | Header 3 |\n|:---------|:---------|:---------|\n| Data 1   | Data 2   | Data 3   |`,
  },

  // ── Treasure Types (BFRPG) ───────────────────────────────────────────────

  { id: "default-treasure-A", name: "Treasure — Type A",
    template: `# Treasure Type A\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 50% | 5d6 |\n| Silver | 60% | 5d6 |\n| Electrum | 40% | 5d4 |\n| Gold | 70% | 10d6 |\n| Platinum | 50% | 1d10 |\n| Gems | 50% | 6d6 |\n| Jewelry | 50% | 6d6 |\n| Magic Items | 50% | 6d6 |` },

  { id: "default-treasure-B", name: "Treasure — Type B",
    template: `# Treasure Type B\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 75% | 5d10 |\n| Silver | 50% | 5d6 |\n| Electrum | 50% | 5d4 |\n| Gold | 50% | 3d6 |\n| Gems | 25% | 1d6 |\n| Jewelry | 50% | 6d6 |\n| Magic Items | 25% | 1d6 |` },

  { id: "default-treasure-C", name: "Treasure — Type C",
    template: `# Treasure Type C\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 60% | 6d6 |\n| Silver | 60% | 5d4 |\n| Electrum | 30% | 2d6 |\n| Gems | 25% | 1d4 |\n| Jewelry | 50% | 1d4 |\n| Magic Items | 15% | 1d2 |` },

  { id: "default-treasure-D", name: "Treasure — Type D",
    template: `# Treasure Type D\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 30% | 4d6 |\n| Silver | 45% | 6d6 |\n| Gold | 90% | 5d8 |\n| Gems | 30% | 1d8 |\n| Jewelry | 30% | 1d8 |\n| Magic Items | 20% | 1d2 |\n\n*Magic Items also include 1 Potion.*` },

  { id: "default-treasure-E", name: "Treasure — Type E",
    template: `# Treasure Type E\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 30% | 2d8 |\n| Silver | 60% | 6d10 |\n| Electrum | 50% | 3d8 |\n| Gold | 50% | 4d10 |\n| Gems | 10% | 1d10 |\n| Jewelry | 10% | 1d10 |\n| Magic Items | 30% | 1d4 |\n\n*Magic Items also include 1 Scroll.*` },

  { id: "default-treasure-F", name: "Treasure — Type F",
    template: `# Treasure Type F\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Silver | 40% | 3d8 |\n| Electrum | 50% | 4d8 |\n| Gold | 85% | 6d10 |\n| Platinum | 70% | 2d8 |\n| Gems | 20% | 2d12 |\n| Jewelry | 10% | 1d12 |\n| Magic Items | 35% | 1d4 |\n| Special | 35% | 1d4 |\n\n*No magic weapons. Also +1 Potion and +1 Scroll.*` },

  { id: "default-treasure-G", name: "Treasure — Type G",
    template: `# Treasure Type G\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Gold | 90% | 4d6×10 |\n| Platinum | 75% | 5d8 |\n| Gems | 25% | 3d6 |\n| Jewelry | 25% | 1d10 |\n| Magic Items | 50% | 1d4 |\n\n*Magic Items also include 1 Scroll.*` },

  { id: "default-treasure-H", name: "Treasure — Type H",
    template: `# Treasure Type H\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | Always | 8d10 |\n| Silver | Always | 6d10×10 |\n| Electrum | Always | 3d10×10 |\n| Gold | Always | 5d8×10 |\n| Platinum | Always | 9d8 |\n| Gems | 25% | 3d6 |\n| Jewelry | 25% | 1d10 |\n| Magic Items | 25% | 1d10 |\n| Special | 50% | 1d4 |\n\n*Special also includes +1 Scroll.*` },

  { id: "default-treasure-I", name: "Treasure — Type I",
    template: `# Treasure Type I\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Platinum | 80% | 3d10 |\n| Gems | 50% | 2d6 |\n| Jewelry | 50% | 6d6 |\n| Magic Items | 15% | 1 |` },

  { id: "default-treasure-J", name: "Treasure — Type J",
    template: `# Treasure Type J\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 45% | 3d8 |\n| Silver | 45% | 1d8 |` },

  { id: "default-treasure-K", name: "Treasure — Type K",
    template: `# Treasure Type K\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Silver | 90% | 2d10 |\n| Electrum | 35% | 1d8 |` },

  { id: "default-treasure-L", name: "Treasure — Type L",
    template: `# Treasure Type L\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Gems | 50% | 1d4 |` },

  { id: "default-treasure-M", name: "Treasure — Type M",
    template: `# Treasure Type M\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Gold | 90% | 4d10 |\n| Platinum | 90% | 2d8×10 |\n| Gems | 55% | 5d4 |\n| Jewelry | 45% | 2d6 |` },

  { id: "default-treasure-N", name: "Treasure — Type N",
    template: `# Treasure Type N\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Magic Items | 40% | 2d4 |\n\n*Potions only.*` },

  { id: "default-treasure-O", name: "Treasure — Type O",
    template: `# Treasure Type O\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Magic Items | 50% | 1d4 |\n\n*Scrolls only.*` },

  { id: "default-treasure-P", name: "Treasure — Type P",
    template: `# Treasure Type P\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 100% | 3d8 |` },

  { id: "default-treasure-Q", name: "Treasure — Type Q",
    template: `# Treasure Type Q\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Silver | 100% | 3d6 |` },

  { id: "default-treasure-R", name: "Treasure — Type R",
    template: `# Treasure Type R\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Electrum | 100% | 2d6 |` },

  { id: "default-treasure-S", name: "Treasure — Type S",
    template: `# Treasure Type S\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Gold | 100% | 2d4 |` },

  { id: "default-treasure-T", name: "Treasure — Type T",
    template: `# Treasure Type T\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Platinum | 100% | 1d6 |` },

  { id: "default-treasure-U", name: "Treasure — Type U",
    template: `# Treasure Type U\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Copper | 50% | 1d20 |\n| Silver | 50% | 1d20 |\n| Gold | 25% | 1d20 |\n| Gems | 5% | 1d4 |\n| Jewelry | 5% | 1d4 |\n| Magic Items | 2% | 1 |` },

  { id: "default-treasure-V", name: "Treasure — Type V",
    template: `# Treasure Type V\n\n---\n\n| Type | Chance | Roll |\n|:---|:---:|:---:|\n| Silver | 25% | 1d20 |\n| Electrum | 25% | 1d20 |\n| Gold | 50% | 1d20 |\n| Platinum | 25% | 1d20 |\n| Gems | 10% | 1d4 |\n| Jewelry | 10% | 1d4 |\n| Magic Items | 5% | 1 |` },

  // ── Magic Item Generation (BFRPG) ─────────────────────────────────────────

  {
    id: "default-magic-item-type",
    name: "Magic Item — Type",
    template: `**Magic Item Type**: {{wtable("Weapon:25|Armour:10|Potion:20|Scroll:30|Wand/Staff/Rod:5|Miscellaneous:7|Rare:3")}}`,
  },
  {
    id: "default-magic-potion",
    name: "Magic Item — Potion",
    template: `**Potion of {{wtable("Clairaudience:3|Clairvoyance:3|Cold Resistance:2|Control Animal:3|Control Dragon:2|Control Giant:3|Control Human:3|Control Plant:3|Control Undead:3|Delusion:7|Diminution:3|Fire Resistance:4|Flying:4|Gaseous Form:4|Giant Strength:4|Growth:4|Healing:4|Heroism:4|Invisibility:5|Invulnerability:4|Levitation:4|Longevity:4|Mind Reading:4|Poison:2|Polymorph Self:3|Speed:8|Treasure Finding:3")}}**`,
  },
  {
    id: "default-magic-scroll",
    name: "Magic Item — Scroll",
    template: `**{{wtable("Cleric Spell Scroll (1 Spell):3|Cleric Spell Scroll (2 Spells):3|Cleric Spell Scroll (3 Spells):2|Cleric Spell Scroll (4 Spells):1|Magic-User Spell Scroll (1 Spell):6|Magic-User Spell Scroll (2 Spells):5|Magic-User Spell Scroll (3 Spells):5|Magic-User Spell Scroll (4 Spells):4|Magic-User Spell Scroll (5 Spells):3|Magic-User Spell Scroll (6 Spells):2|Magic-User Spell Scroll (7 Spells):1|Cursed Scroll:5|Scroll of Protection from Elementals:6|Scroll of Protection from Lycanthropes:10|Scroll of Protection from Magic:5|Scroll of Protection from Undead:14|Map to Treasure Type A:10|Map to Treasure Type E:4|Map to Treasure Type G:3|Map to 1d4 Magic Items:8")}}**`,
  },
  {
    id: "default-magic-wand",
    name: "Magic Item — Wand/Staff/Rod",
    template: `**{{wtable("Rod of Cancellation:8|Snake Staff:5|Staff of Commanding:4|Staff of Healing:11|Staff of Power:2|Staff of Striking:4|Staff of Wizardry:1|Wand of Cold:5|Wand of Enemy Detection:5|Wand of Fear:5|Wand of Fireballs:5|Wand of Illusion:5|Wand of Lightning Bolts:5|Wand of Magic Detection:8|Wand of Paralysis:6|Wand of Polymorph:5|Wand of Secret Door Detection:8|Wand of Trap Detection:8")}}**`,
  },
  {
    id: "default-magic-armour",
    name: "Magic Item — Armour",
    template: `**{{wtable("Leather Armour:9|Chain Mail:19|Plate Mail:15|Shield:57")}} {{wtable("+1:50|+2:30|+3:10|Cursed -1:2|Cursed -2:2|Cursed -3:1|Cursed AC 11:5")}}**`,
  },
  {
    id: "default-magic-weapon-melee",
    name: "Magic Item — Melee Weapon",
    template: `**{{wtable("Great Axe:2|Battle Axe:7|Hand Axe:2|Dagger:12|Shortsword:6|Longsword:14|Scimitar:2|Two-Handed Sword:2|Warhammer:3|Mace:8|Maul:1|Pole Arm:1|Spear:3")}} {{wtable("+1:40|+2:10|+3:5|+4:2|+5:1|+1 vs. Special Enemy:9|+2 vs. Special Enemy:9|+3 vs. Special Enemy:9|+1 with Special Ability:5|+2 with Special Ability:5|Cursed -1:2|Cursed -2:2|Cursed -3:1")}}**`,
  },
  {
    id: "default-magic-weapon-ranged",
    name: "Magic Item — Ranged Weapon",
    template: `**{{wtable("Shortbow:8|Shortbow Arrow:8|Longbow:4|Longbow Arrow:4|Light Quarrel:8|Heavy Quarrel:4|Sling Bullet:1")}} {{wtable("+1:22|+2:22|+3:20|+1 vs. Special Enemy:10|+2 vs. Special Enemy:10|+3 vs. Special Enemy:10|Cursed -1:2")}}**`,
  },
  {
    id: "default-magic-special-enemy",
    name: "Magic Item — Special Enemy",
    template: `{{pick("Dragons","Enchanted","Lycanthropes","Regenerators","Spell Users","Undead")}}`,
  },
  {
    id: "default-magic-special-ability",
    name: "Magic Item — Special Ability",
    template: `{{pick("Casts Light on Command","Charm Person","Drains Energy","Flames on Command","Locate Objects","Wishes")}}`,
  },
  {
    id: "default-magic-misc",
    name: "Magic Item — Miscellaneous",
    template: `**{{wtable("Blasting:1|Blending:4|Cold Resistance:5|Comprehension:2|Control Animal:3|Control Human:4|Control Plant:3|Courage:1|Deception:2|Delusion:7|Djinni Summoning:2|Doom:7|Fire Resistance:7|Invisibility:3|Levitation:6|Mind Reading:1|Panic:2|Protection +1:3|Protection +2:1|Protection from Energy Drain:1|Protection from Scrying:3|Regeneration:1|Scrying:3|Scrying Superior:1|Speed:4|Spell Storing:1|Spell Turning:3|Stealth:8|Telekinesis:1|Teleportation:1|True Seeing:1|Water Walking:4|Weakness:5|Wishes:1")}} of {{wtable("Ring:50|Pendant:30|Cloak:20|Boots:15|Belt or Girdle:8|Helm:7|Crystal Ball or Orb:5|Mirror:4|Bowl:3|Horn:6|Drums:5|Bell:4|Lens:3")}}**`,
  },
  {
    id: "default-magic-gem",
    name: "Treasure — Gem",
    template: `**{{wtable("Alexandrite:5|Amethyst:7|Aventurine:8|Chlorastrolite:10|Diamond:10|Emerald:3|Fire Opal:5|Fluorospar:9|Garnet:6|Heliotrope:5|Malachite:10|Rhodonite:10|Ruby:3|Sapphire:4|Topaz:5")}}** ({{wtable("Ornamental — 1d10×10gp:1|Semiprecious — 1d8×50gp:1|Fancy — 1d6×100gp:1|Precious — 1d4×500gp:1|Gem — 1d2×1000gp:1|Jewel — 5000gp:1")}})`,
  },
  {
    id: "default-magic-jewelry",
    name: "Treasure — Jewelry",
    template: `**{{wtable("Anklet:6|Belt:6|Bowl:2|Bracelet:7|Brooch:6|Buckle:5|Chain:5|Choker:3|Circlet:2|Clasp:5|Comb:4|Crown:1|Cup:3|Earring:7|Flagon:3|Goblet:3|Knife:5|Letter Opener:4|Locket:3|Medal:2|Necklace:7|Plate:1|Pin:5|Scepter:1|Statuette:3|Tiara:1")}}** set with {{wtable("Alexandrite:5|Amethyst:7|Aventurine:8|Chlorastrolite:10|Diamond:10|Emerald:3|Fire Opal:5|Fluorospar:9|Garnet:6|Heliotrope:5|Malachite:10|Rhodonite:10|Ruby:3|Sapphire:4|Topaz:5")}}`,
  },
];

export function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      let snippets = JSON.parse(raw);
      // Migrate built-in defaults when version is stale, preserving custom snippets
      if (localStorage.getItem(VERSION_KEY) !== DEFAULTS_VERSION) {
        const custom = snippets.filter(s => !s.id.startsWith("default-"));
        snippets = [...DEFAULTS, ...custom];
        saveSnippets(snippets);
        localStorage.setItem(VERSION_KEY, DEFAULTS_VERSION);
      }
      return snippets;
    }
  } catch {}
  saveSnippets(DEFAULTS);
  localStorage.setItem(VERSION_KEY, DEFAULTS_VERSION);
  return [...DEFAULTS];
}

function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function addSnippet(name, template) {
  const snippets = loadSnippets();
  const id = (crypto.randomUUID?.() ?? Date.now().toString(36));
  snippets.push({ id, name, template });
  saveSnippets(snippets);
  return snippets;
}

export function updateSnippet(id, name, template) {
  const snippets = loadSnippets().map(s => s.id === id ? { ...s, name, template } : s);
  saveSnippets(snippets);
  return snippets;
}

export function deleteSnippet(id) {
  const snippets = loadSnippets().filter(s => s.id !== id);
  saveSnippets(snippets);
  return snippets;
}
