import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "../structures/ContractBuilder";

import { Address } from "viem";

import { ERC721 } from "../structures/ERC721";
import { ERC721Mintable } from "../structures/ERC721/extensions/ERC721Mintable";
import { IClient } from "../types/Client";
import { ERC721Burnable } from "../structures/ERC721/extensions/ERC721Burnable";
import { AccessControl, AccessManaged, Ownable } from "../structures/access";
import { IAccessControl, IAccessManaged, IOwnable } from "../types/access";
import { ERC721Pausable } from "../structures/ERC721/extensions/ERC721Pausable";
import { IERC721Burnable, IERC721Mintable, IERC721Pausable } from "../types/ERC721";

/**
 * @category Builders
 */
export class ERC721Builder<T = ERC721> extends ContractBuilder {
    constructor(protected client: IClient) {
        super(ERC721);
    };

    /**
     * a contract with `AccessManager` allows certain callers to access certain functions.
     * this extension allows to access all functions related to authority management.
     * 
     * @returns The updated builder with `AccessManager` extension.
     */
    setAccessManaged(): ERC721Builder<T & IAccessManaged> {
        return this.setExtension(AccessManaged);
    }

    /**
     * a contract with `AccessControl` allows role-based accesscontrol mechanisms.
     * this extension allows to access all functions related to roles management.
     * 
     * @returns The updated builder with `AccessControl` extension.
     */
    setAccessControl(): ERC721Builder<T & IAccessControl> {
        return this.setExtension(AccessControl);
    };

    /**
     * a contract with `Ownable` allows an owner to access certain functions.
     * this extension allows to access all functions related ownership management.
     * 
     * @returns The updated builder with `Ownable` extension.
     */
    setOwnable(): ERC721Builder<T & IOwnable> {
        return this.setExtension(Ownable);
    };

    setBurnable(): ERC721Builder<T & IERC721Burnable> {
        return this.setExtension(ERC721Burnable);
    }

    setMintable(): ERC721Builder<T & IERC721Mintable> {
        return this.setExtension(ERC721Mintable);
    };

    setPausable(): ERC721Builder<T & IERC721Pausable> {
        return this.setExtension(ERC721Pausable);
    }

    get(address: Address): T {
        return this.build({
            client: this.client,
            address
        } as IContractConfig);
    }
};