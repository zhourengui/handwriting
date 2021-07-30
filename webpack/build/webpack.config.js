const path = require("path")
const ConsoleLogOnBuildWebpackPlugin = require("./plugins/ConsoleLogOnBuildWebpackPlugin.js")

module.exports = {
  entry: "../src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js",
  },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
}
