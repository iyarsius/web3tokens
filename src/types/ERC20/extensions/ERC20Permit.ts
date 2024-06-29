import { Address, Log } from "viem";

export interface IERC20PermitEvents {
  EIP712DomainChanged: (data: (Log & { args: IERC20PermitEIP712DomainChangedEventParams })) => void;
};

export interface IERC20PermitEIP712DomainChangedEventParams { }

export interface IERC20PermitPermitParams {
  owner: string;
  spender: string;
  value: number;
  deadline: number;
  v: number;
  r: string;
  s: string
}

export interface IERC20PermitEip712DomainReturns {
  fields: string;
  name: string;
  version: string;
  chainId: number;
  verifyingContract: Address;
  salt: string;
  extensions: number[];
}