export interface IERC20FlashMintFlashLoanParams {
  /** The receiver of the flash loan. Should implement the `IERC3156FlashBorrower-onFlashLoan` interface. */
  receiver: string;
  /** The token to be flash loaned. Only `address(this)` is supported. */
  token: string;
  /** The amount of tokens to be loaned. */
  value: number;
  /** An arbitrary datafield that is passed to the receiver. */
  data: string
}