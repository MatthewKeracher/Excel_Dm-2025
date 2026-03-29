/**
 * Renders a macro template by evaluating all {{ }} expressions.
 * Unrecognised expressions are left as-is.
 *
 * Supported:
 *   {{roll(3d6)}}                          — sum of dice
 *   {{ran(1, 18)}}                         — random integer in range (inclusive)
 *   {{pick("a","b","c")}}                  — random equal-weight choice from list
 *   {{wtable("Item A:25|Item B:10|...")}}  — weighted random pick (item:weight pairs, | separated)
 */
export function render(template) {
  return template.replace(/\{\{(.+?)\}\}/g, (original, expr) => {
    try {
      return String(evaluate(expr.trim()));
    } catch {
      return original; // leave unrecognised expressions intact
    }
  });
}

function evaluate(expr) {
  const m = expr.match(/^(\w+)\((.*)\)$/s);
  if (!m) throw new Error("not a function call");
  const fn      = m[1];
  const argsRaw = m[2].trim();

  switch (fn) {
    case "roll":   return rollDice(argsRaw);
    case "ran":    return ranInt(argsRaw);
    case "pick":   return pickRandom(argsRaw);
    case "wtable": return weightedPick(argsRaw);
    default:       throw new Error(`unknown function: ${fn}`);
  }
}

function rollDice(notation) {
  const m = notation.match(/^(\d+)d(\d+)$/i);
  if (!m) throw new Error(`invalid dice notation: ${notation}`);
  const count = parseInt(m[1], 10);
  const sides = parseInt(m[2], 10);
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}

function ranInt(argsRaw) {
  const parts = argsRaw.split(",").map(s => parseInt(s.trim(), 10));
  if (parts.length !== 2 || parts.some(isNaN)) {
    throw new Error("ran() requires two numbers: ran(min, max)");
  }
  const [min, max] = parts;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(argsRaw) {
  const matches = [...argsRaw.matchAll(/"([^"]*)"/g)].map(m => m[1]);
  if (matches.length === 0) throw new Error("pick() requires quoted strings");
  return matches[Math.floor(Math.random() * matches.length)];
}

// wtable("Item A:25|Item B:10|Item C:65") — weighted random pick
// Weight is the number after the last colon. Items may contain colons in their names.
function weightedPick(argsRaw) {
  const str = argsRaw.trim().replace(/^["']|["']$/g, "");
  const pairs = str.split("|").map(p => {
    const colon = p.lastIndexOf(":");
    if (colon === -1) return { item: p.trim(), weight: 1 };
    return { item: p.substring(0, colon).trim(), weight: parseInt(p.substring(colon + 1)) || 1 };
  });
  const total = pairs.reduce((sum, p) => sum + p.weight, 0);
  let r = Math.floor(Math.random() * total);
  for (const { item, weight } of pairs) {
    r -= weight;
    if (r < 0) return item;
  }
  return pairs[pairs.length - 1].item;
}
