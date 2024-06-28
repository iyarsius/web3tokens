import { ContractOperation } from "../../../structures/ContractOperation";

export interface IERC20MintableMintParams {
  /** The address to send minted tokens */
  to: string;
  /** The amount of tokens to create (in lower units) */
  amount: number
}

export interface IERC20Mintable {
  /**
   * Creates a `value` amount of tokens and assigns them to `account`, by transferring it from address(0).
   */
  mint: (args: IERC20MintableMintParams) => ContractOperation;
}