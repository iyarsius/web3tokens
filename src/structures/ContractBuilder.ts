import { IContractConfig } from "../types/Contracts";

type Constructor<T = {}> = new (...args: any[]) => T;

function mix(Base1: Constructor, Base2: Constructor) {
    class Mixed extends Base1 {
        constructor(...args: any[]) {
            super(...args);
        }
    }

    Object.getOwnPropertyNames(Base2.prototype).forEach(name => {
        if (name !== 'constructor') {
            Object.defineProperty(
                Mixed.prototype,
                name,
                Object.getOwnPropertyDescriptor(Base2.prototype, name) || Object.create(null)
            );
        }
    });

    return Mixed as Constructor;
}

export class ContractBuilder {
    constructor(protected instance: any) { };

    protected setExtension(extension: any): any {
        this.instance = mix(this.instance, extension);
        return this as any;
    };

    protected build(config: IContractConfig): any {
        return new (this.instance)(config)
    };
};