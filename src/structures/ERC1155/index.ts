import * as abi from "../../abis/ERC1155";
import { IERC1155Events, IERC1155SafeBatchTransferFromParams, IERC1155SafeTransferFromParams, IERC1155SetApprovalForAllParams } from "../../types/ERC1155";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address } from "viem";

export class ERC1155 {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IERC1155Events>(eventName: T, callback: IERC1155Events[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    async balanceOf(account: string, id: number): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.balanceOf],
            address: this.address,
            functionName: "balanceOf",
            args: [account, id]
        }) as any
    }

    async balanceOfBatch(accounts: string[], ids: number[]): Promise<number[]> {
        return await this.config.client.public.readContract({
            abi: [abi.balanceOfBatch],
            address: this.address,
            functionName: "balanceOfBatch",
            args: [accounts, ids]
        }) as any
    }

    async isApprovedForAll(account: string, operator: string): Promise<boolean> {
        return await this.config.client.public.readContract({
            abi: [abi.isApprovedForAll],
            address: this.address,
            functionName: "isApprovedForAll",
            args: [account, operator]
        }) as any
    }

    public safeBatchTransferFrom(args: IERC1155SafeBatchTransferFromParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.safeBatchTransferFrom],
            args,
            address: this.config.address,
            functionName: "safeBatchTransferFrom",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

    public safeTransferFrom(args: IERC1155SafeTransferFromParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.safeTransferFrom],
            args,
            address: this.config.address,
            functionName: "safeTransferFrom",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

    public setApprovalForAll(args: IERC1155SetApprovalForAllParams) {
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

    /**
     * @dev See IERC1155MetadataURI-uri.
     *
     * This implementation returns the same URI for *all* token types. It relies
     * on the token type ID substitution mechanism
     * https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
     *
     * Clients calling this function must replace the `id` substring with the
     * actual token type ID.
     */
    async uri(id: number): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.uri],
            address: this.address,
            functionName: "uri",
            args: [id]
        }) as any
    }

}
