class Node {
  constructor(value, prev, next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class Stack {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.top = null;
    this.length = 0;
  }

  push(target) {
    if (this.length === this.maxSize) {
      throw new Error("stack over max size");
    }
    const node = new Node(target, null, null);
    if (this.length === 0) {
      this.top = node;
    } else {
      node.prev = this.top;
      this.top.nextSibling = node;
      this.top = node;
    }
    this.length++;
  }

  pop() {
    if (this.length === 0) return null;
    this.length--;
    const t = this.top;
    this.top = t.prev;
    this.top.next = null;
    t.prev = null;
    return t;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
