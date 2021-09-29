class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class ListNode {
  constructor() {
    this.next = null;
    this.length = 0;
  }

  find(len) {
    let c = 1,
      n = this.next;
    if (len > this.length) return null;
    while (true) {
      if (n === null) return null;
      if (len === c) return n;
      c++;
      n = n.next;
    }
  }

  add(len, node) {
    if (len > this.length) return false;
    let c = 0,
      n = this;
    while (true) {
      if (len === c) {
        this.length++;
        node.next = n.next;
        n.next = node;
        return true;
      }
      c++;
      n = n.next;
    }
  }

  delete(len) {
    if (len > this.length || this.length === 0) return false;

    this.length--;

    let c = 0,
      n = this,
      t = null;

    while (true) {
      if (c + 1 === len) {
        t = n.next;
        n.next = n.next.next;
        t.next = null;
        return true;
      }
      c++;
      n = n.next;
    }
  }
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
const node6 = new Node(6);

const link = new ListNode();
link.add(0, node1);
link.add(1, node2);
link.delete(3);
console.log(link);
