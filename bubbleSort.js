Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length; i++) {
    for (let j = i; j < this.length; j++) {
      if (this[j] < this[i]) {
        const tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
      }
    }
  }
};
// demo
const arr = [4, 2, 5, 1];
arr.bubbleSort();
console.error(arr);
