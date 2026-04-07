# Planned Features

## Character Generation

The NPC generator lives in `src/rulesets/BFRPG/npc.js`. `generateNPCBlock()` already rolls all 6 stats, HP (with CON modifier), AC (with DEX modifier), attack bonus, saving throws, spell slots, and thief skills from `classes.json`. The phases below layer improvements on top of this.

### Phase 1 — Output polish *(no new data files)*

Changes to `generateNPCBlock()` in `npc.js` only.

- **Remove section headers** — strip `#### Ability Scores` and `#### Saving Throws` from the output; table headers are self-explanatory.
- **Modifier display** — in the ability score table, show the bonus column only when non-zero (blank or `—` for 0).
- **Prime requisite buffing** — after rolling all 6 stats, if the prime requisite score is below 13, reroll it until ≥ 13 (or swap highest applicable roll). `classes.json` already has `primeRequisite` per class.

### Phase 2 — Equipment from items.json *(uses existing data)*

Replace the hardcoded `CLASS_DEFAULTS` AC/weapon map with actual item selection from `items.json`.

- Look up starting armour by class (Fighter/Cleric → chain or plate; Thief → leather; Magic-User → none). Pick AC from the matched item.
- Pick a starting weapon by class from the `weapon` category in `items.json`.
- Generate starting gold (BFRPG: 3d6 × 10 gp) and list remaining coins after purchasing gear.
- **Spells known** — for spell-casting classes, list 1 random spell per available level-1 slot, drawn from `spells.json` filtered by `class`. Format as a bullet list below Spell Slots.

### Phase 3 — Races *(needs new `races.json`)*

Add `data/BFRPG/races.json` with entries for Dwarf, Elf, Gnome, Half-Elf, Halfling, Half-Orc, Human. Each entry:

```json
{
  "name": "Dwarf",
  "statMods": { "CON": 1, "CHA": -1 },
  "allowedClasses": ["Fighter", "Cleric", "Thief"],
  "movement": "20'",
  "notes": "Darkvision 60', +4 save vs magic, detect stonework"
}
```

- Apply `statMods` after rolling (clamp 3–18).
- Show race on the character title line: `# Dwarf Fighter 3`.
- Append race notes as a short bullet list at the bottom of the block.

## Items

Starter packs.

## Monsters

Update `monsters.json` with monster descriptions from `oldData.js`.

## Users

Users like `me`, `sa` should be viewer on all worlds created.

## Editor Snippets — Phase 3: `prompt()` expressions

Before inserting, collect `prompt(...)` values via a small inline form in the panel. Useful for `{{prompt("NPC name")}}` in character sheet templates.

## Editor Snippets — Phase 4: Campaign library

- `snippets TEXT` column on campaigns table (JSON array)
- Sync via existing PATCH/WS pipeline like `tabs`
- Panel shows two sections: "Mine" and "Campaign"

## Ruleset — Phase D: Character generation

Generate a full character entry by class, race, and level using ruleset tables:
- Roll stats (uses existing `{{roll(3d6)}}` macro engine)
- Look up HP die by class, racial modifiers
- Calculate saves, THAC0/attack bonus, spell slots
- Insert as a formatted notecard body (people entry)
- Requires adding `classes.json`, `races.json` to each ruleset
