let pending = false,
  callbacks = [];

const timerFunc = () => {
  Promise.resolve().then(flushCallbacks);
};

const flushCallbacks = () => {
  pending = false;
  for (const callback of callbacks) {
    callback();
  }
};

// Promise.then、MutationOberser、SetImmediate、SetTimeout

function nextTick(cb, ctx) {
  let _resolve;

  callbacks.push(() => {
    if (cb) {
      cb.call(ctx);
    } else {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  }

  if (!cb) {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
