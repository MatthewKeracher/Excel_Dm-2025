# Planned Features

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

## Editor Visual Rework

Affects `src/editor.js` and `css/editor.css`. Functionality unchanged.

### 1. Colour scheme
- Background: `#000`
- Border/accent: `#115926` (logo green)
- Toolbar: `#115926` background, cream/white text
- Cursor: `#d8d83c`
- Review all CodeMirror syntax highlight colours for contrast on black (`cm-tag`, `cm-quote` most at risk)

### 2. Toolbar new buttons
Add: Italic (`*text*`), Heading (`## ` at line start), Inline code (`` `code` ``), Horizontal rule (`---`), Link (`[text](url)`)
Add visual separator between formatting group and Save/Exit group
Replace mixed emoji/symbol icons with consistent text labels

### 3. Toolbar layout
Split into two rows: title + Save/Exit on top row; all formatting buttons on second row

### 4. cm-tag contrast
`<p>`, `<br>`, `<div>` etc. — shift from magenta to `#d8d83c` yellow to stay on-theme and readable on black

---

## Editor Snippet & Macro Library

A collapsible panel to the right of the CodeMirror editor. Holds two kinds of entries:

- **Snippet** — static markdown inserted as-is (boxed text div, table skeleton, etc.)
- **Macro** — a markdown template with `{{ }}` expression placeholders evaluated at insert time (ability score table with rolled stats, random name picker, etc.)

```
┌─────────────────────┬──────────────────┐
│  Toolbar         📋 │  Snippets     ×  │
├─────────────────────┤──────────────────│
│                     │  [Ability Table] │
│   CodeMirror        │  [HP / AC Block] │
│                     │  [Boxed Text]    │
│                     │  + New           │
└─────────────────────┴──────────────────┘
```

### Template syntax

`{{ }}` placeholders in otherwise normal markdown, evaluated at click time:

```markdown
| Ability | Score |
|:-------:|:-----:|
| Str     | {{roll(3d6)}} |
| Dex     | {{roll(3d6)}} |
| Int     | {{roll(3d6)}} |
| Wis     | {{roll(3d6)}} |
| Con     | {{roll(3d6)}} |
| Cha     | {{roll(3d6)}} |
```

### Expression whitelist (no eval — custom parser)

| Expression | Result |
|---|---|
| `roll(3d6)` | sum of dice |
| `ran(min, max)` | integer in range |
| `pick("a","b","c")` | random choice from list |
| `prompt("label")` | collects user input before inserting (Phase 3) |

### Storage: hybrid approach

- **Personal library** — `localStorage` key `exceldm:snippets`. Per-user, works across all campaigns.
- **Campaign library** — future: `snippets JSON` column on campaigns, synced via WS like `tabs`. Shared between collaborators.
- Start with personal only; add "Share to campaign" action in Phase 4.

Each entry:
```js
{ id: "uuid", name: "Ability Table", template: "…", tags: [] }
```

### Seeded defaults (ship on first load)
- Ability score table with `{{roll(3d6)}}` per stat
- Simple stat line (`| HP | AC | Move |`)
- Boxed text div (`<div class="boxed-text">…</div>`)
- Basic markdown table skeleton

### New files
- `src/snippets.js` — CRUD on personal library (localStorage)
- `src/macroEngine.js` — `render(template) → string`; scans `{{ }}`, evaluates against whitelist, returns completed markdown

### Implementation phases

**Phase 1 — Static snippets** (no expressions)
- `📋` toggle button in `toolbarTop`
- Panel DOM built inside `editor.js`, flex column, same `#34514e` theme
- `snippets.js` loads/saves from localStorage
- Click → `codeArea.replaceRange(snippet.template, codeArea.getCursor())`

**Phase 2 — Expression evaluation**
- Add `macroEngine.js` with `roll()`, `ran()`, `pick()`
- Panel click now calls `macroEngine.render(template)` before inserting
- Template editor in panel shows `{{ }}` syntax hint

**Phase 3 — `prompt()` expressions**
- Before inserting, collect `prompt(...)` values via a small inline form in the panel
- Useful for `{{prompt("NPC name")}}` in character sheet templates

**Phase 4 — Campaign library**
- `snippets TEXT` column on campaigns table (JSON array)
- Sync via existing PATCH/WS pipeline like `tabs`
- Panel shows two sections: "Mine" and "Campaign"
