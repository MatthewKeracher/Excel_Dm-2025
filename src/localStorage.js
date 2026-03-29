import { excelDM, newCurrent } from "./main.js";
import { Entry } from "./classes.js";
import { fetchCampaignData, getApiUrl } from "./sync.js";
import { connectWS, setLocalVersion } from "./ws.js";
import { restorePopOuts } from "./popoutState.js";
import { setCurrentRuleset } from "./ruleset.js";

export { setApiUrl, openDB, saveCategories, saveData, saveDataNow } from "./sync.js";
export { disconnectWS } from "./ws.js";

export async function loadData() {
  try {
    const data = await fetchCampaignData();
    if (!data) return;

    excelDM.entries.splice(0, excelDM.entries.length);
    excelDM.categories = data.categories ?? {};
    excelDM.tabs = Array.isArray(data.tabs) ? data.tabs : null;
    setCurrentRuleset(data.ruleset ?? "");

    (Array.isArray(data.entries) ? data.entries : []).forEach((entryData) => {
      excelDM.add(new Entry(entryData));
    });

    excelDM.prepareFromJSON();
    restorePopOuts(excelDM.entries);
    excelDM.clearDirtyState();
    setLocalVersion(data.version ?? 0);
  } catch (err) {
    console.error("Failed to load:", err);
    return;
  }

  connectWS(getApiUrl());
  newCurrent();
  excelDM.clearDirtyState(); // clear dirty set by newCurrent
}
