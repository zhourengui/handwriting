// ES5

function ListNode(key, val, prev, next) {
  this.val = val;
  this.key = key;
  this.prev = prev;
  this.next = next;
}

function LRUCache(capature) {
  this.capature = capature;
  this.oldest = null;
  this.lastest = null;
  this.node = null;
  this.length = 0;
}

LRUCache.prototype.get = function (key) {
  let p = this.node;
  while (p) {
    if (p.key === key) {
      p.prev.next = p.next;
      if (p.next !== null) {
        p.next.prev = p.prev;
      }
      p.prev = this.lastest;
      this.lastest.next = p;
      this.lastest = p;
      return p;
    }
    p = p.next;
  }

  return null;
};

LRUCache.prototype.put = function (key, val) {
  const node = new ListNode(key, val, null, null);
  if (this.node === null) {
    this.node = node;
    this.oldest = node;
  } else {
    this.lastest.next = node;
    node.prev = this.lastest;
  }
  this.lastest = node;

  this.length = this.length + 1;

  if (this.length > this.capature) {
    let tmp = this.oldest.next;
    tmp.prev = null;
    this.node = tmp;
    this.oldest = tmp;
  }
};

// ES6
// class LRUCache {
//   constructor(capature) {
//     this.capature = capature;
//     this.map = new Map();
//   }

//   get(key) {
//     const val = this.map.get(key);
//     if (!val) return -1;
//     this.map.delete(key);
//     this.map.set(key, val);
//   }

//   put(key, val) {
//     this.map.delete(key);
//     this.map.set(key, val);
//     let keys = this.map.keys();
//     if (this.map.size > this.capature) {
//       this.map.delete(keys.next().value);
//     }
//   }
// }

// demo
const lru = new LRUCache(2);
lru.put(1, 1);

lru.put(2, 2);
lru.put(3, 3);
lru.put(4, 4);
lru.put(5, 5);
lru.put(6, 6);
lru.put(7, 7);
lru.put(8, 8);

console.error(lru.node);
