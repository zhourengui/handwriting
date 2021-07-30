function mockNew() {
  const Constructor = Array.prototype.shift.call(arguments)
  const _obj = Object.create(Constructor.prototype)
  const res = Constructor.apply(_obj, arguments)
  return typeof res === "object" ? res : _obj
}
// demo
function fn1() {}
fn1.prototype.name = "Tencent"
console.error(mockNew(fn1).__proto__)
