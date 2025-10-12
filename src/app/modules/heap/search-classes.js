export const searchClassesToEvaluate = (classInstances, textMatchesFn, iterateFn, serializeFn) => {

  const textMatches = eval(textMatchesFn);
  const iterate = eval(`(${iterateFn})`);
  const safeStringify = eval(`(${serializeFn})`);

  const searchClasses = (classInstances) => {
    const result = [];

    for (const cls of classInstances) {
      const r = {};
      for (const [k, v] of iterate(cls)) {
        r[k] = v;
      }
      result.push(r);
    }

    return result;
  };

  return safeStringify(searchClasses(classInstances));
}