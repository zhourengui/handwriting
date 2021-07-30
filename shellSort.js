Array.prototype.shellSort = function () {
  let len = this.length
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let j = i
      let tmp = this[j]
      while (j - gap >= 0) {
        if (this[j - gap] > tmp) {
          this[j] = this[j - gap]
          j -= gap
        } else {
          break
        }
      }
      this[j] = tmp
    }
  }
}
// demo
const arr = [4, 2, 5, 1]
arr.shellSort()
console.error(arr)
