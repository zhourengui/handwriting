const curry = (fn, arity = fn.length, nextCurried) =>
  (nextCurried =
    (prevArgs) =>
    (...nextArgs) => {
      const args = prevArgs.concat(nextArgs);
      return args.length >= arity ? fn(...args) : nextCurried(args);
    })([]);

const add = curry((a, b, c) => a + b + c);

console.log(add(1)(2)(3));
