function fetchTimeout(fn, timeout) {
  return function () {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        reject();
      }, timeout);
      return fn.apply(this, arguments).then(resovle, reject);
    });
  };
}
