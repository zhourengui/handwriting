// 过滤
Array.prototype.filter = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback is required a function");
  }

  if (!Array.isArray(this)) {
    throw new TypeError("callee is required a array");
  }

  const res = [];

  for (let i = 0; i < this.length; i++) {
    if (Boolean(callback.call(this, this[i], i, this))) {
      res.push(this[i]);
    }
  }

  return res;
};
