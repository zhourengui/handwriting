// 递归版
Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length <= 1) return arr;
    let left = [];
    let right = [];
    let mid = arr[0];
    for (let i = 1; i < arr.length; i++) {
      arr[i] > mid ? right.push(arr[i]) : left.push(arr[i]);
    }
    return [...rec(left), mid, ...rec(right)];
  };
  rec(this).forEach((i, k) => (this[k] = i));
};

// 非递归版
Array.prototype.quickSort = function () {
  const len = this.length;
  const stack = [[0, len - 1]];
  while (stack.length) {
    let top = stack.pop();
    let [left, right] = top;
    let flag = left;
    if (left >= right) continue;
    while (left < right) {
      while (right > flag && this[right] >= this[flag]) right--;
      if (left >= right) break;
      while (left < right && this[left] <= this[flag]) left++;
      const tmp = this[flag];
      this[flag] = this[right];
      this[right] = this[left];
      this[left] = tmp;
      flag = left;
    }
    stack.push([top[0], flag - 1]);
    stack.push([flag + 1, top[1]]);
  }
};

const arr = [2, 3, 1, 5, 10, 2];
arr.quickSort();
console.log(arr);
