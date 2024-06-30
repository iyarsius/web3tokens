import { Address, Log, WatchContractEventReturnType } from "viem";
import { ContractOperation } from "../../../structures/ContractOperation";

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

export interface IERC20Permit {
  on<T extends keyof IERC20PermitEvents>(eventName: T, callback: IERC20PermitEvents[T]): WatchContractEventReturnType;
  DOMAIN_SEPARATOR(): Promise<string>;
  eip712Domain(): Promise<IERC20PermitEip712DomainReturns>;
  nonces(owner: string): Promise<number>;
  permit(params: IERC20PermitPermitParams): ContractOperation;
}