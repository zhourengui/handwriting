const { parse } = require("@babel/parser")
const traverse = require("@babel/traverse").default
const path = require("path")
const babel = require("@babel/core")
const fs = require("fs")

class Parser {
  static ast(filePath) {
    const content = fs.readFileSync(filePath, "utf-8")
    const ast = parse(content, {
      sourceType: "module",
    })
    return ast
  }
  static dependencies(ast, parentPath) {
    const dependencies = {}
    traverse(ast, {
      ImportDeclaration({
        node: {
          source: { value },
        },
      }) {
        const dirname = path.dirname(parentPath)
        dependencies[value] = `${path.join(dirname, value)}`
      },
    })
    return dependencies
  }
  static transformFromAst(ast) {
    const { code } = babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    })
    return code
  }
}

module.exports = Parser
