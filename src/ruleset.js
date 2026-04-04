// Generic Ruleset API Client
// Handles fetching and caching ruleset data from the backend.
// BFRPG-specific logic lives in src/rulesets/BFRPG/.

import { authHeaders } from "./auth.js";

let currentRuleset = "";
const cache = {};

export function setCurrentRuleset(name) {
  if (name !== currentRuleset) {
    currentRuleset = name ?? "";
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

// ── Temporary re-exports ──────────────────────────────────────────────────────
// editor.js currently imports everything from this file.
// These re-exports will be removed in Phase 4 when editor.js is refactored
// to dynamically import the ruleset module directly.

export {
  formatMonsterBlock, formatMonsterOneLiner, formatMonsterTable,
  formatSpellBlock, formatSpellOneLiner, formatSpellTable,
  formatItemBlock, formatItemOneLiner, formatItemTable,
} from "./rulesets/BFRPG/formatters.js";

export {
  generateNPC, generateNPCBlock,
} from "./rulesets/BFRPG/npc.js";

export {
  generateGem, generateJewelry, generateMagicItem, generatePotion, generateSpellScroll,
} from "./rulesets/BFRPG/treasure.js";
