import { PublicClient, WalletClient, createPublicClient, createWalletClient } from "viem";
import { IClientConfig } from "./types/Client";

export class Client {
    public public: PublicClient;
    public wallet: WalletClient;
    
    constructor(config: IClientConfig) {
        this.public = createPublicClient(config);
        this.wallet = createWalletClient(config);
    };
}