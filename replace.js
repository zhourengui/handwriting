String.prototype.replaces = function (prevReg, callback) {
  let str = this,
    nextReg = prevReg instanceof RegExp ? prevReg : new RegExp(prevReg),
    args = [],
    execRet,
    replaceStr = "";

  while (true) {
    execRet = nextReg.exec(str);

    if (execRet === null) break;

    args = Object.entries(execRet).map(([_, val]) => val);

    replaceStr = callback(...args);

    str =
      str.substring(0, execRet.index) +
      replaceStr +
      str.substring(execRet.index + execRet[0].length);

    if (!nextReg.global) break;
  }

  return str;
};
const str = "asdfgshjkl".replaces(/(?<name>s)/g, function (...args) {
  return "Tencent";
});

console.error(str);
