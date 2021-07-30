"use strict"

const utils = require("loader-utils")
const acorn = require("acorn")
const walk = require("acorn-walk")
const MagicString = require("magic-string")

module.exports = function (source) {
  const options = utils.getOptions(this)
  const ast = acorn.parse(source)
  const code = new MagicString(source)
  walk.simple(ast, {
    Var(node) {
      const { start } = node
      code.overwrite(start, start + 5, "var")
    },
  })

  return code.toString()
}
