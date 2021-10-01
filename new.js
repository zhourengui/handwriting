function mockNew() {
  const constructor = Array.prototype.shift.call(arguments);
  const __proto__ = Object.create(constructor.prototype);
  const res = constructor.apply(__proto__, arguments);
  return typeof res === "object" ? res : __proto__;
}
// demo
function fn1() {}
fn1.prototype.name = "Tencent";
console.error(mockNew(fn1).__proto__);
