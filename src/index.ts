import { IClient } from "./types/Client";
import { ERC20Builder } from "./builders/ERC20Builder";
import { ERC721Builder } from "./builders/ERC721Builder";
import { ERC1155Builder } from "./builders/ERC1155Builder";

export class Web3Tokens {
    constructor(protected client: IClient) {};

    erc20(): ERC20Builder {
        return new ERC20Builder(this.client);
    };

    erc721(): ERC721Builder {
        return new ERC721Builder(this.client);
    };
;
    erc1155(): ERC1155Builder {
        return new ERC1155Builder(this.client);
    };
};