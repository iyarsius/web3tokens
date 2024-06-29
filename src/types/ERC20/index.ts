import { Log } from "viem";

export * from "./extensions/ERC20Mintable";
export * from "./extensions/ERC20Burnable";
export * from "./extensions/ERC20FlashMint";
export * from "./extensions/ERC20Pausable";
export * from "./extensions/ERC20Permit";

export interface IERC20Events {
  Approval: (data: (Log & { args: IERC20ApprovalEventParams })) => void;
  Transfer: (data: (Log & { args: IERC20TransferEventParams })) => void;
};

export interface IERC20ApprovalEventParams {
  owner: string;
  spender: string;
  value: bigint
}

export interface IERC20TransferEventParams {
  from: string;
  to: string;
  value: bigint
}

export interface IERC20ApproveParams {
  spender: string;
  value: bigint
}

export interface IERC20TransferParams {
  to: string;
  value: bigint
}

export interface IERC20TransferFromParams {
  from: string;
  to: string;
  value: bigint
}

