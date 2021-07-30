function uncurry(fn) {
  return function(...args) {
    let res = fn
    for (const arg of args) {
      res = res(arg)  
    }
    return res
  }
}

// demo
const curry = (fn, arity = fn.length, nextCurried) =>
  (nextCurried = (preArgs) => (nextArg) => {
    const args = [...preArgs, nextArg]
    return args.length >= arity ? fn(...args) : nextCurried(args)
  })([])

const addCurry = curry((x, y, z) => console.log(x + y + z))

uncurry(addCurry)(1, 2, 3)
