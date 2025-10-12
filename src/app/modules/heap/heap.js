import BaseModule from "#src/app/base-module.js"
import {
  parseSnapshot, captureSnapshot,
  searchObjects, buildReverseEdges,
  buildJsPath, inspectObject
} from "#src/app/modules/heap/search-snapshot.js"

import { searchRootToEvaluate } from "#src/app/modules/heap/search-runtime.js"
import { searchClassesToEvaluate } from "#src/app/modules/heap/search-classes.js"
import { textMatches } from "#src/common/utils.js";
import { safeJsonStringify, iterate } from "#src/app/utils.js";


class Heap extends BaseModule {
  run = () => {
    this.uiEvents.on("heap.searchSnapshot", async (data, respond) => {
      const page = this.pagesManager.get(data.pageId).page;
      const snapshot = await captureSnapshot(page);
      const nodes = parseSnapshot(snapshot);

      const matches = searchObjects(nodes, {
        propertySearch: data.propertySearch,
        valueSearch: data.valueSearch,
      });

      const rev = buildReverseEdges(nodes);
      const results = []

      for (const m of matches) {
        const path = buildJsPath(nodes, rev, m.idx);
        results.push({
          ...inspectObject(m, nodes),
          path
        })
      }

      respond("heap.searchSnapshotResult", results);
    });

    this.uiEvents.on("heap.searchRuntime", async (data, respond) => {
      const page = this.pagesManager.get(data.pageId).page;
      let results = "";
      try {
        results = await page.evaluate(
          searchRootToEvaluate,
          data.root, data.propertySearch, data.valueSearch,
          textMatches.toString(), iterate.toString()
        );
      } catch (e) {
        this.uiEvents.dispatch("Error", `${e}`);
      }
      respond("heap.searchRuntimeResult", results);
    });

    this.uiEvents.on("heap.searchClasses", async (data, respond) => {
      const page = this.pagesManager.get(data.pageId).page;
      let results = "";
      try {
        const handle = await page.evaluateHandle((p) => eval(p), data.proto);
        const classInstances = await page.queryObjects(handle);
        results = await page.evaluate(
          searchClassesToEvaluate,
          classInstances,
          textMatches.toString(), iterate.toString(), safeJsonStringify.toString()
        );
      } catch (e) {
        this.uiEvents.dispatch("Error", `${e}`);
      }
      let res;
      try {
        res = JSON.parse(results);
      } catch {
        res = ""
      }
      respond("heap.searchClassesResult", res);
    });
  }
  stop = () => {
    for (const e of this.uiEvents.getRegisteredEvents()) {
      if (e.startsWith("heap.")) {
        this.uiEvents.off(e);
      }
    }
  }

}

export default Heap;