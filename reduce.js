Array.prototype.reduce = function (callback, initState) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.reduce called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("The first parameter must be a function");
  }

  if (!this.length && !initState) {
    throw new Error("Reduce of empty array with no initial value");
  }

  if (initState && !this.length) {
    return initState;
  }

  let preState = initState || this[0];
  let p = initState ? 0 : 1;

  while (p < this.length) {
    preState = callback(preState, this[p], p, this);
    p++;
  }

  return preState;
};
