// 洗牌算法

function shuffle(arr) {
  let len = arr.length,
    random
  while (len > 0) {
    random = (Math.random() * len--) >>> 0
    ;[arr[random], arr[len]] = [arr[len], arr[random]]
  }
  return arr
}

// demo

console.log(shuffle([2, 3, 4, 1, 12, 13, 1]))
