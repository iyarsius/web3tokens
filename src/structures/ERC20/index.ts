import * as abi from "../../abis/ERC20";
import { IERC20Events, IERC20ApproveParams, IERC20TransferParams, IERC20TransferFromParams } from "../../types/ERC20";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address } from "viem";

/**
 * Implementation of ERC20 token standard
 */
export class ERC20 {
    address: Address;

    constructor(public config: IContractConfig) {
        this.address = config.address
    }

    /**
     * Listen for contract events
     * @param eventName the name of the event
     * @param callback the function to call when the event is triggered
     */
    on<T extends keyof IERC20Events>(eventName: T, callback: IERC20Events[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    async allowance(owner: string, spender: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.allowance],
            address: this.address,
            functionName: "allowance",
            args: [owner, spender]
        }) as any
    }

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * @returns a ContractOperation instance.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * @emits Approval event.
     */
    public approve = new ContractOperation<IERC20ApproveParams>(this.config.client, {
        abi: [abi.approve],
        address: this.config.address,
        functionName: "approve",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    /**
     * @returns the value of tokens owned by `account`.
     */
    async balanceOf(account: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.balanceOf],
            address: this.address,
            functionName: "balanceOf",
            args: [account]
        }) as any
    }

    /**
     * @returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the default value returned by this function, unless
     * it's overridden.
     */
    async decimals(): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.decimals],
            address: this.address,
            functionName: "decimals",
            args: []
        }) as any
    }

    /**
     * @returns the name of the token.
     */
    async name(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.name],
            address: this.address,
            functionName: "name",
            args: []
        }) as any
    }


    /**
     * @returns the symbol of the token, usually a shorter version of the
     * name.
     */
    async symbol(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.symbol],
            address: this.address,
            functionName: "symbol",
            args: []
        }) as any
    }

    /**
     * @returns the value of tokens in existence.
     */
    async totalSupply(): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.totalSupply],
            address: this.address,
            functionName: "totalSupply",
            args: []
        }) as any
    }

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * @returns a ContractOperation instance.
     * 
     * @emits Transfer event.
     */
    public transfer = new ContractOperation<IERC20TransferParams>(this.config.client, {
        abi: [abi.transfer],
        address: this.config.address,
        functionName: "transfer",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * @returns a ContractOperation instance.
     *  
     * @emits Transfer event.
     */
    public transferFrom = new ContractOperation<IERC20TransferFromParams>(this.config.client, {
        abi: [abi.transferFrom],
        address: this.config.address,
        functionName: "transferFrom",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
