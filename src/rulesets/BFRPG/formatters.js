// BFRPG Format Helpers
// Converts structured BFRPG data objects into display strings and HTML blocks.

import { buildTreasureRows, rollHP, rollIndividualTreasure } from './treasure.js';

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
  let line = `**${m.name}** (HP: <span data-field="hp">${hp}</span>): AC ${m.ac}, Dmg ${m.damage}, MV ${m.movement}`;
  if (treasure) line += ` — ${treasure}`;
  return line;
}

export function formatMonsterTable(monsters) {
  const header = "| Name | AC | HD | Attacks | Damage | Movement | XP |";
  const sep    = "|:---|:---|:---|:---|:---|:---|:---|";
  const rows   = monsters.map(m =>
    `| ${m.name} | ${m.ac ?? ""} | ${m.hd ?? ""} | ${m.attacks ?? ""} | ${m.damage ?? ""} | ${m.movement ?? ""} | ${m.xp ?? ""} |`
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
  const header = "| Name | Range | Duration |";
  const sep    = "|:---|:---|:---|";
  const rows   = spells.map(s => `| ${s.name} | ${s.range ?? ""} | ${s.duration ?? ""} |`);
  return [header, sep, ...rows].join("\n");
}

// ── Item formatters ───────────────────────────────────────────────────────────

export function formatItemBlock(item) {
  const rows = [
    ["Cost",   item.cost   ? `${item.cost} gp`   : ""],
    ["Weight", item.weight ? `${item.weight} lb`  : ""],
    ["Damage", item.damage], ["AC", item.ac], ["Size", item.size],
  ].filter(([, v]) => v).map(([k, v]) => `| ${k} | ${v} |`).join("\n");
  const block = `# ${item.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}`;
  return item.description ? `${block}\n\n${item.description}` : block;
}

export function formatItemOneLiner(item) {
  return item.oneLiner || item.name;
}

export function formatItemTable(items) {
  const cols = [
    { key: "name",   label: "Name",   get: i => i.name   ?? "" },
    { key: "cost",   label: "Cost",   get: i => i.cost   ? `${i.cost} gp`  : "" },
    { key: "damage", label: "Damage", get: i => i.damage ?? "" },
    { key: "ac",     label: "AC",     get: i => i.ac     ?? "" },
    { key: "weight", label: "Weight", get: i => i.weight ? `${i.weight} lb` : "" },
    { key: "size",   label: "Size",   get: i => i.size   ?? "" },
  ].filter(c => items.some(i => c.get(i)));

  const header = "| " + cols.map(c => c.label).join(" | ") + " |";
  const sep    = "| " + cols.map(() => ":---").join(" | ") + " |";
  const rows   = items.map(i => "| " + cols.map(c => c.get(i)).join(" | ") + " |");
  return [header, sep, ...rows].join("\n");
}
