;(function (graph) {
  function require(entry) {
    function localRequire(path) {
      return require(graph[entry].dependencies[path])
    }
    const exports = {}
    ;(function (require, exports, code) {
      eval(code)
    })(localRequire, exports, graph[entry].code)
    return exports
  }
  require("../src/index.js")
})({
  "../src/index.js": {
    filePath: "../src/index.js",
    dependencies: {
      "./minus.js": "../src/minus.js",
      "./plus.js": "../src/plus.js",
    },
    code: '"use strict";\n\nvar _minus = require("./minus.js");\n\nvar _plus = require("./plus.js");\n\nconsole.log((0, _minus.minus)(1)(2));\nconsole.log((0, _plus.plus)(1)(2));',
  },
  "../src/minus.js": {
    filePath: "../src/minus.js",
    dependencies: { "./curry.js": "../src/curry.js" },
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.minus = void 0;\n\nvar _curry = require("./curry.js");\n\nvar minus = (0, _curry.curry)(function (a, b) {\n  return a - b;\n});\nexports.minus = minus;',
  },
  "../src/plus.js": {
    filePath: "../src/plus.js",
    dependencies: { "./curry.js": "../src/curry.js" },
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.plus = void 0;\n\nvar _curry = require("./curry.js");\n\nvar plus = (0, _curry.curry)(function (a, b) {\n  return a + b;\n});\nexports.plus = plus;',
  },
  "../src/curry.js": {
    filePath: "../src/curry.js",
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.curry = void 0;\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar curry = function curry(fn) {\n  var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.length;\n\n  var _nextCurried = arguments.length > 2 ? arguments[2] : undefined;\n\n  return (_nextCurried = function nextCurried(prevArgs) {\n    return function (nextArgs) {\n      var args = [].concat(_toConsumableArray(prevArgs), [nextArgs]);\n      return args.length >= arity ? fn.apply(void 0, _toConsumableArray(args)) : _nextCurried(args);\n    };\n  })([]);\n};\n\nexports.curry = curry;',
  },
})
