function cloneDeep(input, hash = new WeakMap()) {
  if (input === null) return input
  if (input instanceof Date) return new Date(input)
  if (input instanceof RegExp) return new RegExp(input)
  if (typeof input !== "object") return input
  if (hash.has(input)) return hash.get(input)
  let output = new input.constuctor()
  hash.set(input, output)
  for (const key in input) {
    if (Object.hasOwnProperty.call(input, key)) {
      output[key] = cloneDeep(input[key], hash)
    }
  }
  return output
}
