"use strict"

function next() {
  return "@@Symbol:" + String(Math.random()).slice(2)
}

function Symbol(desc) {
  if (this instanceof Symbol) {
    throw new TypeError("Symbol is not a constructor")
  }
  const code = next()
  const sym = Object.create(Symbol.prototype, {
    _desc: {
      value: desc,
      enumerable: false,
      configurable: false,
      writable: false,
    },
    _code: {
      value: code,
      enumerable: false,
      configurable: false,
      writable: false,
    },
  })

  return sym
}

Symbol.prototype.toString = function () {
  return this._code
}

let globalRegister = {}

Symbol.for = function (desc) {
  return globalRegister[desc] || (globalRegister[desc] = Symbol(desc))
}

Symbol.keyFor = function (sym) {
  if (!(sym instanceof Symbol)) {
    throw new TypeError("keyfor is required Symbole param")
  }
  for (const key in globalRegister) {
    if (Object.hasOwnProperty.call(globalRegister, key)) {
      if (globalRegister[key] === sym) {
        return key
      }
    }
  }
}

// demo
const symbol1 = Symbol("heihei")
const symbol4 = Symbol("heihei")
console.error(symbol1 === symbol4)
const symbol2 = Symbol.for("haha")
const symbol3 = Symbol.for("haha")
console.error(symbol2 === symbol3)
console.error(Symbol.keyFor(symbol3))
