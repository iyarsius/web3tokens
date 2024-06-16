import { Log } from "viem";

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

