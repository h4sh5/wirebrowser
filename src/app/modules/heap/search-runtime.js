
export const searchRootToEvaluate = (root, propertySearch, valueSearch, textMatchesFn, iterateFn) => {

  const textMatches = eval(textMatchesFn);
  const iterate = eval(`(${iterateFn})`);

  const searchRoot = (root, { propertySearch, valueSearch, maxDepth = 125 }, rootPath) => {
    const seen = new WeakSet();
    const results = [];

    const search = (obj, path = rootPath, depth = 0) => {
      if (obj === null || typeof obj !== "object") return;
      if (seen.has(obj)) return;
      if (depth > maxDepth) return;

      seen.add(obj);

      for (const [k, v] of iterate(obj)) {
        let propPath;
        let propMatches = !propertySearch || !propertySearch[0];
        let valMatches = !valueSearch || !valueSearch[0];

        if (
          Array.isArray(obj)
          || ArrayBuffer.isView(obj)
          || obj instanceof NodeList
          || obj instanceof HTMLCollection
        ) {
          propPath = `${path}[${k}]`;
        } else if (obj instanceof Map) {
          propPath = `${path}.<map>[${k}]`;
        } else if (obj instanceof Set) {
          propPath = `${path}.<set>[${k}]`;
        } else {
          propPath = `${path}.${k}`;
        }

        if (propertySearch && textMatches(String(k), ...propertySearch)) {
          propMatches = true;
        }

        if (typeof v !== "object"
          && valueSearch
          && textMatches(String(v), ...valueSearch)) {
          valMatches = true;
        }

        if(propMatches && valMatches){
          results.push({ path: propPath, value: v });
        }

        if (typeof v === "object" && v !== null) {
          search(v, propPath, depth + 1);
        }
      }
    }

    search(root);
    return results;
  }

  return searchRoot(eval(root), { propertySearch, valueSearch }, root);
}