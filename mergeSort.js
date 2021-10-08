Array.prototype.mergeSort = function () {
  const rec = (arr) => {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2),
      left = arr.slice(0, mid),
      right = arr.slice(mid),
      leftOrder = rec(left),
      rightOrder = rec(right),
      res = [];

    while (leftOrder.length || rightOrder.length) {
      if (leftOrder.length && rightOrder.length) {
        res.push(
          leftOrder[0] > rightOrder[0] ? rightOrder.shift() : leftOrder.shift()
        );
      } else if (leftOrder.length) {
        res.push(leftOrder.shift());
      } else {
        res.push(rightOrder.shift());
      }
    }

    return res;
  };

  rec(this).forEach((i, k) => (this[k] = i));
};

// demo
const arr = [4, 2, 5, 1];
arr.mergeSort();
console.error(arr);
