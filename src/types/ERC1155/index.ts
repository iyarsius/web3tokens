import { Log } from "viem";

export interface IERC1155Events {
   ApprovalForAll: (data: (Log & { args: IERC1155ApprovalForAllEventParams })) => void;
   TransferBatch: (data: (Log & { args: IERC1155TransferBatchEventParams })) => void;
   TransferSingle: (data: (Log & { args: IERC1155TransferSingleEventParams })) => void;
   URI: (data: (Log & { args: IERC1155URIEventParams })) => void;
};
export interface IERC1155ApprovalForAllEventParams {
   account: string;
   operator: string;
   approved: boolean
}

export interface IERC1155TransferBatchEventParams {
   operator: string;
   from: string;
   to: string;
   ids: number[];
   values: number[]
}

export interface IERC1155TransferSingleEventParams {
   operator: string;
   from: string;
   to: string;
   id: number;
   value: number
}

export interface IERC1155URIEventParams {
   value: string;
   id: number
}

export interface IERC1155SafeBatchTransferFromParams {
   from: string;
   to: string;
   ids: number[];
   values: number[];
   data: string
}

export interface IERC1155SafeTransferFromParams {
   from: string;
   to: string;
   id: number;
   value: number;
   data: string
}

export interface IERC1155SetApprovalForAllParams {
   operator: string;
   approved: boolean
}

