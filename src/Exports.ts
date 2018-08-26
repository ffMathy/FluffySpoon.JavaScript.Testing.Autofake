export type Constructor<T = any> = { new(...args): T };

export interface IAutofaker {
    useProvider(provider: InversionOfControlRegistration|FakeGenerator): void;
    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T): void;
}

export class Autofaker implements IAutofaker {
    private _registration: InversionOfControlRegistration;
    private _fakeGenerator: FakeGenerator;

    useProvider(provider: InversionOfControlRegistration|FakeGenerator) {
        if(provider instanceof InversionOfControlRegistration)
            this._registration = provider;
        else if(provider instanceof FakeGenerator)
            this._fakeGenerator = provider;
        else
            throw new Error('The given value is not a valid provider.');
    }

    registerFakesForConstructorParameterTypesOf<T extends Constructor>(type: T) {
        if(!this._registration)
            throw new Error('An Inversion of Control registration must be specified.');
        
        if(!this._fakeGenerator)
            throw new Error('A fake generator must be specified.');
        
        const argumentTypes = this._registration.getConstructorArgumentTypesForClass(type);
        for(let argumentType of argumentTypes) {
            const fakeInstanceFactories = this._fakeGenerator.generateFakeInstanceFactories(argumentType);
            for(let fakeInstanceFactory of fakeInstanceFactories) {
                this._registration.registerTypeAsInstanceFromAccessor(
                    fakeInstanceFactory.type, 
                    fakeInstanceFactory.accessor);
            }
        }
    }
}

export abstract class InversionOfControlRegistration {
    abstract registerTypeAsInstanceFromAccessor(type: Constructor<any>, accessor: () => any): void;
    abstract getConstructorArgumentTypesForClass<T extends Constructor>(type: T): Array<Constructor>;
}

export abstract class FakeGenerator {
    abstract generateFakeInstanceFactories<T extends Constructor>(type: T): Array<FakeInstanceFactory>;
}

export class FakeInstanceFactory {
    public get type() { return this._type; }
    public get accessor() { return this._accessor; }

    constructor(
        private _type: Constructor,
        private _accessor: () => any) 
    {
        
    }
}