// 手写map

Array.prototype.map = function (callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callback.call(this, this[i], i, this));
  }
  return res;
};
