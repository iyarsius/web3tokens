import { PublicClient, WalletClient } from "viem";

export interface IClient {
    public: PublicClient;
    wallet: WalletClient;
};