import { Log, WatchContractEventReturnType } from "viem";
import { ContractOperation } from "../../../structures/ContractOperation";

export interface IERC20PausableEvents {
   Paused: (data: (Log & { args: IERC20PausablePausedEventParams })) => void;
   Unpaused: (data: (Log & { args: IERC20PausableUnpausedEventParams })) => void;
};

export interface IERC20PausablePausedEventParams {
   account: string
}

export interface IERC20PausableUnpausedEventParams {
   account: string
}

export interface IERC20PausablePauseParams {

}

export interface IERC20PausableUnpauseParams {

}

export interface IERC20Pausable {
   on<T extends keyof IERC20PausableEvents>(eventName: T, callback: IERC20PausableEvents[T]): WatchContractEventReturnType;
   /** Triggers stopped state.
    *
    * @remark
    * Requirements:
    *
    * - The contract must not be paused.
    */
   pause: (args: IERC20PausablePauseParams) => ContractOperation;
   /** Check if the contract is paused
    * 
    * @returns `true` if paused, otherwise returns `false`.
    */
   paused(): Promise<boolean>;
   /** Unpauses the contract
     * 
     * @remark
     * Requirements:
     *
     * - The contract must be paused.
     */
   unpause: (args: IERC20PausableUnpauseParams) => ContractOperation;
}