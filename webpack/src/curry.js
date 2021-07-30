export const curry = (fn, arity = fn.length, nextCurried) =>
  (nextCurried = (prevArgs) => (nextArgs) => {
    const args = [...prevArgs, nextArgs]
    return args.length >= arity ? fn(...args) : nextCurried(args)
  })([])
