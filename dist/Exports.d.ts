import { ObjectSubstitute, OmitProxyMethods } from '@fluffy-spoon/substitute/dist/src/Transformations';
export declare type Constructor<T = any> = {
    new (...args: any[]): T;
};
export interface IAutofaker {
    useInversionOfControlProvider(provider: InversionOfControlRegistration): void;
    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T): void;
}
export declare class Autofaker implements IAutofaker {
    private _registration;
    private readonly _registeredFakes;
    constructor();
    useInversionOfControlProvider(provider: InversionOfControlRegistration): void;
    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T): void;
    resolveFakeInstance<T extends Constructor>(type: T): ObjectSubstitute<OmitProxyMethods<T>, T>;
    resolveInstance<T extends Constructor>(type: T): T;
}
export declare abstract class InversionOfControlRegistration {
    abstract registerTypeAsInstanceFromAccessor(type: Constructor<any>, accessor: () => any): void;
    abstract getConstructorArgumentTypesForClass<T extends Constructor>(type: T): Array<Constructor>;
    abstract resolveInstance<T extends Constructor>(type: T): T;
}
