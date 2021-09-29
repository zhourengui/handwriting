// 手写 reduce

Array.prototype.reduce = function (handler, init) {
  let res = init;
  for (const item of this) {
    res = handler(res, item);
  }
  return res;
};
