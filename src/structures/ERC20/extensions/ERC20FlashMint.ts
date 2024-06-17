import * as abi from "../../../abis/ERC20/extensions/ERC20FlashMint";
import { IERC20FlashMintFlashLoanParams } from "../../../types/ERC20/extensions/ERC20FlashMint";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

/**
 * Implementation of the ERC3156 Flash loans extension, as defined in
 * https://eips.ethereum.org/EIPS/eip-3156[ERC-3156].
 *
 * Adds the `flashLoan` method, which provides flash loan support at the token
 * level. By default there is no fee, but this can be changed by overriding `flashFee`.
 *
 * @remark NOTE: When this extension is used along with the `ERC20Capped` or `ERC20Votes` extensions,
 * `maxFlashLoan` will not correctly reflect the maximum that can be flash minted.
 */
export interface IERC20FlashMint {
    /**
     * Get the fee applied when doing flash loans. This function returns the
     * fee applied when doing flash loans.
     * 
     * @returns a `ContractOperation` instance.
     */
    flashFee(token: string, value: number): Promise<number>;
    /**
     * Performs a flash loan. New tokens are minted and sent to the
     * `receiver`, who is required to implement the `IERC3156FlashBorrower`
     * interface. By the end of the flash loan, the receiver is expected to own
     * value + fee tokens and have them approved back to the token contract itself so
     * they can be burned.
     * 
     * @returns a `ContractOperation` instance.
     * 
     * @remak
     * 
     * This function can reenter, but it doesn't pose a risk because it always preserves the property that the amount
     * minted at the beginning is always recovered and burned at the end, or else the entire function will revert.
     * slither-disable-next-line reentrancy-no-eth
     */
    flashLoan: ContractOperation<IERC20FlashMintFlashLoanParams>;
    /**
     * Get the maximum amount of tokens available for loan.
     * 
     * @returns a `ContractOperation` instance.
     *
     * @remak
     * 
     * NOTE: this function does not consider any form of supply cap.
     */
    maxFlashLoan(token: string): Promise<number>;
};

export class ERC20FlashMint implements IERC20FlashMint {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    async flashFee(token: string, value: number): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.flashFee],
            address: this.address,
            functionName: "flashFee",
            args: [token, value]
        }) as any
    };

    public flashLoan = new ContractOperation<IERC20FlashMintFlashLoanParams>(this.config.client, {
        abi: [abi.flashLoan],
        address: this.config.address,
        functionName: "flashLoan",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    async maxFlashLoan(token: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.maxFlashLoan],
            address: this.address,
            functionName: "maxFlashLoan",
            args: [token]
        }) as any
    }

}