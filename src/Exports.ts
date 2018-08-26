import Substitute from '@fluffy-spoon/substitute';
import { ObjectSubstitute, OmitProxyMethods } from '@fluffy-spoon/substitute/dist/src/Transformations';

export type Constructor<T = any> = { new(...args): T };

export interface IAutofaker {
    useInversionOfControlProvider(provider: InversionOfControlRegistration): void;
    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T): void;
}

export class Autofaker implements IAutofaker {
    private _registration: InversionOfControlRegistration;

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
            const instance = Substitute.for();
            this._registration.registerTypeAsInstanceFromAccessor(argumentType, () => instance);
        }
    }

    resolveFakeInstance<T extends Constructor>(type: T): ObjectSubstitute<OmitProxyMethods<T>, T> {
        const instance = this._registration.resolveInstance(type);
        return instance as any;
    }

    resolveInstance<T extends Constructor>(type: T): T {
        const instance = this._registration.resolveInstance(type);
        return instance as any;
    }
}

export abstract class InversionOfControlRegistration {
    abstract registerTypeAsInstanceFromAccessor(type: Constructor<any>, accessor: () => any): void;
    abstract getConstructorArgumentTypesForClass<T extends Constructor>(type: T): Array<Constructor>;
    abstract resolveInstance<T extends Constructor>(type: T): T;
}