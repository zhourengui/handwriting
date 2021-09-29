class Queue {
  constructor(maxCount = 100) {
    this.queue = [];
    this.maxCount = maxCount;
    this.index = 0;
  }

  enqueue(target) {
    if (this.index === this.maxCount - 1) {
      throw new Error("queue size exceed");
    }
    this.queue[this.index++] = target;

    return target;
  }

  dequeue() {
    if (this.index !== 0) {
      return this.queue[--this.index];
    }
    return null;
  }

  destroy() {
    this.index = 0;
    this.queue = [];
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.dequeue();
queue.destroy();
queue = null;
