Function.prototype.call = function (context) {
  const args = [];
  context = context ? Object(context) : globalThis;
  context.fn = this;
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  const res = eval(`context.fn(${args})`);
  delete context.fn;
  return res;
};

// demo
function fn1(a, b, c) {
  console.error(a, b, c);
}
fn1.call(null, 1, 2, 3);
