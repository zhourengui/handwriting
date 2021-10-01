const curry = (fn, arity = fn.length, nextCurried) =>
  (nextCurried =
    (prevArgs) =>
    (...nextArgs) => {
      const args = [...prevArgs, ...nextArgs];
      return args.length >= arity ? fn(...args) : nextCurried(args);
    })([]);

// demo
const addCurry = curry((x, y, z) => console.log(x + y + z));

addCurry(1)(2)(3);
