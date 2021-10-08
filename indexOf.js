String.prototype.indexOf = function (target) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === target) {
      return i;
    }
  }

  return -1;
};
