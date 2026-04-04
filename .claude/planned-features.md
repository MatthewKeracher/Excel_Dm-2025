# Planned Features

##


## Character Generation Improvements

Rnadomly gened chaarcters should have buffed prime requisite scores so fighter higher STR, for example. Scores are currently STR, DEX but could be shortened to just S, D (and CHA to CH). If modifier not 0 should show, for ex STR 14 (+2) or INT 8 (-1).

AC and Weapons could itneract with one liners for Weapons and Armour, and could work towards a randomly generated inventory with coins. Spells known could be figured out as well based on spell slots. 

remove #### Ability Scores and #### Saving Throws titles from full char sheet as table headers are self explanatory

What race data is being used?


## Items
starter packs

## Monsters
Update monsters.json with monster descriptions from oldData.js

## users like me, sa, should be viewer on all worlds created


## Homepage / Notice Board (empty state)

Show useful content in the main area when no world is open (no campaign loaded, left panel and map are empty).

### Open questions
- **Who can edit?** Admin only, any logged-in user, or static/hardcoded?
- **When does it show?** Only before a world is opened, or also when a campaign is open but has no entries?
- **Content type?** Markdown text (like notecards), or a designed landing page (logo, instructions, links)?

### Options

**A — Static/hardcoded panel** *(least effort)*
Detect `Array.isArray(current)` in `loadNoteCards` and render a fixed welcome div instead. Good for branding and instructions but not editable at runtime.

**B — Markdown notice stored server-side** *(recommended if editable)*
Add a `notices` table (or flat text file) with a `GET /api/notice` endpoint. Admin edits via a simple textarea; content renders like a notecard. Moderate effort, fully flexible.

**C — Special pinned Entry** *(zero backend work)*
Designate one Entry as the homepage. Reuses all existing notecard/editor machinery. Downside: the entry appears in the entry list when a world is open.

---

## Editor Snippet & Macro Library

### ✅ Phase 1 — Static snippets (complete)
- `📋` toggle button in editor toolbar
- Snippet panel floats to the right of the editor as a separate fixed element
- `src/snippets.js` — CRUD on personal localStorage library
- Click snippet → inserts at cursor in CodeMirror
- Inline add/edit/delete form
- Seeded defaults: Ability Score Table, HP/AC/Move, Boxed Text, Table Skeleton
- Excluded from global hotkey/search listener

### ✅ Phase 2 — Macro expressions (complete)
- `src/macroEngine.js` — safe `{{ }}` template renderer, no eval
- `{{roll(3d6)}}` — sum of dice (any XdY notation)
- `{{ran(min, max)}}` — random integer in range
- `{{pick("a","b","c")}}` — random choice from list
- Unrecognised expressions left as-is rather than erroring
- Default Ability Score Table upgraded to use `{{roll(3d6)}}` per stat
- Version migration: existing users' default snippets auto-upgraded, custom snippets preserved

### Phase 3 — `prompt()` expressions
Before inserting, collect `prompt(...)` values via a small inline form in the panel.
Useful for `{{prompt("NPC name")}}` in character sheet templates.

### Phase 4 — Campaign library
- `snippets TEXT` column on campaigns table (JSON array)
- Sync via existing PATCH/WS pipeline like `tabs`
- Panel shows two sections: "Mine" and "Campaign"

---

## Ruleset Reference Library

Allow campaigns to attach a game ruleset (BFRPG, OSE, 5e, etc.) and browse/insert monsters, spells, and items directly from the snippet panel. Excel_DM remains system-independent — rulesets are optional, pluggable, and per-campaign.

### Existing data (already available)
`data/BFRPG/` contains:
- **189 monsters** — full stat tables as markdown + description
- **69 spells** — range/duration/class/level + description
- **30 items** — stats + description

All three are in the same `{ title, type, category, body }` format as campaign entries — full stat block insertion is trivially `codeArea.replaceRange(entry.body, cursor)`.

### Architecture

**Rulesets are directories under `data/`**, each with a `manifest.json`:
```
data/
  BFRPG/
    manifest.json    ← { name, description, version, files: ["monsters","spells","items"] }
    monsters.json
    spells.json
    items.json
```
Adding a new system = adding a new folder. No backend code changes needed.

**New API endpoints:**
```
GET /api/rulesets                        — list available rulesets (reads data/ dirs)
GET /api/rulesets/{name}/{file}          — serve a ruleset data file
```

**Per-campaign ruleset attachment:**
- Add `ruleset TEXT` column to campaigns (nullable; JSON array for multi-system support later)
- Campaign settings UI gets a "Ruleset" dropdown populated from `GET /api/rulesets`
- Synced to all collaborators via the existing PATCH/WS pipeline

**Snippet panel — new "Rules" tab:**
```
[ Snippets | Rules ]
─────────────────────
  🔍 [search...]
  ▾ Monsters (189)
      Ant, Giant         [+] [≡]
      Basilisk           [+] [≡]
  ▾ Spells (69)
  ▾ Items (30)
```
- `[+]` inserts full stat block at cursor
- `[≡]` inserts a one-liner summary (see below)
- Search filters across all categories in real time

**One-liner format** (parsed from existing markdown tables):
```
**Ant, Giant** — HD 4, AC 17, Dmg 2d6, MV 60' *(XP 240)*
```

### Implementation phases

**✅ Phase A — Data serving + campaign attachment**
1. `ruleset TEXT` column added to campaigns table (migration in `db.go`)
2. `GET /api/rulesets` — scans `data/` for subdirectories with `manifest.json`
3. `GET /api/rulesets/{name}/{file}` — serves JSON file with path-traversal guard
4. Campaign settings: ruleset dropdown; saved via `PATCH /api/campaigns/{id}/settings`
5. `loadData()` in `localStorage.js` calls `setCurrentRuleset(data.ruleset)`

**✅ Phase B — Rules tab in snippet panel**
1. Tab bar in snippet panel: "Snippets" | "Rules" (Rules hidden when no ruleset set)
2. On "Rules" tab open: fetches monsters/spells/items, cached in memory per editor session
3. Collapsible sections (Monsters / Spells / Items) with search filter across all categories
4. `[+]` → inserts one-liner at cursor; `[≡]` → inserts full stat block
5. `[⊞]` on subsection heading → inserts entire group as a markdown table

**✅ Phase C — One-liner and block formatters**
`src/ruleset.js` — `formatMonsterBlock/OneLiner`, `formatSpellBlock/OneLiner`, `formatItemBlock/OneLiner`, plus `formatMonsterTable`, `formatSpellTable`, `formatItemTable`

**Phase D — Character generation** *(longer term)*
Generate a full character entry by class, race, and level using ruleset tables:
- Roll stats (uses existing `{{roll(3d6)}}` macro engine)
- Look up HP die by class, racial modifiers
- Calculate saves, THAC0/attack bonus, spell slots
- Insert as a formatted notecard body (people entry)
- Requires adding `classes.json`, `races.json` to each ruleset

### System independence notes
- Campaigns with no ruleset attached are unaffected — no UI change
- The "Rules" tab only appears if a ruleset is attached to the campaign
- A ruleset can be detached without affecting campaign data — entries already inserted stay as markdown text
- Future systems (OSE, 5e, Cairn, etc.) just need a `manifest.json` + data files in the right format
