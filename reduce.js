// 手写 reduce

Array.prototype.reduce = function (callback, initState) {
  if (typeof callback !== "function") {
    throw new TypeError("callback is required a function");
  }

  if (!Array.isArray(this)) {
    throw new TypeError("callee is required a array");
  }

  if (this.length === 0) {
    throw new Error("array is must not empty");
  }

  let prev = initState;
  let p = 0;
  let len = this.length;

  if (initState === undefined) {
    prev = this[0];
    p++;
  }

  while (p < len) {
    prev = callback(prev, this[p], p, this);
    p++;
  }

  return prev;
};
