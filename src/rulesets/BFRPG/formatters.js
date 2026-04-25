// BFRPG Format Helpers
// Converts structured BFRPG data objects into display strings and HTML blocks.

import { buildTreasureRows, rollHP, rollIndividualTreasure, rollGroupTreasure, rollDice } from './treasure.js';

// Parse a monster.appearing string into { wild, lair } dice notations.
// Handles: "Wild/Lair X" (same), "Wild X Lair Y", "Wild X" only, "Lair Y" only,
// or a bare leading number/dice when no Wild/Lair qualifiers are present.
const DICE_RE = /\d+(?:d\d+(?:[+-]\d+)?(?:x\d+)?)?/i;
export function parseAppearing(str) {
  if (!str) return { wild: null, lair: null };
  const both = str.match(new RegExp(`Wild\\/Lair\\s+(${DICE_RE.source})`, 'i'));
  if (both) return { wild: both[1], lair: both[1] };
  const w = str.match(new RegExp(`Wild\\s+(${DICE_RE.source})`, 'i'));
  const l = str.match(new RegExp(`Lair\\s+(${DICE_RE.source})`, 'i'));
  let wild = w ? w[1] : null;
  let lair = l ? l[1] : null;
  if (!wild && !lair) {
    const lead = str.match(new RegExp(`^(${DICE_RE.source})`));
    if (lead) wild = lead[1];
  }
  return { wild, lair };
}

function rollCount(dice) {
  if (!dice) return 0;
  if (/^\d+$/.test(dice)) return Number(dice);
  return rollDice(dice) || 1;
}

export function formatMonsterEncounterTable(m, mode, spells = null, monsters = null) {
  const { wild, lair } = parseAppearing(m.appearing);
  const dice = mode === "lair" ? lair : wild;
  if (!dice) return "";
  const label = mode === "lair" ? "Lair" : "Wild";
  const count = rollCount(dice);

  // Resolve "See X" treasure cross-references once.
  let treasureCode = m.treasureIndividual;
  const seeMatch = treasureCode && treasureCode.match(/^see\s+(.+)$/i);
  if (seeMatch && monsters?.length) {
    const ref = monsters.find(x => x.name.toLowerCase() === seeMatch[1].toLowerCase());
    if (ref) treasureCode = ref.treasureIndividual;
  }

  // Pluralise the monster name for the header — naive trailing-s.
  const plural = count === 1 ? m.name : (m.name.endsWith("s") ? m.name : `${m.name}s`);

  // BFRPG module style: shared stats inline, then a flat run of "<HP> ☐☐☐☐☐"
  // tally widgets — one per individual. Each tally is a persistent inline
  // field (data-field="hp-tally") so ticks survive reload.
  const sharedBits = [
    m.ac       ? `AC ${m.ac}`           : "",
    m.hd       ? `HD ${m.hd}`           : "",
    m.attacks  ? `#At ${m.attacks}`     : "",
    m.damage   ? `Dam ${m.damage}`      : "",
    m.movement ? `Mv ${m.movement}`     : "",
    m.saveAs   ? `Sv ${m.saveAs}`       : "",
    m.morale   ? `Ml ${m.morale}`       : "",
    m.xp       ? `XP ${m.xp} ea`        : "",
  ].filter(Boolean).join(", ");
  const header = `**${count} ${plural}** (${label} ${dice}): ${sharedBits}`;

  const clusters = [];
  for (let i = 0; i < count; i++) {
    const hp = rollHP(m.hd);
    clusters.push(`<div class="hp-tally-row">${hp} <span data-field="hp-tally" data-max="${hp}">0</span></div>`);
  }

  // Single-line HTML block so marked treats it as raw HTML and doesn't try to
  // interpret the inner newlines as paragraphs. CSS flows the clusters into
  // two columns next to a leading "HP" label, matching the BFRPG module layout.
  const tallyBlock =
    `<div class="hp-tally-block"><span class="hp-tally-label">HP</span>` +
    `<div class="hp-tally-clusters">${clusters.join("")}</div></div>`;

  const groupTreasure = rollGroupTreasure(treasureCode, count, spells);
  let out = `${header}\n\n${tallyBlock}`;
  if (groupTreasure) out += `\n\n*Treasure:* ${groupTreasure}`;
  return out;
}

// ── Monster formatters ────────────────────────────────────────────────────────

export function formatMonsterBlock(m, monsters = null) {
  // Roll HP once at generation; the span lets the DM track current HP in-play.
  const hp = rollHP(m.hd);
  const statRows = [
    ["HP", `<span data-field="hp">${hp}</span>`],
    ["AC", m.ac], ["HD", m.hd], ["Attacks", m.attacks],
    ["Damage", m.damage], ["Movement", m.movement],
    ["Appearing", m.appearing], ["Save As", m.saveAs],
    ["Morale", m.morale], ["XP", m.xp],
  ].filter(([, v]) => v)
   .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`)
   .join('');

  const treasureRows = buildTreasureRows(m, monsters);
  let html = `<h2>${m.name}</h2><hr><table class="monster-stat-block"><tbody>${statRows}${treasureRows}</tbody></table>`;
  if (m.special)     html += `\n\n<p>${m.special}</p>`;
  if (m.description) html += `\n\n<p>${m.description}</p>`;
  return html;
}

export function formatMonsterOneLiner(m, spells = null, monsters = null) {
  if (m.oneLiner) return m.oneLiner;

  const hp = rollHP(m.hd);

  // Resolve "See X" cross-references
  let treasureCode = m.treasureIndividual;
  const seeMatch = treasureCode && treasureCode.match(/^see\s+(.+)$/i);
  if (seeMatch && monsters?.length) {
    const ref = monsters.find(x => x.name.toLowerCase() === seeMatch[1].toLowerCase());
    if (ref) treasureCode = ref.treasureIndividual;
  }

  const treasure = rollIndividualTreasure(treasureCode, spells);
  let line = `**${m.name}** (HP: <span data-field="hp">${hp}</span>): AC ${m.ac}, Att ${m.attacks}, Dmg ${m.damage}, MV ${m.movement}, XP ${m.xp}`;
  if (treasure) line += ` — ${treasure}`;
  return line;
}

export function formatMonsterTable(monsters) {
  const header = "| Qty | Name | AC | HD | Attacks | Damage | Movement | XP |";
  const sep    = "|:---|:---|:---|:---|:---|:---|:---|:---|";
  const rows   = monsters.map(m =>
    `| <span data-field="qty">1</span> | ${m.name} | ${m.ac ?? ""} | ${m.hd ?? ""} | ${m.attacks ?? ""} | ${m.damage ?? ""} | ${m.movement ?? ""} | ${m.xp ?? ""} |`
  );
  return [header, sep, ...rows].join("\n");
}

// ── Spell formatters ──────────────────────────────────────────────────────────

export function formatSpellBlock(s) {
  const rows = [
    ["Class", s.class], ["Level", s.level],
    ["Range", s.range], ["Duration", s.duration],
  ].filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => `| ${k} | ${v} |`).join("\n");
  return `# ${s.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}\n\n${s.description}`;
}

export function formatSpellOneLiner(s) {
  return s.oneLiner || `**${s.name}** (${s.class} L${s.level}, Range: ${s.range}, Duration: ${s.duration})`;
}

export function formatSpellTable(spells) {
  const header = "| Qty | Name | Range | Duration |";
  const sep    = "|:---|:---|:---|:---|";
  const rows   = spells.map(s => `| <span data-field="qty">1</span> | ${s.name} | ${s.range ?? ""} | ${s.duration ?? ""} |`);
  return [header, sep, ...rows].join("\n");
}

// ── Item formatters ───────────────────────────────────────────────────────────

function formatPackContentsTable(item, rulesCache) {
  const allItems = rulesCache?.items ?? [];
  const lookup = new Map(allItems.map(i => [i.name.toLowerCase(), i]));
  const rows = (item.contents ?? []).map(c => {
    const found  = lookup.get((c.name || "").toLowerCase());
    const cost   = found?.cost   ? `${found.cost} gp`  : "";
    const weight = found?.weight ? `${found.weight} lb` : "";
    return `| <span data-field="qty">${c.qty ?? 1}</span> | ${c.name} | ${cost} | ${weight} |`;
  });
  return [
    "| Qty | Name | Cost | Weight |",
    "|:---|:---|:---|:---|",
    ...rows,
  ].join("\n");
}

export function formatItemBlock(item, rulesCache) {
  if (item.category === "packs" && item.contents?.length) {
    return `# ${item.name}\n\n---\n\n${formatPackContentsTable(item, rulesCache)}`;
  }
  const rows = [
    ["Cost",   item.cost   ? `${item.cost} gp`   : ""],
    ["Weight", item.weight ? `${item.weight} lb`  : ""],
    ["Damage", item.damage], ["AC", item.ac], ["Size", item.size],
  ].filter(([, v]) => v).map(([k, v]) => `| ${k} | ${v} |`).join("\n");
  const block = `# ${item.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}`;
  return item.description ? `${block}\n\n${item.description}` : block;
}

export function formatItemOneLiner(item, rulesCache) {
  if (item.category === "packs" && item.contents?.length) {
    return `**${item.name}**\n\n${formatPackContentsTable(item, rulesCache)}`;
  }
  return item.oneLiner || item.name;
}

export function formatItemTable(items) {
  const cols = [
    { key: "qty",    label: "Qty",    get: () => `<span data-field="qty">1</span>` },
    { key: "name",   label: "Name",   get: i => i.name   ?? "" },
    { key: "cost",   label: "Cost",   get: i => i.cost   ? `${i.cost} gp`  : "" },
    { key: "damage", label: "Damage", get: i => i.damage ?? "" },
    { key: "ac",     label: "AC",     get: i => i.ac     ?? "" },
    { key: "weight", label: "Weight", get: i => i.weight ? `${i.weight} lb` : "" },
    { key: "size",   label: "Size",   get: i => i.size   ?? "" },
  ].filter(c => c.key === "qty" || items.some(i => c.get(i)));

  const header = "| " + cols.map(c => c.label).join(" | ") + " |";
  const sep    = "| " + cols.map(() => ":---").join(" | ") + " |";
  const rows   = items.map(i => "| " + cols.map(c => c.get(i)).join(" | ") + " |");
  return [header, sep, ...rows].join("\n");
}
