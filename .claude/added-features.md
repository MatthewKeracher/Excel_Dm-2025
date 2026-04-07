# Added Features

Changelog of completed features, newest first.

---

## Homepage / Notice Board
Shared notice board shown when no campaign is open. Notices are markdown notecards (title, body, colour) stored in `home_notices` table. All logged-in users see the same notices. Per-user map poster stored in `users.home_poster`. New routes: `GET /api/home`, `PUT /api/home`. Frontend: `src/home.js`.

## Ruleset Reference Library (Phases A–C)
Campaigns can attach a game ruleset (BFRPG, etc.). New "Rules" tab in the snippet panel lets users browse and insert monsters, spells, and items. One-liner and full stat-block formatters in `src/ruleset.js`. Backend serves ruleset data files from `data/{Name}/`. Rulesets are plug-and-play directories with a `manifest.json`.

## Editor Snippet & Macro Library (Phases 1–2)
Personal snippet library in `localStorage` (`src/snippets.js`) with CRUD and seeded defaults. Macro engine (`src/macroEngine.js`) renders safe `{{ }}` templates: `roll(XdY)`, `ran(min,max)`, `pick(...)`. Snippets panel floats beside the CodeMirror editor.

## Map Settings Modal
Modal for hex/square/none grid selection and user thumbnail/username display on the map.

## Real-time Collaboration
WebSocket sync (`src/ws.js`) with delta patches, version tracking, exponential backoff reconnect, and conflict handling. Sync status badge (`src/syncState.js`).

## Invite Links
Single-use invite tokens (`campaign_invites` table). Admins create links; recipients accept via `/invite/{token}` route. `GET /api/invites/{token}` is public; `POST /api/invites/{token}/accept` requires auth.

## Campaign Members & Roles
`campaign_members` table with `admin`/`editor`/`viewer` roles. Member management UI in the campaign picker. Public campaigns grant editor access to all logged-in users.

## BFRPG Ruleset Data
189 monsters, 69 spells, 30 items in `data/BFRPG/` with structured JSON and one-liner fields.
