// 手写map

Array.prototype.map = function (handler) {
  const arr = [];
  for (const item of this) {
    arr.push(handler(item));
  }

  return arr;
};
