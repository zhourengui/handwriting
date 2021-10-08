Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    let j = i,
      tmp = this[j];

    while (j > 0) {
      if (this[j - 1] > tmp) {
        this[j] = this[j - 1];
        j--;
      } else {
        break;
      }
    }

    this[j] = tmp;
  }
};

// demo
const arr = [4, 2, 5, 1];
arr.insertionSort();
console.error(arr);
