import * as abi from "../../abis/ERC721";
import { IERC721Events, IERC721ApproveParams, IERC721SafeTransferFromParams, IERC721SetApprovalForAllParams, IERC721TransferFromParams } from "../../types/ERC721";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address } from "viem";

export class ERC721 {
    address: Address;
    /** The name of the token.
     * 
     * Requires `erc721.fetch()` to be called.
     */
    name?: string;
    /** The symbol of the token (usually a shorter version of the name).
     * 
     * Requires `erc721.fetch()` to be called.
     */
    symbol?: string;

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

    async fetch(): Promise<void> {
        const [name, symbol] = await this.config.client.public.multicall({
            contracts: [
                {
                    abi: [abi.name],
                    address: this.address,
                    functionName: "name",
                    args: []
                },
                {
                    abi: [abi.symbol],
                    address: this.address,
                    functionName: "symbol",
                    args: []
                }
            ]
        });

        if (name.status === "failure") throw name.error;
        if (symbol.status === "failure") throw symbol.error;

        this.name = name.result as any;
        this.symbol = symbol.result as any;
    }

    async tokenURI(tokenId: number): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.tokenURI],
            address: this.address,
            functionName: "tokenURI",
            args: [tokenId]
        }) as any
    }

    public approve(args: IERC721ApproveParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.approve],
            args,
            address: this.config.address,
            functionName: "approve",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

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

    async ownerOf(tokenId: number): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.ownerOf],
            address: this.address,
            functionName: "ownerOf",
            args: [tokenId]
        }) as any
    }

    public safeTransferFrom(args: IERC721SafeTransferFromParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.safeTransferFrom],
            args,
            address: this.config.address,
            functionName: "safeTransferFrom",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

    public setApprovalForAll(args: IERC721SetApprovalForAllParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.setApprovalForAll],
            args,
            address: this.config.address,
            functionName: "setApprovalForAll",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

    async supportsInterface(interfaceId: string): Promise<boolean> {
        return await this.config.client.public.readContract({
            abi: [abi.supportsInterface],
            address: this.address,
            functionName: "supportsInterface",
            args: [interfaceId]
        }) as any
    }

    public transferFrom(args: IERC721TransferFromParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.transferFrom],
            args,
            address: this.config.address,
            functionName: "transferFrom",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

}
