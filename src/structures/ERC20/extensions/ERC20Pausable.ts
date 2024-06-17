import * as abi from "../../../abis/ERC20/extensions/ERC20Pausable";
import { IERC20PausableEvents, IERC20PausablePauseParams, IERC20PausableUnpauseParams } from "../../../types/ERC20/extensions/ERC20Pausable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IERC20Pausable {
    on<T extends keyof IERC20PausableEvents>(eventName: T, callback: IERC20PausableEvents[T]): WatchContractEventReturnType;
    pause: ContractOperation<IERC20PausablePauseParams>;
    paused(): Promise<boolean>;
    unpause: ContractOperation<IERC20PausableUnpauseParams>;
}

export class ERC20Pausable implements IERC20Pausable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IERC20PausableEvents>(eventName: T, callback: IERC20PausableEvents[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    public pause = new ContractOperation<IERC20PausablePauseParams>(this.config.client, {
        abi: [abi.pause],
        address: this.config.address,
        functionName: "pause",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    async paused(): Promise<boolean> {
        return await this.config.client.public.readContract({
            abi: [abi.paused],
            address: this.address,
            functionName: "paused",
            args: []
        }) as any
    }

    public unpause = new ContractOperation<IERC20PausableUnpauseParams>(this.config.client, {
        abi: [abi.unpause],
        address: this.config.address,
        functionName: "unpause",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
