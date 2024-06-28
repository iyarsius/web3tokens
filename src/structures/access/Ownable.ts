import * as abi from "../../abis/access/Ownable";
import { IOwnable, IOwnableEvents, IOwnableRenounceOwnershipParams, IOwnableTransferOwnershipParams } from "../../types/access/Ownable";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address } from "viem";

export class Ownable implements IOwnable {
    address: Address;

    constructor(protected config: IContractConfig) {
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

    public renounceOwnership(args: IOwnableRenounceOwnershipParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.renounceOwnership],
            args,
            address: this.config.address,
            functionName: "renounceOwnership",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    };

    public transferOwnership(args: IOwnableTransferOwnershipParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.transferOwnership],
            args,
            address: this.config.address,
            functionName: "transferOwnership",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    };
}
