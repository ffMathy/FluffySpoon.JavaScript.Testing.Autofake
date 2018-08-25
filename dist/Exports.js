"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Autofaker = /** @class */ (function () {
    function Autofaker() {
    }
    Autofaker.prototype.use = function (provider) {
        if (provider instanceof InversionOfControlRegistration)
            this._registration = provider;
        else if (provider instanceof FakeGenerator)
            this._fakeGenerator = provider;
        else
            throw new Error('The given value is not a valid provider.');
    };
    Autofaker.prototype.registerFakesForConstructorParameterTypesOf = function (type) {
        if (!this._registration)
            throw new Error('An Inversion of Control registration must be specified.');
        if (!this._fakeGenerator)
            throw new Error('A fake generator must be specified.');
        var argumentTypes = this._registration.getConstructorArgumentTypesForClass(type);
        for (var _i = 0, argumentTypes_1 = argumentTypes; _i < argumentTypes_1.length; _i++) {
            var argumentType = argumentTypes_1[_i];
            var fakeInstanceFactories = this._fakeGenerator.generateFakeInstanceFactories(argumentType);
            for (var _a = 0, fakeInstanceFactories_1 = fakeInstanceFactories; _a < fakeInstanceFactories_1.length; _a++) {
                var fakeInstanceFactory = fakeInstanceFactories_1[_a];
                this._registration.registerTypeAsInstanceFromAccessor(fakeInstanceFactory.type, fakeInstanceFactory.accessor);
            }
        }
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
var FakeGenerator = /** @class */ (function () {
    function FakeGenerator() {
    }
    return FakeGenerator;
}());
exports.FakeGenerator = FakeGenerator;
var FakeInstanceFactory = /** @class */ (function () {
    function FakeInstanceFactory(_type, _accessor) {
        this._type = _type;
        this._accessor = _accessor;
    }
    Object.defineProperty(FakeInstanceFactory.prototype, "type", {
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FakeInstanceFactory.prototype, "accessor", {
        get: function () { return this._accessor; },
        enumerable: true,
        configurable: true
    });
    return FakeInstanceFactory;
}());
exports.FakeInstanceFactory = FakeInstanceFactory;
//# sourceMappingURL=Exports.js.map