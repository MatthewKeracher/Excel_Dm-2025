# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

Excel_DM is a browser-based Dungeon Master planning tool. It's a **vanilla JavaScript single-page application** with no build step — open `index.html` in a browser and it runs.

## Running the App

Open `index.html` directly in a browser. No server, build step, or npm scripts are needed.

The only npm dependency is `marked` (markdown parser), which is also loaded via CDN in `index.html`. CodeMirror is loaded from CDN as well.

## Architecture

### State

All runtime state lives in `main.js`:
- `excelDM` — global `EntryManager` instance (the data store)
- `current` — the currently selected `Entry`
- `currentTab` — active category tab string
- `masterEdit` — boolean flag for demo/read-only mode

### Data Model (`classes.js`)

- **`Entry`** — represents one game object (location, NPC, quest, etc.). Has `name`, `type`, `content` (markdown), `categories` array, `parent`/`children` for hierarchy, and canvas `x`/`y` for map positioning.
- **`EntryManager`** — holds all entries; exposes `addEntry`, `findEntry`, `eraseEntry`, and methods to serialize/deserialize to JSON.

### Module Responsibilities

| File | Role |
|------|------|
| `src/main.js` | App init, global state, `reCurrent()` orchestrator |
| `src/classes.js` | `Entry` and `EntryManager` data classes |
| `src/left.js` | Renders note cards in the left sidebar; handles card click, delete, navigation |
| `src/right.js` | Canvas map — draws grid and draggable location labels |
| `src/buttons.js` | Header button handlers: New, Save, Load, Add, Demo; file I/O |
| `src/tabs.js` | Tab bar — switches `currentTab`, triggers re-render |
| `src/editor.js` | CodeMirror-based modal editor for entry markdown content |
| `src/filter.js` | Category filter UI and compiled filter state |
| `src/hotkeys.js` | Keyboard shortcuts (arrows, Tab, Escape, search) |
| `src/localStorage.js` | IndexedDB persistence (`excelDB` / `excelData` store) |

### Rendering Pattern

User action → update `excelDM` or `current` → call `reCurrent()` in `main.js` → `reCurrent()` calls `renderLeft()`, `renderRight()`, etc. to redraw all UI. Persistence happens via `saveData()` in `localStorage.js`.

### Data Files

- `data/Excel_DM.json` — blank campaign template loaded on "New"
- `data/Hommlet.json` — large demo campaign (~8.7MB)
- `data/BFRPG/` — reference data for monsters, spells, and items

### Entry Types

The seven tabs/types: `locations`, `people`, `quests`, `monsters`, `spells`, `items`, `misc`
