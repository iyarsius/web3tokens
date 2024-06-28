import { Log, WatchContractEventReturnType } from "viem";
import { ContractOperation } from "../../structures/ContractOperation";

export interface IAccessControlEvents {
  RoleAdminChanged: (data: (Log & { args: IAccessControlRoleAdminChangedEventParams })) => void;
  RoleGranted: (data: (Log & { args: IAccessControlRoleGrantedEventParams })) => void;
  RoleRevoked: (data: (Log & { args: IAccessControlRoleRevokedEventParams })) => void;
};
export interface IAccessControlRoleAdminChangedEventParams {
  role: string;
  previousAdminRole: string;
  newAdminRole: string
}

export interface IAccessControlRoleGrantedEventParams {
  role: string;
  account: string;
  sender: string
}

export interface IAccessControlRoleRevokedEventParams {
  role: string;
  account: string;
  sender: string
}

export interface IAccessControlGrantRoleParams {
  role: string;
  account: string
}

export interface IAccessControlRenounceRoleParams {
  role: string;
  callerConfirmation: string
}

export interface IAccessControlRevokeRoleParams {
  role: string;
  account: string
}

export interface IAccessControl {
  on<T extends keyof IAccessControlEvents>(eventName: T, callback: IAccessControlEvents[T]): WatchContractEventReturnType;
  DEFAULT_ADMIN_ROLE(): Promise<string>;
  getRoleAdmin(role: string): Promise<string>;
  grantRole: (args: IAccessControlGrantRoleParams) => ContractOperation;
  hasRole(role: string, account: string): Promise<boolean>;
  renounceRole: (args: IAccessControlRenounceRoleParams) => ContractOperation;
  revokeRole: (args: IAccessControlRevokeRoleParams) => ContractOperation;
  supportsInterface(interfaceId: string): Promise<boolean>;
}