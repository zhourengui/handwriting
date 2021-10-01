function throttle(fn, wait) {
  let isFirst = true,
    timer,
    execTime = +new Date(),
    diffTime;
  return function (...args) {
    if (isFirst) {
      fn(...args);
      execTime = +new Date();
      isFirst = false;
    } else {
      diffTime = +new Date() - execTime;
      if (diffTime >= wait) {
        fn(...args);
        execTime = +new Date();
      } else {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          fn(...args);
          execTime = +new Date();
        }, wait - diffTime);
      }
    }
  };
}

// demo
const fn = throttle(() => console.log(1), 1000);

while (true) {
  fn();
}
