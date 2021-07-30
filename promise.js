const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

function promiseResoulveProgram(promise, x, resolve, reject) {
  if (promise === x) {
    throw new Error("自身嵌套")
  }

  if (x instanceof Promise) {
    if (x.state === PENDING) {
      x.then((y) => promiseResoulveProgram(promise, y, resolve, reject), reject)
    } else {
      x.state === FULFILLED && resolve(x.value)
      x.state === REJECTED && reject(x.value)
    }
    return
  }

  if (
    x !== null &&
    (typeof x === "object" || typeof x === "function") &&
    typeof x.then === "function"
  ) {
    x.then((y) => promiseResoulveProgram(promise, y, resolve, reject), reject)
  } else {
    resolve(x)
  }
}


class Promise {
  constructor(fn) {
    this.state = PENDING
    this.value = null
    this.reoslveCallbacks = []
    this.rejectCallbacks = []

    const resolve = (value) => {
      if (value instanceof Promise) {
        return promiseResoulveProgram(this, value, resolve, reject)
      }
      setTimeout(() => {
        this.value = value
        this.state = FULFILLED
        for (const callback of this.reoslveCallbacks) {
          callback()
        }
      }, 0)
    }
    const reject = (value) => {
      if (value instanceof Promise) {
        return promiseResoulveProgram(this, value, resolve, reject)
      }
      setTimeout(() => {
        this.value = value
        this.state = REJECTED
        for (const callback of this.rejectCallbacks) {
          callback()
        }
      }, 0)
    }

    fn(resolve, reject)
  }

  then(
    onResolve = (...args) => args,
    onReject = (err) => {
      throw new Error(err)
    }
  ) {
    let promise
    if (this.state === PENDING) {
      promise = new Promise((resolve, reject) => {
        this.reoslveCallbacks.push(() => {
          const x = onResolve(this.value)
          promiseResoulveProgram(promise, x, resolve, reject)
        })

        this.rejectCallbacks.push(() => {
          const x = onReject(this.value)
          promiseResoulveProgram(promise, x, resolve, reject)
        })
      })
    }

    if (this.state === REJECTED) {
      promise = new Promise((resolve, reject) => {
        this.rejectCallbacks.push(() => {
          const x = onReject(this.value)
          promiseResoulveProgram(promise, x, resolve, reject)
        })
      })
    }

    if (this.state === FULFILLED) {
      promise = new Promise((resolve, reject) => {
        this.reoslveCallbacks.push(() => {
          const x = onResolve(this.value)
          promiseResoulveProgram(promise, x, resolve, reject)
        })
      })
    }

    return promise
  }
  catch(
    onReject = (err) => {
      throw new Error(err)
    }
  ) {
    return this.then(undefined, onReject)
  }
  finally(callback = (...args) => args) {
    return this.then(
      (data) => Promise.resolve(callback()).then(() => data),
      (reason) =>
        Promise.reject(callback()).then(() => {
          throw new Error(reason)
        })
    )
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0
      let res = []
      for (const promise of promises) {
        Promise.resolve(promise).then((data) => {
          res.push(data)
          count++
          if (count === promises.length) {
            resolve(res)
          }
        }, reject)
      }
    })
  }
  static allSettled(promises) {
    return new Promise((resolve) => {
      let count = 0
      let res = []
      for (const promise of promises) {
        Promise.resolve(promise).then(
          (data) => {
            res.push({
              state: FUlFILLED,
              value: data,
            })
            count++
            if (count === promises.length) {
              resolve(res)
            }
          },
          (reason) => {
            res.push({
              state: REJECTED,
              value: reason,
            })
            count++
            if (count === promises.length) {
              resolve(res)
            }
          }
        )
      }
    })
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        Promise.resolve(promise).then(resolve, reject)
      }
    })
  }
  static resolve(data) {
    if (data instanceof Promise) return data
    if (
      data !== null &&
      (typeof data === "function" || typeof data === "object") &&
      typeof data.then === "function"
    )
      return new Promise((resolve, reject) => data.then(resolve, reject))

    return new Promise((resolve) => resolve(data))
  }
  static reject(reason) {
    return new Promise((_, reject) => reject(reason))
  }
  static limit(count) {
    const jobs = []
    let working = 0

    function queue(fn) {
      return new Promise((resolve, reject) => {
        jobs.push({ fn, resolve, reject })
      })
    }

    function dequeue() {
      if (jobs.length) {
        const { fn, resolve, reject } = jobs.shift()
        run(fn).then(resolve).catch(reject)
      }
    }

    function remove() {
      working--
      if (count > working) {
        dequeue()
      }
    }

    function run(fn) {
      working++
      try {
        return Promise.resolve(fn()).then(
          (res) => {
            remove()
            return res
          },
          (error) => {
            remove()
            throw error
          }
        )
      } catch (error) {
        remove()
        return Promise.reject(error)
      }
    }

    return function (fn) {
      if (working >= count) {
        return queue(fn)
      } else {
        return run(fn)
      }
    }
  }
}

// demo
// new Promise((resolve, reject) => {
//   reject(111)
// })
//   .then(
//     (res) => {
//       return {
//         then(resolve, reject) {
//           resolve({
//             then(resolve, reject) {
//               resolve(res)
//             },
//           })
//         },
//       }
//     },
//     (err) => {}
//   )
//   .then((res) => {
//     return new Promise((resolve, reject) => {
//       resolve(res)
//     })
//   })
//   .then((res) => {})
//   .catch((err) => console.error("err", err))

// const promise1 = new Promise((resolve) => resolve(1))
// console.log(promise1.finally())

// Promise.all([
//   new Promise((resolve) => resolve(1)),
//   new Promise((resolve) => resolve(2)),
// ]).then((res) => console.error(res))

// Promise.race([
//   new Promise((resolve) => resolve(1)),
//   new Promise((resolve) => resolve(2)),
// ])
//   .then((res) => 2)
//   .finally((s) => console.error(s))

const limit = Promise.limit(1)

Promise.all(
  ["a", "b", "c", "d", "e", "f"].map((name) => limit(() => task(name)))
).then((res) => {
  console.error("res", res)
})

function task(name) {
  console.error("Task:", name)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name)
    }, 3000)
  })
}
