import { ContractOperation } from "../../../structures/ContractOperation";

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

export interface IERC1155Mintable {
  mintBatch: (args: IERC1155MintableMintBatchParams) => ContractOperation;
  mint: (args: IERC1155MintableMintParams) => ContractOperation;
}