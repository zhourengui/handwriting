// ES5

// ES6
class LRUCache {
  constructor(capature) {
    this.capature = capature
    this.map = new Map()
  }

  get(key) {
    const val = this.map.get(key)
    if (!val) return -1
    this.map.delete(key)
    this.map.set(key, val)
  }

  put(key, val) {
    this.map.delete(key)
    this.map.set(key, val)
    let keys = this.map.keys()
    if (this.map.size > this.capature) {
      this.map.delete(keys.next().value)
    }
  }
}

// demo
const lru = new LRUCache(3)
lru.put(1, 2)
lru.put(2, 2)
lru.put(3, 2)
lru.put(4, 2)
lru.put(5, 3)
lru.put(6, 3)
lru.put(7, 3)
lru.put(8, 3)

console.error(lru.map.keys())
