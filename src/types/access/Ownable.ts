import { Log, WatchContractEventReturnType } from "viem";
import { ContractOperation } from "../../structures/ContractOperation";

export interface IOwnableEvents {
   OwnershipTransferred: (data: (Log & { args: IOwnableOwnershipTransferredEventParams })) => void;
};
export interface IOwnableOwnershipTransferredEventParams {
   previousOwner: string;
   newOwner: string
}

export interface IOwnableRenounceOwnershipParams {

}

export interface IOwnableTransferOwnershipParams {
   newOwner: string
}


export interface IOwnable {
   on<T extends keyof IOwnableEvents>(eventName: T, callback: IOwnableEvents[T]): WatchContractEventReturnType;
   owner(): Promise<string>;
   renounceOwnership: (args: IOwnableRenounceOwnershipParams) => ContractOperation;
   transferOwnership: (args: IOwnableTransferOwnershipParams) => ContractOperation;
}