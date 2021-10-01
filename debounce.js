function debounce(fn, wait = 0) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}
