import * as abi from "../../../abis/ERC20/extensions/ERC20FlashMint";
import { IERC20FlashMint, IERC20FlashMintFlashLoanParams } from "../../../types/ERC20/extensions/ERC20FlashMint";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

/** {@inheritdoc IERC20FlashMint} */
export class ERC20FlashMint implements IERC20FlashMint {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    /** {@inheritdoc IERC20FlashMint.flashFee}
     * @example
     * ```ts
     * // amount is in lower units (see ERC20.decimals)
     * const amountToLoan = erc20.toLowerUnits(10.45);
     * const flashFee = await erc20FlashMint.flashFee(amountToLoan);
     * 
     * // to perform the loan, you need to pay the loan amount and the flash fee.
     * const amountToPay = amountToLoan + flashFee;
     * 
     * // do the loan
     * ```
     */
    async flashFee(value: bigint): Promise<bigint> {
        return await this.config.client.public.readContract({
            abi: [abi.flashFee],
            address: this.address,
            functionName: "flashFee",
            args: [this.address, value]
        }) as any
    };

    /** {@inheritdoc IERC20FlashMint.flashLoan}
     * @example
     * ```ts
     * // assume that your borrower is a contract that implements the IERC3156FlashBorrower interface.
     * const borrower = "0x000" // the address of your contract;
     * 
     * // flashloan function will send new tokens to the receiver and call the "onFlashLoan" function on the receiver.
     * const flashLoan = await erc20FlashMint.flashLoan({
     *   receiver: borrower,
     *   value: amountToLoan, // in lower units (see ERC20.decimals) 
     *   data: "data to be passed to 'onFlashLoan' function of the contract"
     * })
     * ```
     */
    public flashLoan(args: IERC20FlashMintFlashLoanParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.flashLoan],
            args: {
                token: this.address,
                ...args
            },
            address: this.config.address,
            functionName: "flashLoan",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    };

    /** {@inheritdoc IERC20FlashMint.maxFlashLoan} */
    async maxFlashLoan(): Promise<bigint> {
        return await this.config.client.public.readContract({
            abi: [abi.maxFlashLoan],
            address: this.address,
            functionName: "maxFlashLoan",
            args: [this.address]
        }) as any
    }

}