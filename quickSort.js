Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length <= 1) return arr;
    let left = [],
      right = [],
      mid = arr[0];

    for (let i = 1; i < arr.length; i++) {
      arr[i] > mid ? right.push(arr[i]) : left.push(arr[i]);
    }

    return [...rec(left), mid, ...rec(right)];
  };

  rec(this).forEach((i, k) => (this[k] = i));
};
// demo
const arr = [4, 2, 5, 1];
arr.quickSort();
console.error(arr);
