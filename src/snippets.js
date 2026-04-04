const STORAGE_KEY   = "exceldm:snippets";
const VERSION_KEY   = "exceldm:snippets-version";
const DEFAULTS_VERSION = "5";

const DEFAULTS = [
  {
    id: "default-ability-table",
    name: "Ability Score Table",
    template: `| Ability | Score |\n|:-------:|:-----:|\n| Str     | {{roll(3d6)}} |\n| Dex     | {{roll(3d6)}} |\n| Int     | {{roll(3d6)}} |\n| Wis     | {{roll(3d6)}} |\n| Con     | {{roll(3d6)}} |\n| Cha     | {{roll(3d6)}} |`,
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
    if (raw) {
      let snippets = JSON.parse(raw);
      // Migrate built-in defaults when version is stale, preserving custom snippets
      if (localStorage.getItem(VERSION_KEY) !== DEFAULTS_VERSION) {
        const custom = snippets.filter(s => !s.id.startsWith("default-"));
        snippets = [...DEFAULTS, ...custom];
        saveSnippets(snippets);
        localStorage.setItem(VERSION_KEY, DEFAULTS_VERSION);
      }
      return snippets;
    }
  } catch {}
  saveSnippets(DEFAULTS);
  localStorage.setItem(VERSION_KEY, DEFAULTS_VERSION);
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
