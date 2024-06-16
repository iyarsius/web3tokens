import { IContractConfig } from "../types/Contracts";

export class ContractBuilder {
    constructor(protected instance: any) { };

    protected setExtension(extension: any) {
        Object.getOwnPropertyNames(this.instance).forEach(key => {
            if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
                Object.defineProperty(extension, key, Object.getOwnPropertyDescriptor(this.instance, key)!);
            }
        });

        return this as any;
    };

    protected build(config: IContractConfig): any {
        return new (this.instance)(config)
    }
};