const Parser = require("./Parser.js")
class Compilation {
  constructor(compiler) {
    const { options } = compiler
    this.options = options
  }

  seal(callback) {
    this.dependenciesGraph = this.makeDependenciesGraph(this.options.entry)
    callback(this)
  }

  moduleAnalyser(filename) {
    const ast = Parser.ast(filename)
    const dependencies = Parser.dependencies(ast, filename)
    const code = Parser.transformFromAst(ast)
    return {
      filename,
      dependencies,
      code,
    }
  }

  makeDependenciesGraph(entry) {
    const entryModule = this.moduleAnalyser(entry)
    const grapArr = [entryModule]
    for (let i = 0; i < grapArr.length; i++) {
      let { dependencies } = grapArr[i]

      if (dependencies) {
        for (const key in dependencies) {
          if (Object.hasOwnProperty.call(dependencies, key)) {
            grapArr.push(this.moduleAnalyser(dependencies[key]))
          }
        }
      }
    }
    return grapArr.reduce(
      (prev, next) => ({ ...prev, [next.filename]: next }),
      {}
    )
  }
}

module.exports = Compilation
