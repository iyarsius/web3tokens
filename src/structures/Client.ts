import { IClient } from "../types/Client";
import { ERC20Builder } from "../builders/ERC20Builder";
import { ERC721Builder } from "../builders/ERC721Builder";
import { ERC1155Builder } from "../builders/ERC1155Builder";

export class Web3Tokens {
    constructor(protected client: IClient) {};

    /**
     * Create a builder for an ERC-20 token witch allows to add extensions
     * such as Ownable, Mintable, Pausable, etc...
     */
    erc20(): ERC20Builder {
        return new ERC20Builder(this.client);
    };

    /**
     * Create a builder for an ERC-721 token witch allows to add extensions
     * such as Ownable, Mintable, Pausable, etc...
     */
    erc721(): ERC721Builder {
        return new ERC721Builder(this.client);
    };

    /**
     * Create a builder for an ERC-1155 token witch allows to add extensions
     * such as Ownable, Mintable, Pausable, etc...
     */
    erc1155(): ERC1155Builder {
        return new ERC1155Builder(this.client);
    };
};