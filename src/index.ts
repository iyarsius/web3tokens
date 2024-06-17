import { PublicClient, WalletClient, createPublicClient, createWalletClient } from "viem";
import { IClientConfig } from "./types/Client";
import { ERC20Builder } from "./builders/ERC20Builder";
import { ERC721Builder } from "./builders/ERC721Builder";

export class Client {
    public public: PublicClient;
    public wallet: WalletClient;
    
    constructor(config: IClientConfig) {
        this.public = createPublicClient(config);
        this.wallet = createWalletClient(config);
    };

    erc20(): ERC20Builder {
        return new ERC20Builder(this);
    };

    erc721(): ERC721Builder {
        return new ERC721Builder(this);
    }
}