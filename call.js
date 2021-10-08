Function.prototype.call = function (context) {
  const key = Symbol("fn");
  const args = [];

  context = context ? Object(context) : globalThis;
  context[key] = this;

  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }

  const res = eval(`context[key](${args})`);

  delete context[key];

  return res;
};

// demo
function fn1(a, b, c) {
  console.error(a, b, c);
}
fn1.call(null, 1, 2, 3);
