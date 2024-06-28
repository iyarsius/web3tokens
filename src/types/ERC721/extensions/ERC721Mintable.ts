import { ContractOperation } from "../../../structures/ContractOperation";

export interface IERC721MintableSafeMintParams {
  to: string;
  tokenId: number
}

export interface IERC721Mintable {
  safeMint: (args: IERC721MintableSafeMintParams) => ContractOperation;
}