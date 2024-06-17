import * as abi from "../../../abis/ERC721/extensions/ERC721Pausable";
import { IERC721PausableEvents, IERC721PausablePauseParams, IERC721PausableUnpauseParams } from "../../../types//ERC721/extensions/ERC721Pausable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IERC721Pausable {
    on<T extends keyof IERC721PausableEvents>(eventName: T, callback: IERC721PausableEvents[T]): WatchContractEventReturnType;
    pause: ContractOperation<IERC721PausablePauseParams>;
    paused(): Promise<boolean>;
    unpause: ContractOperation<IERC721PausableUnpauseParams>;
}

export class ERC721Pausable implements IERC721Pausable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IERC721PausableEvents>(eventName: T, callback: IERC721PausableEvents[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    public pause = new ContractOperation<IERC721PausablePauseParams>(this.config.client, {
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

    public unpause = new ContractOperation<IERC721PausableUnpauseParams>(this.config.client, {
        abi: [abi.unpause],
        address: this.config.address,
        functionName: "unpause",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
