// 左偏
function partial(fn, ...prevArgs) {
  return function (...nextArgs) {
    return fn(...prevArgs, ...nextArgs);
  };
}
