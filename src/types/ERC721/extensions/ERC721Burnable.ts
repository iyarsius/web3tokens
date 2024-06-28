import { ContractOperation } from "../../../structures/ContractOperation";

export interface IERC721BurnableBurnParams {
  tokenId: number
}

export interface IERC721Burnable {
  burn: (args: IERC721BurnableBurnParams) => ContractOperation;
}