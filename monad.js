const fs = require("fs");

const compose = (...fns) => {
  const len = fns.length;
  if (len === 0) return (...args) => args;

  return fns.reduce(
    (prev, next) =>
      (...args) =>
        prev(next(...args))
  );
};

class Functor {
  constructor(val) {
    this.val = val;
  }

  map(f) {
    return new Functor(f(this.val));
  }
}

class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    return this.map(f).join();
  }
}

class IO extends Monad {
  static of(val) {
    return new IO(val);
  }

  map(f) {
    return IO.of(compose(f, this.val));
  }
}

const readFile = (filepath) => {
  return IO.of(function () {
    return fs.readFileSync(filepath, "utf-8");
  });
};

const print = (content) => {
  return IO.of(function () {
    console.log(content);
  });
};

const res = readFile("./mergeSort.js").flatMap(print);
console.log(res().val());
