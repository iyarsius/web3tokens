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
   * @returns a `ContractOperation` instance.
   *
   * @remarks
   * info: The caller must have allowance for `accounts`'s tokens of at least
   * `value`.
   */
  burnFrom: (args: IERC20BurnableBurnFromParams) => ContractOperation;
}