Function.prototype.apply = function (context) {
  context = context ? Object(context) : globalThis;
  const key = Symbol("fn");
  context[key] = this;
  const res = context[key](...arguments[1]);
  delete context[key];
  return res;
};

function sum(c) {
  console.log(c);
  return this.a + this.b;
}
console.error(sum.apply({ a: 1, b: 3 }, [1, 2]));
