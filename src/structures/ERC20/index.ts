import * as abi from "../../abis/ERC20";
import { IERC20Events, IERC20ApproveParams, IERC20TransferParams, IERC20TransferFromParams } from "../../types/ERC20";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address } from "viem";

/**
 * An ERC20 token contract keeps track of fungible tokens: any one token is exactly equal to any other token;
 * no tokens have special rights or behavior associated with them. This makes ERC20 tokens useful for things like
 * a medium of exchange currency, voting rights, staking, and more.
 */
export class ERC20 {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    /**
     * Listen for contract events
     * 
     * @remarks The function is calling `WatchContractEvent` witch will attempt to create an Event Filter
     * and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support
     * Filters this function will not work.
      *
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
     * Get the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through `transferFrom`. This is
     * zero by default.
     * 
     * This value changes when `approve` or `transferFrom` are called.
     * 
     * @example
     * ```ts
     * const owner = "0x0000000...";
     * const spender = "0x11111...";
     * 
     * // check allowance of spender on owner's balance;
     * const allowance = await erc20.allowance(owner, spender);
     * 
     * // value is returned in lower unit of tokens (see ERC20.decimals());
     * console.log(allowance) // 100000000n
     * ```
     * 
     * @param owner The address who allow to spend tokens on behalf of `spender`
     * @param spender The address allowed to spend tokens on behalf of `owner`
     * 
     * @returns Allowance of `spender` over `owner` in lower units
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
     * Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * @param args The parameters to be passed into `approve` function of the ERC20 contract.
     * 
     * @returns a ContractOperation instance.
     *
     * @remarks
     * info: This function update the state of the blockchain so
     * it will cost gas to be executed.
     * 
     * warning: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards.
     *
     * @example
     * ```ts
     * const me = "0x000...";
     * const allowedSpender = "0x111...";
     * 
     * // allow to "spender" to spend 10 tokens
     * const transaction = await erc20.approve({
     *     spender: allowedSpender,
     *     value: 10n * 10n ** decimals // use lower units (see ERC20.decimals())
     * }).execute();
     * 
     * // wait for 3 confirmations
     * const receipt = await transaction.waitForResult(3);
     * ```
     */
    public approve(args: IERC20ApproveParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.approve],
            args,
            address: this.config.address,
            functionName: "approve",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

    /**
     * Check the amount of tokens that an account has in its balance.
     * 
     * @param account The account to check for.
     * 
     * @example
     * ```ts
     * const account = "0x000...";
     * 
     * // balance are in lower units (see ERC20.decimals())
     * const accountBalance = await erc20.balanceOf(account);
     * ```
     * 
     * @returns The value of tokens owned by `account`.
     */
    async balanceOf(account: string): Promise<bigint> {
        return await this.config.client.public.readContract({
            abi: [abi.balanceOf],
            address: this.address,
            functionName: "balanceOf",
            args: [account]
        }) as any
    }

    /**
     * Get the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     * 
     * @example
     *```ts
     * const balance = await erc20.balanceOf(account);
     * const decimals = await erc20.decimals();
     * 
     * // balance should be displayed to user as following:
     * const userBalance = balance / (10n ** decimals); // be careful to use BigInts
     * ```
     * 
     * @remarks
     * warning: Due to the size of the numbers, you have to use BigInts to avoid number overflow.
     * For example, instead of using `10` as value, use `10n`.
     * 
     * info: Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei.
     * This is the default value for ERC20, unless it has been overridden.
     * 
     * @returns The number of decimals.
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
     * Get the name of the token.
     * 
     * @example
     * ```ts
     * const dai = client.erc20().get("DAI_ADDRESS");
     * 
     * // return "Dai Stablecoin"
     * const symbol = await dai.name();
     * ```
     * @returns The name of the token.
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
     * Return the symbol of the token, usually a shorter version of the
     * name. (BTC, ETH...)
     * 
     * @example
     * ```ts
     * const dai = client.erc20().get("DAI_ADDRESS");
     * 
     * // return "DAI"
     * const symbol = await dai.symbol();
     * ```
     * 
     * @returns The symbol of the token.
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
     * Return the total supply of tokens, which is the amount of tokens that
     * exist in total.
     * 
     * @example
     * ```ts
     * // supply is displayed in lower units (see ERC20.decimals())
     * const supply = await token.totalSupply()
     *```
     * 
     * @returns The value of tokens in existence.
     */
    async totalSupply(): Promise<bigint> {
        return await this.config.client.public.readContract({
            abi: [abi.totalSupply],
            address: this.address,
            functionName: "totalSupply",
            args: []
        }) as any
    }

    /**
     * Moves a `value` amount of tokens from the caller's account to `to`.
     * 
     * @remarks
     * info: This function update the state of the blockchain so
     * it will cost gas to be executed.
     * 
     * @param args The parameters to be passed into `transfer` function of the ERC20 contract.
     * 
     * @example
     * ```ts
     * const receiver = "0x000...";
     * const me = "0x111..."
     * 
     * // send 5 tokens to the receiver
     * const transaction = await token.transfer({
     *     from: me,
     *     to: receiver,
     *     // use big numbers to avoid overflows (e.g 5000 become 5000n)
     *     value: 5n * 10n ** decimals
     * }).execute();
     * 
     * // wait for 3 confirmations
     * const receipt = await transaction.waitForResult(3);
     * ```
     * 
     * @returns a ContractOperation instance.
     */
    public transfer(args: IERC20TransferFromParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.transfer],
            args,
            address: this.config.address,
            functionName: "transfer",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

    /**
     * Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     * 
     * @remarks
     * info: This function update the state of the blockchain so
     * it will cost gas to be executed.
     * 
     * @param args The parameters to be passed into `transferFrom` function of the ERC20 contract.
     * 
     * @example
     * ```ts
     * const receiver = "0x000...";
     * const sender = "0x111...";
     * 
     * // caller needs to have at least 5 tokens in allowance over "sender" account
     * const transaction = await erc20.transferFrom({
     *     from: sender,
     *     to: receiver,
     *     // use big numbers to avoid overflows (e.g 5000 become 5000n)
     *     value: 5n * 10n ** decimals
     * }).execute();
     * 
     * // wait for 3 confirmations
     * const receipt = await result.waitForResult(3);
     * ```
     *
     * @returns a ContractOperation instance.
     */
    public transferFrom(args: IERC20TransferFromParams) {
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
