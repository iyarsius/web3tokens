import * as abi from "../../../abis/ERC20/extensions/ERC20Burnable";
import { IERC20BurnableBurnParams, IERC20BurnableBurnFromParams, IERC20Burnable } from "../../../types/ERC20/extensions/ERC20Burnable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

/** {@inheritdoc IERC20Burnable} */
export class ERC20Burnable implements IERC20Burnable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    /** {@inheritdoc IERC20Burnable.burn}
     * 
     * @example
     * ```ts
     * const balance = await erc20.balanceOf(myAddress); // return 200000n
     * 
     * const tx = await erc20.burn({
     *   // value is in lower units. (see ERC20.decimals)
     *   value: erc20.toLowerUnits(10)
     * }).execute();
     * 
     * // wait for 3 confirmations
     * await tx.waitForReceipt(3);
     * 
     * // check balance again
     * const newBalance = await erc20.balanceOf(myAddress); // return 100000n
     * ```
     */
    public burn(args: IERC20BurnableBurnParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.burn],
            args,
            address: this.config.address,
            functionName: "burn",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    };

    /** {@inheritdoc IERC20Burnable.burnFrom}
     * 
     * @example
     * ```ts
     * const balance = await erc20.balanceOf(accountAddress); // return 200000n
     * 
     * // value is in lower units. (see ERC20.decimals)
     * const tx = await erc20.burnFrom({
     *    account: accountAddress,
     *    value: erc20.toLowerUnits(10)
     * }).execute(); // burn 10 tokens
     * 
     * // wait for 3 confirmations
     * await tx.waitForReceipt(3);
     * 
     * // check balance again
     * const newBalance = await erc20.balanceOf(accountAddress); // return 100000n
     * ```
     */
    public burnFrom(args: IERC20BurnableBurnFromParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.burnFrom],
            args,
            address: this.config.address,
            functionName: "burnFrom",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    };

}
