// Inline editable fields inside rendered notecard / notice bodies.
//
// Authors drop a sentinel into the markdown body:
//   <span data-field="quantity">5</span>
// After marked.parse() renders the body into a DOM element, call
// wireInlineFields(bodyEl, entry, opts) to swap each such span for a small
// <input>. Edits rewrite the matching span's inner text inside entry.body
// (the caller persists via its own onSave callback).
//
// Authoring rule: the value between <span data-field="..."> and </span> must
// be plain text — no nested HTML. Values typed by the user are HTML-escaped
// before being written back into the body to prevent script injection.

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Find the Nth `<span ...data-field="FIELD"...>...</span>` in `body` and
// return the [start, end) indexes of its inner text, or null if not found.
// Tolerates either quote style and arbitrary attribute order.
function findNthFieldRange(body, fieldName, index) {
  const field = escapeRegex(fieldName);
  const openRe = new RegExp(
    `<span\\b[^>]*\\bdata-field\\s*=\\s*(?:"${field}"|'${field}')[^>]*>`,
    "gi"
  );
  let m;
  let count = 0;
  while ((m = openRe.exec(body)) !== null) {
    if (count === index) {
      const start = m.index + m[0].length;
      const end = body.indexOf("</span>", start);
      if (end === -1) return null;
      return { start, end };
    }
    count++;
  }
  return null;
}

function rewriteField(entry, fieldName, index, newValue) {
  const range = findNthFieldRange(entry.body, fieldName, index);
  if (!range) return false;
  entry.body =
    entry.body.slice(0, range.start) +
    escapeHtml(newValue) +
    entry.body.slice(range.end);
  return true;
}

export function wireInlineFields(bodyEl, entry, opts = {}) {
  const { disabled = false, onFocus = () => {}, onSave = () => {} } = opts;

  const spans = bodyEl.querySelectorAll("span[data-field]");
  const counters = new Map();

  spans.forEach((span) => {
    const field = span.getAttribute("data-field");
    if (!field) return;
    const idx = counters.get(field) ?? 0;
    counters.set(field, idx + 1);

    const initial = span.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "inline-field";
    input.value = initial;
    input.dataset.field = field;
    input.dataset.index = String(idx);
    input.dataset.original = initial;
    input.size = Math.max(2, initial.length + 1);
    if (initial.trim() !== "" && Number.isFinite(Number(initial))) {
      input.inputMode = "decimal";
    }

    if (disabled) {
      input.disabled = true;
    } else {
      input.addEventListener("click", (e) => e.stopPropagation());
      input.addEventListener("focus", () => onFocus());
      input.addEventListener("change", () => {
        const newVal = input.value;
        if (newVal === input.dataset.original) return;
        if (rewriteField(entry, field, idx, newVal)) {
          input.dataset.original = newVal;
          const body = input.closest(".notecard-body");
          if (body) body.dataset.fullText = entry.body;
          onSave();
        }
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          input.blur();
        } else if (e.key === "Escape") {
          e.preventDefault();
          input.value = input.dataset.original;
          input.blur();
        }
      });
    }

    span.replaceWith(input);
  });
}
