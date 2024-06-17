import { Log } from "viem";

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

