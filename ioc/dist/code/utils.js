"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParams = void 0;
var esprima_1 = require("esprima");
function getParams(fn) {
    var ast = esprima_1.parseScript(fn.toString(), {});
    var node = ast.body[0];
    var params = [];
    var validParams = [];
    if (node.type === "FunctionDeclaration") {
        params = node.params;
    }
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var item = params_1[_i];
        validParams.push(item.name);
    }
    return validParams;
}
exports.getParams = getParams;
