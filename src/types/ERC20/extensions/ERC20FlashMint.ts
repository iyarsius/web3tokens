export interface IERC20FlashMintFlashLoanParams {
  receiver: string;
  token: string;
  value: number;
  data: string
}