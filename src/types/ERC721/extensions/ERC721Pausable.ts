import { Log, WatchContractEventReturnType } from "viem";
import { ContractOperation } from "../../../structures/ContractOperation";

export interface IERC721PausableEvents {
   Paused: (data: (Log & { args: IERC721PausablePausedEventParams })) => void;
   Unpaused: (data: (Log & { args: IERC721PausableUnpausedEventParams })) => void;
};

export interface IERC721PausablePausedEventParams {
   account: string
}

export interface IERC721PausableUnpausedEventParams {
   account: string
}

export interface IERC721PausablePauseParams {

}

export interface IERC721PausableUnpauseParams {

}

export interface IERC721Pausable {
   on<T extends keyof IERC721PausableEvents>(eventName: T, callback: IERC721PausableEvents[T]): WatchContractEventReturnType;
   pause: (args: IERC721PausablePauseParams) => ContractOperation;
   paused(): Promise<boolean>;
   unpause: (args: IERC721PausableUnpauseParams) => ContractOperation;
}