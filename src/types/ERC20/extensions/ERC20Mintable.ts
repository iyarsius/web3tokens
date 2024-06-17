export interface IERC20MintableMintParams {
  /** The address to send minted tokens */
  to: string;
  /** The amount of tokens to create (in lower units) */
  amount: number
}

