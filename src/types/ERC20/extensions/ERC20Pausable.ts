import { Log } from "viem";

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

