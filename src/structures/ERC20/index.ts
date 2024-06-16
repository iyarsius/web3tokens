import * as abi from "../../abis/ERC20";
import { IERC20Events, IERC20ApproveParams, IERC20TransferParams, IERC20TransferFromParams } from "../../types/ERC20";
import { ContractOperation } from "../../utils/transactions/ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IERC20 {
    on<T extends keyof IERC20Events>(eventName: T, callback: IERC20Events[T]): WatchContractEventReturnType;
    allowance(owner: string, spender: string): Promise<number>;
    approve: ContractOperation<IERC20ApproveParams>;
    balanceOf(account: string): Promise<number>;
    decimals(): Promise<number>;
    name(): Promise<string>;
    symbol(): Promise<string>;
    totalSupply(): Promise<number>;
    transfer: ContractOperation<IERC20TransferParams>;
    transferFrom: ContractOperation<IERC20TransferFromParams>;
}

export class ERC20 implements IERC20 {
    address: Address;

    constructor(public config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IERC20Events>(eventName: T, callback: IERC20Events[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    async allowance(owner: string, spender: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.allowance],
            address: this.address,
            functionName: "allowance",
            args: [owner, spender]
        }) as any
    }

    public approve = new ContractOperation<IERC20ApproveParams>(this.config.client, {
        abi: [abi.approve],
        address: this.config.address,
        functionName: "approve",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    async balanceOf(account: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.balanceOf],
            address: this.address,
            functionName: "balanceOf",
            args: [account]
        }) as any
    }

    async decimals(): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.decimals],
            address: this.address,
            functionName: "decimals",
            args: []
        }) as any
    }

    async name(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.name],
            address: this.address,
            functionName: "name",
            args: []
        }) as any
    }

    async symbol(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.symbol],
            address: this.address,
            functionName: "symbol",
            args: []
        }) as any
    }

    async totalSupply(): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.totalSupply],
            address: this.address,
            functionName: "totalSupply",
            args: []
        }) as any
    }

    public transfer = new ContractOperation<IERC20TransferParams>(this.config.client, {
        abi: [abi.transfer],
        address: this.config.address,
        functionName: "transfer",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    public transferFrom = new ContractOperation<IERC20TransferFromParams>(this.config.client, {
        abi: [abi.transferFrom],
        address: this.config.address,
        functionName: "transferFrom",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
