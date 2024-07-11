import * as abi from "../../abis/ERC20";
import { IERC20Events, IERC20ApproveParams, IERC20TransferFromParams } from "../../types/ERC20";
import { ContractOperation } from "../ContractOperation";
import { IContractConfig } from "../../types/Contracts";
import { Address, bytesToString, hexToBytes } from "viem";

/**
 * An ERC20 token contract keeps track of fungible tokens: any one token is exactly equal to any other token;
 * no tokens have special rights or behavior associated with them. This makes ERC20 tokens useful for things like
 * a medium of exchange currency, voting rights, staking, and more.
 */
export class ERC20 {
    address: Address;
    /**
     * The number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     * 
     * Requires `erc20.fetch()` to be called.
     * 
     * @example
     *```ts
     * const balance = await erc20.balanceOf(account);
     * 
     * // balance should be displayed to user as following:
     * const userBalance = balance / (10n ** erc20.decimals); // be careful to use BigInts
     * 
     * // or you could use built-in function
     * const userBalance = erc20.toHumanUnits(balance); // be sure to pass lower units
     * ```
     * 
     * @remarks
     * warning: Due to the size of the numbers, you have to use BigInts to avoid number overflow.
     * For example, instead of using `10` as value, use `10n`.
     * 
     * info: Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei.
     * This is the default value for ERC20, unless it has been overridden.
     */
    decimals?: number;
    /**
     * The name of the token.
     * 
     * Requires `erc20.fetch()` to be called.
     */
    name?: string;
    /**
     * The symbol of the token, usually a shorter version of the
     * name. (BTC, ETH...).
     * 
     * Requires `erc20.fetch()` to be called.
     */
    symbol?: string;

    protected isBytes32Encoded = false;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    protected _convertStringToBytes32InOutputsAbi(abi: any) {
        const newOutputs = [];
        for (const output of abi.outputs) {
            if (output.internalType === "string") output.type = "bytes32";
            newOutputs.push(output);
        }

        abi.outputs = newOutputs;
        return abi;
    }

    /**
     * Fetch the token's name, symbol and decimals.
     */
    async fetch(): Promise<void> {
        const res = await this.config.client.public.multicall({
            contracts: [
                {
                    abi: [this.isBytes32Encoded ? this._convertStringToBytes32InOutputsAbi(abi.decimals) : abi.decimals],
                    address: this.address,
                    functionName: "decimals",
                    args: []
                },
                {
                    abi: [this.isBytes32Encoded ? this._convertStringToBytes32InOutputsAbi(abi.name) : abi.name],
                    address: this.address,
                    functionName: "name",
                    args: []
                },
                {
                    abi: [this.isBytes32Encoded ? this._convertStringToBytes32InOutputsAbi(abi.symbol) : abi.symbol],
                    address: this.address,
                    functionName: "symbol",
                    args: []
                }
            ],
            allowFailure: false
        }).catch(e => {
            this.isBytes32Encoded = !this.isBytes32Encoded;

            if (!this.isBytes32Encoded) throw e;

            return this.fetch();
        }) as any;

        if (!res) return

        this.decimals = res[0];
        this.name = this.isBytes32Encoded ? bytesToString(hexToBytes(res[1])).replace(/\x00/g, "") : res[1];
        this.symbol = this.isBytes32Encoded ? bytesToString(hexToBytes(res[2])).replace(/\x00/g, "") : res[2];
    }

    /**
     * Convert a token's units into it's lower units.
     * 
     * @example
     * ```ts
     * // You want to convert 45.3 USDT into lower units.
     * // assume that `erc20` is an instance of the USDT token
     * // and that the token has 18 decimals.
     * const lowerUnits = erc20.toLowerUnits(45.3) // returns 45300000000000000000n
     * ```
     * 
     * @param value The value to convert into lower units.
     * @returns The converted value in lower units.
     */
    toLowerUnits(value: number | bigint): bigint {
        if (!this.decimals) throw new Error('ERC20 contract must have decimals set, please fetch token data first');

        const decimals = this.decimals;
        const [integerPart, fractionalPart = ''] = value.toString().split('.');

        if (fractionalPart.length > decimals) throw new Error('Fractional part exceeds token decimals');

        // Pad the fractional part to match the decimals length
        const fractionalPartPadded = fractionalPart.padEnd(decimals, '0');

        const combined = integerPart + fractionalPartPadded;

        return BigInt(combined);
    };

    /**
     * Convert a token's lower units into human readable units.
     * 
     * @example
     * ```ts
     * // You want to convert 45300000000000000000n USDT into human units.
     * // assume that `erc20` is an instance of the USDT token
     * // and that the token has 18 decimals.
     * const lowerUnits = erc20.toHumanUnits(45300000000000000000n) // returns 45.3
     * ```
     * 
     * @param value The value to convert into human readable units.
     * @returns The converted value in human readable units.
     */
    toHumanUnits(value: bigint): number {
        if (!this.decimals) throw new Error('ERC20 contract must have decimals set, please fetch token data first');

        const decimals = this.decimals;
        const valueStr = value.toString();

        // Handle cases where the value is shorter than the number of decimals
        const integerPart = valueStr.length > decimals ? valueStr.slice(0, -decimals) : '0';
        const fractionalPart = valueStr.length > decimals ? valueStr.slice(-decimals) : valueStr.padStart(decimals, '0');

        const combined = integerPart + '.' + fractionalPart;

        return parseFloat(combined);
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
     * // value is returned in lower unit of tokens (see ERC20.decimals);
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
     *     value: erc20.toLowerUnits(10n) // use lower units (see ERC20.decimals)
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
     * // balance are in lower units (see ERC20.decimals)
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
     * Return the total supply of tokens, which is the amount of tokens that
     * exist in total.
     * 
     * @example
     * ```ts
     * // supply is displayed in lower units (see ERC20.decimals)
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
     *     value: token.toLowerUnits(5)
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
     *     value: erc20.toLowerUnits(5)
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
