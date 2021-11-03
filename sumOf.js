const sum = (function () {
  const nextCurried = function (prevArgs) {
    return function (...nextArgs) {
      const args = prevArgs.concat(nextArgs);
      const res = nextCurried(args);
      res.sumOf = () => args.reduce((prev, next) => prev + next, 0);
      return res;
    };
  };
  return nextCurried([]);
})();

console.log(sum(1).sumOf());
