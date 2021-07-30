String.prototype.indexOf = function (str) {
  const reg = new RegExp(str)
  const execRet = reg.exec(this)
  return execRet === null ? -1 : execRet.index
}
