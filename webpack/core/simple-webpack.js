const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

function moduleAnalyser(filename) {
  const sourceCode = fs.readFileSync(filename, "utf-8");

  const ast = parse(sourceCode, {
    sourceType: "module",
  });

  const dependencies = {};

  traverse(ast, {
    ImportDeclaration({
      node: {
        source: { value },
      },
    }) {
      const dirname = path.dirname(filename);
      dependencies[value] = path.join(dirname, value);
    },
  });

  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    dependencies,
    code,
    filename,
  };
}

function makeDependenciesGraph(filename) {
  const entryModule = moduleAnalyser(filename);
  const graphArr = [entryModule];
  for (let i = 0; i < graphArr.length; i++) {
    const { dependencies } = graphArr[i];
    if (dependencies) {
      for (const key in dependencies) {
        if (Object.hasOwnProperty.call(dependencies, key)) {
          graphArr.push(moduleAnalyser(dependencies[key]));
        }
      }
    }
  }

  return graphArr.reduce(
    (prev, next) => ({ ...prev, [next.filename]: { ...next } }),
    {}
  );
}

function generateCode(filename) {
  const graph = JSON.stringify(makeDependenciesGraph(filename));
  return `(function(graph) {
    function require(filename) {
      function localRequire(relativePath) {
        return require(graph[filename].dependencies[relativePath])
      }
      var exports = {};
      ;(function(require, exports, code) {
        eval(code);
      }) (localRequire, exports, graph[filename].code);
      return exports;
    }

    require("${filename}")
  })(${graph});`;
}

console.log(generateCode("../demo/index.js"));
