const MAX_ENTRIES = 50;
const entries = [];

export function syncLog(type, detail = "") {
  entries.push({
    time: new Date().toISOString().substring(11, 23),
    type,
    detail: String(detail),
  });
  if (entries.length > MAX_ENTRIES) entries.shift();
}

window.__syncLog = () => console.table(entries);
