import { ContractOperation } from "../../../structures/ContractOperation";

export interface IERC20BurnableBurnParams {
  value: number
}

export interface IERC20BurnableBurnFromParams {
  account: string;
  value: number
}

export interface IERC20Burnable {
  /**
   * Destroys a `value` amount of tokens from the caller's balance.
   * 
   * @param args The parameters to be passed into `burn` function of the ERC20 contract.
   * 
   * @returns a `ContractOperation` instance.
   */
  burn: (args: IERC20BurnableBurnParams) => ContractOperation;
  /**
   * Destroys a `value` amount of tokens from `account`, deducting from
   * the caller's allowance.
   * 
   * @param args The parameters to be passed into `burnFrom` function of the ERC20 contract.
   * 
   * @example
   * ```ts
   * const balance = await erc20.balanceOf(accountAddress); // return 20n
   * 
   * // value is in lower units. (see ERC20.decimals())
   * const tx = await erc20.burnFrom({
   *    account: accountAddress,
   *    value: 10n * 10 ** decimals
   * }).execute(); // burn 10 tokens
   * 
   * // wait for 3 confirmations
   * await tx.waitForReceipt(3);
   * 
   * // check balance again
   * const newBalance = await erc20.balanceOf(accountAddress); // return 10n
   * ```
   * 
   * @returns a `ContractOperation` instance.
   *
   * @remarks
   * info: The caller must have allowance for `accounts`'s tokens of at least
   * `value`.
   */
  burnFrom: (args: IERC20BurnableBurnFromParams) => ContractOperation;
}