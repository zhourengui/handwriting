export default function compose(...fns) {
  let len = fns.length
  if (len === 0) return (...args) => args
  if (len === 1) return fns[0]
  return fns.reduce(
    (prev, next) =>
      (...args) =>
        prev(next(...args))
  )
}
