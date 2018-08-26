import { ObjectSubstitute, OmitProxyMethods } from '@fluffy-spoon/substitute/dist/src/Transformations';
export declare type Constructor<T = any> = {
    new (...args: any[]): T;
};
export declare class Autofaker {
    private _registration;
    private _lastRealType;
    private readonly _registeredFakes;
    constructor();
    useInversionOfControlProvider(provider: InversionOfControlRegistration): void;
    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T): void;
    resolveFakeInstance<T>(type: Constructor<T>): ObjectSubstitute<OmitProxyMethods<T>, T>;
    resolveInstance<T>(type: Constructor<T>): T;
    private extractClassName;
}
export declare abstract class InversionOfControlRegistration {
    abstract registerTypeAsInstanceFromAccessor(type: Constructor<any>, accessor: () => any): void;
    abstract getConstructorArgumentTypesForClass<T extends Constructor>(type: T): Array<Constructor>;
    abstract resolveInstance<T>(type: Constructor<T>): T;
}
