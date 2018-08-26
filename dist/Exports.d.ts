export declare type Constructor<T = any> = {
    new (...args: any[]): T;
};
export interface IAutofaker {
    useProvider(provider: InversionOfControlRegistration | FakeGenerator): void;
    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T): void;
}
export declare class Autofaker implements IAutofaker {
    private _registration;
    private _fakeGenerator;
    useProvider(provider: InversionOfControlRegistration | FakeGenerator): void;
    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T): void;
}
export declare abstract class InversionOfControlRegistration {
    abstract registerTypeAsInstanceFromAccessor(type: Constructor<any>, accessor: () => any): void;
    abstract getConstructorArgumentTypesForClass<T extends Constructor>(type: T): Array<Constructor>;
}
export declare abstract class FakeGenerator {
    abstract generateFakeInstanceFactories<T extends Constructor>(type: T): Array<FakeInstanceFactory>;
}
export declare class FakeInstanceFactory {
    private _type;
    private _accessor;
    readonly type: Constructor<any>;
    readonly accessor: () => any;
    constructor(_type: Constructor, _accessor: () => any);
}
