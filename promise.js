const PENDING = "PENDING";
const FULFILED = "FULFILED";
const REJECTED = "REJECTED";

const isPromise = (x) => x instanceof Promise;
const isThenable = (x) =>
  x !== null &&
  (typeof x === "function" || typeof x === "object") &&
  typeof x.then === "function";

function handlePromiseOrThenable(promise, x, resolve, reject) {
  if (promise === x) {
    throw new Error("自身嵌套调用");
  }

  if (isPromise(x)) {
    if (x.state === PENDING) {
      x.then((y) => y).then(
        (y) => handlePromiseOrThenable(promise, y, resolve, reject),
        reject
      );
    } else {
      x.state === FULFILED && resolve(x.value);
      x.state === REJECTED && reject(x.value);
    }
    return;
  }

  if (isThenable(x)) {
    x.then((y) => handlePromiseOrThenable(promise, y, resolve, reject), reject);
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    const resolve = (value) => {
      if (isPromise(value) || isThenable(value)) {
        return handlePromiseOrThenable(this, value, resolve, reject);
      }
      setTimeout(() => {
        this.value = value;
        this.state = FULFILED;
        for (const callback of this.resolveCallbacks) {
          callback(value);
        }
      }, 0);
    };
    const reject = (value) => {
      if (isPromise(value) || isThenable(value)) {
        return handlePromiseOrThenable(this, value, resolve, reject);
      }
      setTimeout(() => {
        this.value = value;
        this.state = REJECTED;
        for (const callback of this.rejectCallbacks) {
          callback(value);
        }
      }, 0);
    };

    fn(resolve, reject);
  }

  then(
    onResolve = (...args) => args,
    onReject = (err) => {
      throw new Error(err);
    }
  ) {
    let promise;

    if (this.state === PENDING) {
      promise = new Promise((resolve, reject) => {
        this.resolveCallbacks.push((value) => {
          const x = onResolve(value);
          handlePromiseOrThenable(promise, x, resolve, reject);
        });
        this.rejectCallbacks.push((value) => {
          const x = onReject(value);
          handlePromiseOrThenable(promise, x, resolve, reject);
        });
      });
    }

    if (this.state === FULFILED) {
      promise = new Promise((resolve, reject) => {
        this.resolveCallbacks.push((value) => {
          const x = onResolve(value);
          handlePromiseOrThenable(promise, x, resolve, reject);
        });
      });
    }

    if (this.state === REJECTED) {
      promise = new Promise((resolve, reject) => {
        this.rejectCallbacks.push((value) => {
          const x = onReject(value);
          handlePromiseOrThenable(promise, x, resolve, reject);
        });
      });
    }

    return promise;
  }

  catch(
    onReject = (err) => {
      throw new Error(err);
    }
  ) {
    return this.then(undefined, onReject);
  }

  finally(callback = (...args) => args) {
    return this.then(
      (data) => Promise.resolve(callback()).then(() => data),
      (reason) =>
        Promise.reject(callback()).then(() => {
          throw new Error(reason);
        })
    );
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let finishCount = 0;
      let res = [];
      let len = promises.length;
      for (let i = 0; i < len; i++) {
        Promise.resolve(promises[i]).then((data) => {
          finishCount++;
          res[i] = data;
          if (len === finishCount) {
            resolve(res);
          }
        });
      }
    });
  }
  static allSettled(promises) {
    return new Promise((resolve) => {
      let count = 0;
      let res = [];
      for (const promise of promises) {
        Promise.resolve(promise).then(
          (data) => {
            res.push({
              state: FUlFILLED,
              value: data,
            });
            count++;
            if (count === promises.length) {
              resolve(res);
            }
          },
          (reason) => {
            res.push({
              state: REJECTED,
              value: reason,
            });
            count++;
            if (count === promises.length) {
              resolve(res);
            }
          }
        );
      }
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        Promise.resolve(promise).then(resolve, reject);
      }
    });
  }

  static resolve(data) {
    if (isPromise(data)) return data;
    if (isThenable(data))
      return new Promise((resolve, reject) => data.then(resolve, reject));
    return new Promise((resolve) => resolve(data));
  }

  static reject(reason) {
    return new Promise((_, reject) => reject(reason));
  }

  static limit(count) {
    let queue = [],
      working = 0;

    function addTask(asyncTask) {
      return new Promise((resolve, reject) => {
        asyncTask.resolve = resolve;
        asyncTask.reject = reject;
        if (working >= count) {
          queue.push(asyncTask);
        } else {
          runTask(asyncTask);
        }
      });
    }

    function runTask(asyncTask) {
      working++;
      Promise.resolve(asyncTask()).then((data) => {
        working--;
        asyncTask.resolve(data);
        if (queue.length) {
          runTask(queue.shift());
        }
      });
    }

    return addTask;
  }
}

// new Promise((resolve, reject) => {
//   resolve(Promise.resolve());
// })
//   .then(() => console.log("promise1"))
//   .then(() => console.log("promise2"))
//   .then(() => Promise.resolve())
//   .then(() => console.log("promise4"))
//   .then(() => console.log("promise5"));

// new Promise((resolve, reject) => {
//   resolve();
// })
//   .then(() => console.log("promise6"))
//   .then(() => console.log("promise7"))
//   .then(() => console.log("promise8"))
//   .then(() => console.log("promise9"))
//   .then(() => console.log("promise10"))
//   .then(() => console.log("promise11"))
//   .then(() => console.log("promise12"))
//   .then(() => console.log("promise13"));

function sleep(wait) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

function asyncTask(name, awit) {
  console.log(name);
  return new Promise(async (resolve) => {
    await sleep(awit);
    resolve(name);
  });
}

const limit = Promise.limit(1);

(async () => {
  const res = await Promise.all(
    ["name", "age", "other"].map((v, k) =>
      limit(() => asyncTask(v, 2000 * (k + 1)))
    )
  );

  console.log(res);
})();
