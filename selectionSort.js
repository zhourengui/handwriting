Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < this.length; j++) {
      if (this[min] > this[j]) {
        min = j
      }
    }
    if (min !== i) {
      const tmp = this[min]
      this[min] = this[i]
      this[i] = tmp
    }
  }
}

// demo
const arr = [4, 2, 5, 1]
arr.selectionSort()
console.error(arr)
