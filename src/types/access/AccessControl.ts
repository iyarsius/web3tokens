import { Log } from "viem";

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

