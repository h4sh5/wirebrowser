import got from 'got';
import { safeJsonStringify, iterate } from "#src/app/utils.js";

class PptrUtils {
  constructor(pagesManager, settingsManager) {
    this.pagesManager = pagesManager;
    this.settingsManager = settingsManager;
    this.safeJsonStringify = safeJsonStringify;
    this.iterate = iterate;
    this.httpClient = {got};
  }

  getVar(name) {
    const vars = this.settingsManager.settings?.global?.variables || {};
    return vars[name];
  }

  getPage(id) {
    for (const [pageId, page] of this.pagesManager.pages) {
      if (String(pageId) === String(id)) {
        return page.page;
      }
    }
  }
}

export default PptrUtils;