import * as abi from "../../abis/access/AccessManaged";
import { IAccessManagedEvents, IAccessManagedSetAuthorityParams } from "../../types/access/AccessManaged";
import { ContractOperation } from "../../utils/transactions/ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IAccessManaged {
    on<T extends keyof IAccessManagedEvents>(eventName: T, callback: IAccessManagedEvents[T]): WatchContractEventReturnType;
    authority(): Promise<string>;
    isConsumingScheduledOp(): Promise<string>;
    setAuthority: ContractOperation<IAccessManagedSetAuthorityParams>;
}

export class AccessManaged implements IAccessManaged {
    address: Address;

    constructor(public config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IAccessManagedEvents>(eventName: T, callback: IAccessManagedEvents[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    async authority(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.authority],
            address: this.address,
            functionName: "authority",
            args: []
        }) as any
    }

    async isConsumingScheduledOp(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.isConsumingScheduledOp],
            address: this.address,
            functionName: "isConsumingScheduledOp",
            args: []
        }) as any
    }

    public setAuthority = new ContractOperation<IAccessManagedSetAuthorityParams>(this.config.client, {
        abi: [abi.setAuthority],
        address: this.config.address,
        functionName: "setAuthority",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
