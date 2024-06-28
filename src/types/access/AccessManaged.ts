import { Log, WatchContractEventReturnType } from "viem";
import { ContractOperation } from "../../structures/ContractOperation";

export interface IAccessManagedEvents {
   AuthorityUpdated: (data: (Log & { args: IAccessManagedAuthorityUpdatedEventParams })) => void;
};
export interface IAccessManagedAuthorityUpdatedEventParams {
   authority: string
}

export interface IAccessManagedSetAuthorityParams {
   newAuthority: string
}

export interface IAccessManaged {
   on<T extends keyof IAccessManagedEvents>(eventName: T, callback: IAccessManagedEvents[T]): WatchContractEventReturnType;
   authority(): Promise<string>;
   isConsumingScheduledOp(): Promise<string>;
   setAuthority: (args: IAccessManagedSetAuthorityParams) => ContractOperation;
}