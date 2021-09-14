"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
var Container_1 = require("./Container");
function inject(key) {
    return function (target, targetKey, index) {
        if (!targetKey) {
            Reflect.defineMetadata(key, Container_1.Container.getInstance().use(key), target);
        }
    };
}
exports.inject = inject;
