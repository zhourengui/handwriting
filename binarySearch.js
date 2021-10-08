Array.prototype.binarySearch = function (target) {
  let low = 0,
    high = this.length - 1,
    mid;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (this[mid] === target) {
      return mid;
    } else if (this[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
};

// demo
const arr = [1, 2, 3];
console.log(arr.binarySearch(3));
