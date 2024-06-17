import * as abi from "../../abis/access/AccessControl";
import { IAccessControlEvents, IAccessControlGrantRoleParams, IAccessControlRenounceRoleParams, IAccessControlRevokeRoleParams } from "../../types/access/AccessControl";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IAccessControl {
    on<T extends keyof IAccessControlEvents>(eventName: T, callback: IAccessControlEvents[T]): WatchContractEventReturnType;
    DEFAULT_ADMIN_ROLE(): Promise<string>;
    getRoleAdmin(role: string): Promise<string>;
    grantRole: ContractOperation<IAccessControlGrantRoleParams>;
    hasRole(role: string, account: string): Promise<boolean>;
    renounceRole: ContractOperation<IAccessControlRenounceRoleParams>;
    revokeRole: ContractOperation<IAccessControlRevokeRoleParams>;
    supportsInterface(interfaceId: string): Promise<boolean>;
}

export class AccessControl implements IAccessControl {
    address: Address;

    constructor(public config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IAccessControlEvents>(eventName: T, callback: IAccessControlEvents[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    async DEFAULT_ADMIN_ROLE(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.DEFAULT_ADMIN_ROLE],
            address: this.address,
            functionName: "DEFAULT_ADMIN_ROLE",
            args: []
        }) as any
    }

    async getRoleAdmin(role: string): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.getRoleAdmin],
            address: this.address,
            functionName: "getRoleAdmin",
            args: [role]
        }) as any
    }

    public grantRole = new ContractOperation<IAccessControlGrantRoleParams>(this.config.client, {
        abi: [abi.grantRole],
        address: this.config.address,
        functionName: "grantRole",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    async hasRole(role: string, account: string): Promise<boolean> {
        return await this.config.client.public.readContract({
            abi: [abi.hasRole],
            address: this.address,
            functionName: "hasRole",
            args: [role, account]
        }) as any
    }

    public renounceRole = new ContractOperation<IAccessControlRenounceRoleParams>(this.config.client, {
        abi: [abi.renounceRole],
        address: this.config.address,
        functionName: "renounceRole",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    public revokeRole = new ContractOperation<IAccessControlRevokeRoleParams>(this.config.client, {
        abi: [abi.revokeRole],
        address: this.config.address,
        functionName: "revokeRole",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    async supportsInterface(interfaceId: string): Promise<boolean> {
        return await this.config.client.public.readContract({
            abi: [abi.supportsInterface],
            address: this.address,
            functionName: "supportsInterface",
            args: [interfaceId]
        }) as any
    }

}
