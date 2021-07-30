// 1.调用webpack 返回compiler
// 2.执行compiler.run
const options = require("../build/webpack.config.js")
const webpack = require("./webpack.js")

const compiler = webpack(options)
compiler.run()
