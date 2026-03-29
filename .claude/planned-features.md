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
