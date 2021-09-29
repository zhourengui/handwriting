function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
