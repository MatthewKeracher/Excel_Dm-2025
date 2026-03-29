import { authHeaders } from "./auth.js";

let currentRuleset = "";
const cache = {}; // { monsters: [...], spells: [...], items: [...] }

export function setCurrentRuleset(name) {
  if (name !== currentRuleset) {
    currentRuleset = name ?? "";
    // Clear cache when ruleset changes
    Object.keys(cache).forEach(k => delete cache[k]);
  }
}

export function getCurrentRuleset() {
  return currentRuleset;
}

export async function fetchRulesets() {
  const res = await fetch("/api/rulesets", { headers: authHeaders() });
  if (!res.ok) return [];
  return res.json();
}

export async function getRulesetData(category) {
  if (!currentRuleset) return [];
  if (cache[category]) return cache[category];
  try {
    const res = await fetch(`/api/rulesets/${currentRuleset}/${category}`, { headers: authHeaders() });
    if (!res.ok) return [];
    const data = await res.json();
    cache[category] = Array.isArray(data) ? data : [];
    return cache[category];
  } catch {
    return [];
  }
}

// Format a structured monster entry as a full markdown stat block
export function formatMonsterBlock(m) {
  const rows = [
    ["AC", m.ac], ["HD", m.hd], ["Attacks", m.attacks],
    ["Damage", m.damage], ["Movement", m.movement],
    ["Appearing", m.appearing], ["Save As", m.saveAs],
    ["Morale", m.morale], ["Treasure", m.treasure], ["XP", m.xp],
  ].filter(([, v]) => v).map(([k, v]) => `| ${k} | ${v} |`).join("\n");

  const block = `# ${m.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}`;
  return m.special ? `${block}\n\n${m.special}` : block;
}

// Format a one-liner from a structured monster entry
export function formatMonsterOneLiner(m) {
  return m.oneLiner || `**${m.name}**: AC ${m.ac}, HD ${m.hd}, Dmg ${m.damage}, MV ${m.movement}`;
}

// Format a structured spell entry as a full markdown block
export function formatSpellBlock(s) {
  const rows = [
    ["Class", s.class], ["Level", s.level],
    ["Range", s.range], ["Duration", s.duration],
  ].filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => `| ${k} | ${v} |`).join("\n");

  return `# ${s.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}\n\n${s.description}`;
}

// Format a one-liner from a structured spell entry
export function formatSpellOneLiner(s) {
  return s.oneLiner || `**${s.name}** (${s.class} L${s.level}, Range: ${s.range}, Duration: ${s.duration})`;
}

// Format a structured item entry as a full markdown block
export function formatItemBlock(item) {
  const rows = [
    ["Cost", item.cost ? `${item.cost} gp` : ""],
    ["Weight", item.weight ? `${item.weight} lb` : ""], ["Damage", item.damage],
    ["AC", item.ac], ["Size", item.size],
  ].filter(([, v]) => v).map(([k, v]) => `| ${k} | ${v} |`).join("\n");

  const block = `# ${item.name}\n\n---\n\n| Attribute | Value |\n|:---|:---|\n${rows}`;
  return item.description ? `${block}\n\n${item.description}` : block;
}

// Format a one-liner from a structured item entry
export function formatItemOneLiner(item) {
  return item.oneLiner || item.name;
}

// ── Table formatters (for an entire subcategory group) ────────────────────────

export function formatMonsterTable(monsters) {
  const header = "| Name | AC | HD | Attacks | Damage | Movement | XP |";
  const sep    = "|:---|:---|:---|:---|:---|:---|:---|";
  const rows   = monsters.map(m =>
    `| ${m.name} | ${m.ac ?? ""} | ${m.hd ?? ""} | ${m.attacks ?? ""} | ${m.damage ?? ""} | ${m.movement ?? ""} | ${m.xp ?? ""} |`
  );
  return [header, sep, ...rows].join("\n");
}

export function formatSpellTable(spells) {
  const header = "| Name | Range | Duration |";
  const sep    = "|:---|:---|:---|";
  const rows   = spells.map(s =>
    `| ${s.name} | ${s.range ?? ""} | ${s.duration ?? ""} |`
  );
  return [header, sep, ...rows].join("\n");
}

export function formatItemTable(items) {
  // Only include columns that have at least one non-empty value in this group
  const cols = [
    { key: "name",   label: "Name",   get: i => i.name ?? "" },
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
