const STORAGE_KEY = "exceldm:snippets";

const DEFAULTS = [
  {
    id: "default-ability-table",
    name: "Ability Score Table",
    template: `| Ability | Score |\n|:-------:|:-----:|\n| Str     |       |\n| Dex     |       |\n| Int     |       |\n| Wis     |       |\n| Con     |       |\n| Cha     |       |`,
  },
  {
    id: "default-stat-line",
    name: "HP / AC / Move",
    template: `| HP | AC | Move |\n|:--:|:--:|:----:|\n|    |    |      |`,
  },
  {
    id: "default-boxed-text",
    name: "Boxed Text",
    template: `<div class="boxed-text">\n\n</div>`,
  },
  {
    id: "default-table",
    name: "Table Skeleton",
    template: `| Header 1 | Header 2 | Header 3 |\n|:---------|:---------|:---------|\n| Data 1   | Data 2   | Data 3   |`,
  },
];

export function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  saveSnippets(DEFAULTS);
  return [...DEFAULTS];
}

function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function addSnippet(name, template) {
  const snippets = loadSnippets();
  const id = (crypto.randomUUID?.() ?? Date.now().toString(36));
  snippets.push({ id, name, template });
  saveSnippets(snippets);
  return snippets;
}

export function updateSnippet(id, name, template) {
  const snippets = loadSnippets().map(s => s.id === id ? { ...s, name, template } : s);
  saveSnippets(snippets);
  return snippets;
}

export function deleteSnippet(id) {
  const snippets = loadSnippets().filter(s => s.id !== id);
  saveSnippets(snippets);
  return snippets;
}
