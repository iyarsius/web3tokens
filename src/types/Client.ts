import { Chain, PrivateKeyAccount, PublicClient, Transport, WalletClient } from "viem";

export interface IClient {
    public: PublicClient;
    wallet: WalletClient;
}

export interface IClientConfig {
    account: PrivateKeyAccount,
    chain: Chain,
    transport: Transport
}