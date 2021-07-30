const pluginName = "ConsoleLogOnBuildWebpackPlugin"

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log("ConsoleLogOnBuildWebpackPlugin")
    })
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin
