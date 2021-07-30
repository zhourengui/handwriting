function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}

// demo
const fn = debounce(() => console.log(1), 100)

while (true) {
  fn()
}
