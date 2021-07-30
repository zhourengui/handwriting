function cloneRegexp(prevReg) {
  const source = prevReg.source
  const nextReg = new RegExp(source, prevReg.flags)
  nextReg.lastIndex = prevReg.global ? prevReg.lastIndex : 0
  return nextReg
}
// demo
const reg = /a/g
console.log(reg.exec("aaaaaaaaa"))
console.log(reg.exec("aaaaaaaaa"))
console.log(reg.exec("aaaaaaaaa"))
console.log(reg.exec("aaaaaaaaa"))
console.log(reg.exec("aaaaaaaaa"))
console.log(reg.exec("aaaaaaaaa"))
const nextReg = cloneRegexp(reg)
console.log(nextReg.exec("aaaaaaaaa"))
