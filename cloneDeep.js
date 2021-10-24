function cloneDeep(input, map = new WeakMap()) {
  if (input === null) return input;
  if (input instanceof Date) return new Date(input);
  if (input instanceof RegExp) {
    const global = input.global;
    const output = new RegExp(input);
    if (global) {
      output.lastIndex = input.lastIndex;
    }
    return output;
  }
  if (typeof input !== "object") return input;
  if (map.has(input)) return map.get(input);
  const output = Array.isArray(input) ? [] : {};
  map.set(input, output);
  for (const key in input) {
    if (Object.hasOwnProperty.call(input, key)) {
      output[key] = cloneDeep(input[key], map);
    }
  }
  return output;
}
