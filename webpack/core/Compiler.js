// 1. 挂载options
// 2. 挂载入口modules
// 3. 挂载hooks
const { SyncHook } = require("tapable")
const Compilation = require("./Compilation.js")
const fs = require("fs")
const path = require("path")
class Compiler {
  constructor(options) {
    this.options = options
    this.options.entry = path.join("", this.options.entry)
    // 多入口需要从这里定义入口模块
    // this.modules = []
    this.hooks = {
      run: new SyncHook(["compilation"]),
    }
  }

  run() {
    const onCompilate = (compilation) => {
      // 编译完成之后，生成静态文件
      this.emitAssets(compilation)
    }
    this.compiler(onCompilate)
  }

  compiler(callback) {
    // 1. 生成compilation
    const compilation = new Compilation(this)
    // 2. 执行run钩子
    this.hooks.run.call(compilation)
    // 3. 调用compiler编译
    compilation.seal(callback)
  }

  emitAssets(compilation) {
    const { dependenciesGraph: graph } = compilation

    const template = `
      (function(graph) {
        function require(module) {
          function localRequire(relativePath) {
            return require(graph[module].dependencies[relativePath])
          }
          const exports = {}
          ;(function(require, exports, code) {
            eval(code)
          })(localRequire, exports, graph[module].code)
          return exports
        }

        require("${this.options.entry}")
      })(${JSON.stringify(graph)})
    `
    fs.writeFileSync(
      path.join(this.options.output.path, this.options.output.filename),
      template
    )
  }
}

module.exports = Compiler
