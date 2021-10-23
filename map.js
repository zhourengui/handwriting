// 手写map

Array.prototype.map = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback is required a function");
  }

  if (!Array.isArray(this)) {
    throw new TypeError("callee is required a array");
  }

  const res = [];

  for (let i = 0; i < this.length; i++) {
    res.push(callback.call(this, this[i], i, this));
  }

  return res;
};
