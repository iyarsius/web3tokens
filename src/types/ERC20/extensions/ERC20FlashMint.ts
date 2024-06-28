import { Address } from "viem";
import { ContractOperation } from "../../../structures/ContractOperation";

export interface IERC20FlashMintFlashLoanParams {
  /** The receiver of the flash loan. Should implement the `IERC3156FlashBorrower-onFlashLoan` interface. */
  receiver: string;
  /** The amount of tokens to be loaned. */
  value: number;
  /** An arbitrary datafield that is passed to the receiver. */
  data: string
}

/**
 * Implementation of the ERC3156 Flash loans extension, as defined in https://eips.ethereum.org/EIPS/eip-3156.
 * Adds the `flashLoan` method, which provides flash loan support at the token level. By default there is no fee,
 * but this can be changed by overriding `flashFee`.
 *
 * @remarks
 * warning: When this extension is used along with the `ERC20Capped` or `ERC20Votes` extensions,
 * `maxFlashLoan` will not correctly reflect the maximum that can be flash minted.
 */
export interface IERC20FlashMint {
  /**
   * Get the fee applied when doing flash loans. This function returns the
   * fee applied when doing flash loans.
   * 
   * @param token The token to be flash loaned. Only current contract address is supported.
   * @param value The amount of tokens to be loaned in lower units. (see ERC20.decimals())
   * 
   * @returns a `ContractOperation` instance.
   */
  flashFee(value: bigint): Promise<bigint>;
  /**
   * Performs a flash loan. New tokens are minted and sent to the
   * `receiver`, who is required to implement the `IERC3156FlashBorrower`
   * interface. By the end of the flash loan, the receiver is expected to own
   * value + fee tokens and have them approved back to the token contract itself so
   * they can be burned.
   * 
   * @param args The parameters to be passed into `flashLoan` function of the ERC20FlashMint contract.
   * 
   * @returns The amount of tokens to pay as a fee.
   * 
   * @remarks
   * warning: This function relies on the “atomic” nature of transactions. To make a flashLoan you must repay it in the same transaction.
   * This function is therefore only applicable to a smart contract compatible with {@link https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/interfaces/IERC3156FlashBorrower.sol | IERC3156FlashBorrower} 
   * interface cause the "flashLoan" function will call a "onFlashLoan" function on the smart contract used as borrower witch should implement the repay logic.
   */
  flashLoan: (args: IERC20FlashMintFlashLoanParams) => ContractOperation;
  /**
   * Get the maximum amount of tokens available for loan.
   * 
   * @returns The amount of tokens that can be loaned.
   *
   * @remarks
   * note: This function does not consider any form of supply cap.
   */
  maxFlashLoan(token: string): Promise<bigint>;
};