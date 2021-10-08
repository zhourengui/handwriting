Function.prototype.bind = function (context) {
  const _this = this;
  const prevArgs = Array.prototype.slice.call(arguments, 1);

  function BindFn() {
    const nextArgs = Array.prototype.slice.call(arguments);
    const res = _this.apply(
      this instanceof BindFn ? this : context,
      prevArgs.concat(nextArgs)
    );

    return res instanceof BindFn ? (typeof res === "object" ? res : this) : res;
  }

  BindFn.prototype = Object.create(this.prototype);
  BindFn.prototype.constructor = BindFn;

  return BindFn;
};

// demo
function fn1() {
  console.error(this.name);
  this.name = 123;
}

fn1.prototype.age = 30;

const bindFn = fn1.bind({ name: "Tencent" });
console.error(bindFn());
console.log(bindFn.prototype);
console.error(new bindFn());
