export interface IERC1155MintableMintBatchParams {
  to: string;
  ids: number[];
  amounts: number[];
  data: string
}

export interface IERC1155MintableMintParams {
  account: string;
  id: number;
  amount: number;
  data: string
}

