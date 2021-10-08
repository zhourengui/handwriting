// flag

const MAX_TAKE_COUNT = 100000000;
const ITERATE_FILTER_TYPE = 1;

function LazyWrapper(val) {
  this.__iteratees__ = [];
  this.__wrapped__ = val;
  this.__takeCount__ = MAX_TAKE_COUNT;
}

function lazy(val) {
  return new LazyWrapper(val);
}

LazyWrapper.prototype.takeCount = function (n) {
  this.__takeCount__ = n;
  return this;
};

LazyWrapper.prototype.filter = function (iterate) {
  this.__iteratees__.push({
    type: ITERATE_FILTER_TYPE,
    iterate,
  });
  return this;
};

LazyWrapper.prototype.value = function () {
  let arr = this.__wrapped__,
    len = arr.length,
    takeCount = this.__takeCount__,
    iteratees = this.__iteratees__,
    iterLen = iteratees.length,
    current = -1,
    res = [];

  outer: while (current++ < len - 1 && res.length !== takeCount) {
    let value = arr[current],
      iter = -1;
    while (iter++ < iterLen - 1) {
      const { type, iterate } = iteratees[iter];
      const compeled = iterate(value);
      if (type === ITERATE_FILTER_TYPE && !compeled) {
        continue outer;
      }
    }

    res.push(value);
  }

  return res;
};

// demo
console.error(
  lazy([3, 1, 11, 4, 6, 3, 6, 19])
    .filter((item) => item > 1)
    .takeCount(3)
    .value()
);
