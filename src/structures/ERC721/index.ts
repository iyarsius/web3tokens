import * as abi from "../../abis/ERC721";
import { IERC721Events, IERC721ApproveParams, IERC721SafeTransferFromParams, IERC721SetApprovalForAllParams, IERC721TransferFromParams } from "../../types/ERC721";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export class ERC721 {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IERC721Events>(eventName: T, callback: IERC721Events[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    public approve = new ContractOperation<IERC721ApproveParams>(this.config.client, {
        abi: [abi.approve],
        address: this.config.address,
        functionName: "approve",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    async balanceOf(owner: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.balanceOf],
            address: this.address,
            functionName: "balanceOf",
            args: [owner]
        }) as any
    }

    async getApproved(tokenId: number): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.getApproved],
            address: this.address,
            functionName: "getApproved",
            args: [tokenId]
        }) as any
    }

    async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return await this.config.client.public.readContract({
            abi: [abi.isApprovedForAll],
            address: this.address,
            functionName: "isApprovedForAll",
            args: [owner, operator]
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

    async ownerOf(tokenId: number): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.ownerOf],
            address: this.address,
            functionName: "ownerOf",
            args: [tokenId]
        }) as any
    }

    public safeTransferFrom = new ContractOperation<IERC721SafeTransferFromParams>(this.config.client, {
        abi: [abi.safeTransferFrom],
        address: this.config.address,
        functionName: "safeTransferFrom",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    public setApprovalForAll = new ContractOperation<IERC721SetApprovalForAllParams>(this.config.client, {
        abi: [abi.setApprovalForAll],
        address: this.config.address,
        functionName: "setApprovalForAll",
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

    async symbol(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.symbol],
            address: this.address,
            functionName: "symbol",
            args: []
        }) as any
    }

    async tokenURI(tokenId: number): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.tokenURI],
            address: this.address,
            functionName: "tokenURI",
            args: [tokenId]
        }) as any
    }

    public transferFrom = new ContractOperation<IERC721TransferFromParams>(this.config.client, {
        abi: [abi.transferFrom],
        address: this.config.address,
        functionName: "transferFrom",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
