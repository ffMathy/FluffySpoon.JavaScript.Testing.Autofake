import Substitute from '@fluffy-spoon/substitute';

import { ObjectSubstitute, OmitProxyMethods } from '@fluffy-spoon/substitute/dist/src/Transformations';

export type Constructor<T = any> = { new(...args): T };

export class Autofaker {
    private _registration: InversionOfControlRegistration;
    private _hasResolvedRealInstance: boolean;

    private readonly _registeredFakes: Array<{
        registered: Constructor,
        containing: Constructor
    }>;

    constructor() {
        this._registeredFakes = new Array();
        this._hasResolvedRealInstance = false;
    }

    useInversionOfControlProvider(provider: InversionOfControlRegistration) {
        if(provider instanceof InversionOfControlRegistration)
            this._registration = provider;
        else
            throw new Error('The given value is not a valid Inversion of Control provider.');
    }

    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T) {
        if(!this._registration)
            throw new Error('An Inversion of Control provider must be set up first.');
        
        const argumentTypes = this._registration.getConstructorArgumentTypesForClass(type);
        for(let argumentType of argumentTypes) {
            this._registeredFakes.push({
                containing: type,
                registered: argumentType
            });

            const instance = Substitute.for();
            this._registration.registerTypeAsInstanceFromAccessor(argumentType, () => instance);
        }
    }

    resolveFakeInstance<T>(type: Constructor<T>): ObjectSubstitute<OmitProxyMethods<T>, T> {
        const registered = this._registeredFakes.filter(x => x.registered === type)[0];
        if(!registered)
            throw new Error('The instance that was created from the requested type ' + ((type as any).name || type) + ' has not been registered as a fake. Perhaps it is no longer a dependency in the constructor of a class? Use the resolveInstance method instead if this was intentional.');

        if(this._hasResolvedRealInstance)
            throw new Error(`Calling resolveFakeInstance after a resolveInstance call can have unintended side-effects and is not allowed. Make sure you resolve all your fake instances before resolving the real one.`);

        const instance = this._registration.resolveInstance(type);
        return instance as any;
    }

    resolveInstance<T>(type: Constructor<T>): T {
        const registered = this._registeredFakes.filter(x => x.registered === type)[0];
        if(registered)
            throw new Error('The instance that was created from the requested type ' + ((type as any).name || type) + ' has been registered as a fake because it is a dependency in the class ' + ((registered.containing as any).name || registered.containing) + '. Use the resolveFakeInstance method instead if this was intentional.');

        this._hasResolvedRealInstance = true;

        const instance = this._registration.resolveInstance(type);
        return instance as any;
    }
}

export abstract class InversionOfControlRegistration {
    abstract registerTypeAsInstanceFromAccessor(type: Constructor<any>, accessor: () => any): void;
    abstract getConstructorArgumentTypesForClass<T extends Constructor>(type: T): Array<Constructor>;
    abstract resolveInstance<T>(type: Constructor<T>): T;
}