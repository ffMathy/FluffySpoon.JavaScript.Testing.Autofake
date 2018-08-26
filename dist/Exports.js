"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var substitute_1 = __importDefault(require("@fluffy-spoon/substitute"));
var Autofaker = /** @class */ (function () {
    function Autofaker() {
    }
    Autofaker.prototype.useInversionOfControlProvider = function (provider) {
        if (provider instanceof InversionOfControlRegistration)
            this._registration = provider;
        else
            throw new Error('The given value is not a valid Inversion of Control provider.');
    };
    Autofaker.prototype.registerFakesForConstructorParameterTypesOf = function (type) {
        if (!this._registration)
            throw new Error('An Inversion of Control provider must be set up first.');
        var argumentTypes = this._registration.getConstructorArgumentTypesForClass(type);
        var _loop_1 = function (argumentType) {
            var instance = substitute_1.default.for();
            this_1._registration.registerTypeAsInstanceFromAccessor(argumentType, function () { return instance; });
        };
        var this_1 = this;
        for (var _i = 0, argumentTypes_1 = argumentTypes; _i < argumentTypes_1.length; _i++) {
            var argumentType = argumentTypes_1[_i];
            _loop_1(argumentType);
        }
    };
    Autofaker.prototype.resolveFakeInstance = function (type) {
        var instance = this._registration.resolveInstance(type);
        return instance;
    };
    Autofaker.prototype.resolveInstance = function (type) {
        var instance = this._registration.resolveInstance(type);
        return instance;
    };
    return Autofaker;
}());
exports.Autofaker = Autofaker;
var InversionOfControlRegistration = /** @class */ (function () {
    function InversionOfControlRegistration() {
    }
    return InversionOfControlRegistration;
}());
exports.InversionOfControlRegistration = InversionOfControlRegistration;
//# sourceMappingURL=Exports.js.map