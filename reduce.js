// 手写 reduce

Array.prototype.reduce = function (callback, initState) {
  if (typeof callback !== "function") {
    throw new TypeError("callback is required a function");
  }

  if (!Array.isArray(this)) {
    throw new TypeError("callee is required a array");
  }

  let res = initState;

  for (let i = 0; i < this.length; i++) {
    res = callback.call(this, res, this[i], i, this);
  }

  return res;
};
