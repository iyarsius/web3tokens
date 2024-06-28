import { Log } from "viem";

export * from "./extensions/ERC721Burnable";
export * from "./extensions/ERC721Mintable";
export * from "./extensions/ERC721Pausable";

export interface IERC721Events {
  Approval: (data: (Log & { args: IERC721ApprovalEventParams })) => void;
  ApprovalForAll: (data: (Log & { args: IERC721ApprovalForAllEventParams })) => void;
  Transfer: (data: (Log & { args: IERC721TransferEventParams })) => void;
};

export interface IERC721ApprovalEventParams {
  owner: string;
  approved: string;
  tokenId: number
}

export interface IERC721ApprovalForAllEventParams {
  owner: string;
  operator: string;
  approved: boolean
}

export interface IERC721TransferEventParams {
  from: string;
  to: string;
  tokenId: number
}

export interface IERC721ApproveParams {
  to: string;
  tokenId: number
}

export interface IERC721SafeTransferFromParams {
  from: string;
  to: string;
  tokenId: number
}

export interface IERC721SafeTransferFromParams {
  from: string;
  to: string;
  tokenId: number;
  data: string
}

export interface IERC721SetApprovalForAllParams {
  operator: string;
  approved: boolean
}

export interface IERC721TransferFromParams {
  from: string;
  to: string;
  tokenId: number
}

