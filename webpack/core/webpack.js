// 1. 生成compiler实例
// 2. 注册插件
const Compiler = require("./Compiler.js")
module.exports = function webpack(options) {
  const compiler = new Compiler(options)
  // 注册插件
  if (Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      plugin.apply(compiler)
    }
  }
  return compiler
}
