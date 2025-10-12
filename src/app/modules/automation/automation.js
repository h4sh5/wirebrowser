import BaseModule from "#src/app/base-module.js"
import BrowserUtils from "./browser-utils.js";
import PptrUtils from "./pptr-utils.js";
import { getPageScriptContent } from "#src/app/utils.js";

class Automation extends BaseModule {
  run = () => {
    this.uiEvents.on("automation.runScript", async (data, respond) => {
      const results = [];
      const files = this.settingsManager.settings?.automation?.scripts?.files;
      const vars = this.settingsManager.settings?.global?.variables || {};
      if (!files) {
        this.uiEvents.dispatch("Error", "Reading files");
        return;
      }
      for (const [pageId, page] of this.pagesManager.pages) {
        if (data.pageIds && data.pageIds.length > 0 && !data.pageIds.includes(pageId)) {
          continue;
        }
        const script = files.find(f => f.id === data.fileId);
        if (!script.content) {
          this.uiEvents.dispatch("Error", "File not found");
          return;
        }

        const scriptContent = getPageScriptContent(script.content, BrowserUtils, vars);
        try {
          results.push([pageId, await page.page.evaluate(scriptContent)]);
        } catch (e) {
          results.push([pageId, e.toString()]);
        }
      }

      respond("automation.runScriptResult", results);
    });

    this.uiEvents.on("automation.runPptrScript", async (data, respond) => {
      let results;
      const files = this.settingsManager.settings?.automation?.pptrscripts?.files;
      const vars = this.settingsManager.settings?.global?.variables || {};
      if (!files) {
        this.uiEvents.dispatch("Error", "Reading files");
        return;
      }

      const script = files.find(f => f.id === data.fileId);
      if (!script.content) {
        this.uiEvents.dispatch("Error", "File not found");
        return;
      }
      const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
      const fn = new AsyncFunction("Utils", `${script.content};`);
      try {
        results = await fn(new PptrUtils(this.pagesManager, this.settingsManager));
        // Try to serialize results to trigger the proper exception in case of failure
        JSON.stringify(results);
      } catch (e) {
        this.uiEvents.dispatch("Error", `${e}`);
        results = "";
      }

      respond("automation.runPptrScriptResult", results);
    });
  }

  stop = () => {
    for (const e of this.uiEvents.getRegisteredEvents()) {
      if (e.startsWith("automation.")) {
        this.uiEvents.off(e);
      }
    }
  }

}

export default Automation;