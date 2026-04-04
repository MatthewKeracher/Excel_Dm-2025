// Generic Ruleset API Client
// Handles fetching and caching ruleset data from the backend.
// BFRPG-specific logic lives in src/rulesets/BFRPG/.

import { authHeaders } from "./auth.js";

let currentRuleset = "";
const cache = {};
let moduleCache = null;

export function setCurrentRuleset(name) {
  if (name !== currentRuleset) {
    currentRuleset = name ?? "";
    moduleCache = null;
    Object.keys(cache).forEach(k => delete cache[k]);
  }
}

export async function loadRulesetModule() {
  if (!currentRuleset) return null;
  if (moduleCache) return moduleCache;
  try {
    moduleCache = await import(`/src/rulesets/${currentRuleset}/index.js`);
    return moduleCache;
  } catch {
    return null;
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

