Function.prototype.apply = function (context) {
  context = context ? Object(context) : globalThis;
  context.fn = this;
  const res = context.fn(arguments[1]);
  delete context.fn;
  return res;
};

function sum(c) {
  console.log(c);
  return this.a + this.b;
}
console.error(sum.apply({ a: 1, b: 3 }, [1, 2]));
