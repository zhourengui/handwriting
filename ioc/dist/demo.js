"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
var otherServiceKey = Symbol.for("otherService");
var OtherService = /** @class */ (function () {
    function OtherService() {
        this.name = "otherService";
    }
    OtherService = __decorate([
        code_1.injectable(otherServiceKey)
    ], OtherService);
    return OtherService;
}());
var OtherController = /** @class */ (function () {
    function OtherController(otherService) {
        this.otherService = otherService;
    }
    OtherController.prototype.handleSend = function () {
        console.log(this.otherService);
    };
    OtherController = __decorate([
        code_1.controller,
        __param(0, code_1.inject(otherServiceKey))
    ], OtherController);
    return OtherController;
}());
var c = new OtherController();
c.handleSend();
