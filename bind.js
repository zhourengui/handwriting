Function.prototype.bind = function (context) {
  const that = this
  const prevArgs = Array.prototype.slice.call(arguments, 1)

  function bindFn() {
    const nextArgs = Array.prototype.slice.call(arguments)
    const res = that.apply(
      this instanceof bindFn ? this : context,
      prevArgs.concat(nextArgs)
    )
    return res instanceof bindFn ? (typeof res === "object" ? res : this) : res
  }

  bindFn.prototype = Object.create(this.prototype)
  bindFn.prototype.constructor = bindFn

  return bindFn
}

// demo
function fn1() {
  console.error(this.name)
  this.name = 123
}

fn1.prototype.age = 30

const bindFn = fn1.bind({ name: "Tencent" })
console.error(bindFn())
console.error(new bindFn())
