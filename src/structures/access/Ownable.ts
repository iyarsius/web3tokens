import * as abi from "../../abis/access/Ownable";
import { IOwnableEvents, IOwnableRenounceOwnershipParams, IOwnableTransferOwnershipParams } from "../../types/access/Ownable";
import { ContractOperation } from "../../utils/transactions/ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IOwnable {
    on<T extends keyof IOwnableEvents>(eventName: T, callback: IOwnableEvents[T]): WatchContractEventReturnType;
    owner(): Promise<string>;
    renounceOwnership: ContractOperation<IOwnableRenounceOwnershipParams>;
    transferOwnership: ContractOperation<IOwnableTransferOwnershipParams>;
}

export class Ownable implements IOwnable {
    address: Address;

    constructor(public config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IOwnableEvents>(eventName: T, callback: IOwnableEvents[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    async owner(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.owner],
            address: this.address,
            functionName: "owner",
            args: []
        }) as any
    }

    public renounceOwnership = new ContractOperation<IOwnableRenounceOwnershipParams>(this.config.client, {
        abi: [abi.renounceOwnership],
        address: this.config.address,
        functionName: "renounceOwnership",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    public transferOwnership = new ContractOperation<IOwnableTransferOwnershipParams>(this.config.client, {
        abi: [abi.transferOwnership],
        address: this.config.address,
        functionName: "transferOwnership",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
