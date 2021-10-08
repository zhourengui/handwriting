// 堆是一个完全二叉树
// 左侧子节点：2 * index + 1
// 右侧子节点：2 * index + 2
// 父节点位置：(index - 1) / 2
class MiniHeap {
  constructor() {
    this.heap = [];
  }

  getLeftIndex(index) {
    return (index << 1) + 1;
  }

  getRightIndex(index) {
    return (index << 1) + 2;
  }

  getParentIndex(index) {
    return (index - 1) >> 1;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  shiftUp(index) {
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(index, leftIndex);
      this.shiftDown(leftIndex);
    }

    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(index, rightIndex);
      this.shiftDown(rightIndex);
    }
  }

  insert(target) {
    this.heap.push(target);
    this.shiftUp(this.size() - 1);
  }

  pop() {
    this.heap[0] = this.heap[this.size() - 1];
    const top = this.heap.pop();
    this.shiftDown(0);
    return top;
  }
}

// demo
const heap = new MiniHeap();
heap.insert(2);
heap.insert(7);
heap.insert(4);
heap.insert(3);
heap.insert(9);
heap.insert(5);

console.error(heap);

heap.pop();

console.error(heap);
