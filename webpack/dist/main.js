(function (graph) {
  function require(filename) {
    function localRequire(relativePath) {
      return require(graph[filename].dependencies[relativePath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[filename].code);
    return exports;
  }

  require("../demo/index.js");
})({
  "../demo/index.js": {
    dependencies: { "./math.js": "../demo/math.js" },
    code: '"use strict";\n\nvar _math = require("./math.js");\n\nconsole.error((0, _math.add)(1, 2));\nconsole.error((0, _math.minus)(1, 2));',
    filename: "../demo/index.js",
  },
  "../demo/math.js": {
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.minus = exports.add = void 0;\n\nvar add = function add(a, b) {\n  return a + b;\n};\n\nexports.add = add;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;',
    filename: "../demo/math.js",
  },
});
