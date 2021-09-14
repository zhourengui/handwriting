"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var Container = /** @class */ (function () {
    function Container() {
        this.containers = new Map();
    }
    Container.prototype.bind = function (key, Fn, single) {
        var callback = function () { return new Fn(); };
        var _instance = { fn: callback, single: single, instance: null };
        this.containers.set(key, _instance);
    };
    Container.prototype.delete = function (key) {
        this.containers.delete(key);
    };
    Container.prototype.use = function (key) {
        var container = this.containers.get(key);
        if (container) {
            if (container.single && container.instance === null) {
                container.instance = container.fn();
            }
            return container.single ? container.instance : container.fn();
        }
        throw new Error("找不到容器");
    };
    Container.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        return (this.instance = new Container());
    };
    return Container;
}());
exports.Container = Container;
