import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "../structures/ContractBuilder";

import { Address } from "viem";

import { ERC1155 } from "../structures/ERC1155";
import { IClient } from "../types/Client";
import { AccessControl, AccessManaged, IAccessControl, IAccessManaged, IOwnable, Ownable } from "../structures/access";
import { ERC1155Mintable, IERC1155Mintable } from "../structures/ERC1155/extensions/ERC1155Mintable";

/**
 * @category Builders
 */
export class ERC1155Builder<T = ERC1155> extends ContractBuilder {
    constructor(protected client: IClient) {
        super(ERC1155);
    };

    /**
     * a contract with `AccessManager` allows certain callers to access certain functions.
     * this extension allows to access all functions related to authority management.
     * 
     * @returns The updated builder with `AccessManager` extension.
     */
    setAccessManaged(): ERC1155Builder<T & IAccessManaged> {
        return this.setExtension(AccessManaged);
    }

    /**
     * a contract with `AccessControl` allows role-based accesscontrol mechanisms.
     * this extension allows to access all functions related to roles management.
     * 
     * @returns The updated builder with `AccessControl` extension.
     */
    setAccessControl(): ERC1155Builder<T & IAccessControl> {
        return this.setExtension(AccessControl);
    };

    /**
     * a contract with `Ownable` allows an owner to access certain functions.
     * this extension allows to access all functions related ownership management.
     * 
     * @returns The updated builder with `Ownable` extension.
     */
    setOwnable(): ERC1155Builder<T & IOwnable> {
        return this.setExtension(Ownable);
    };

    setMintable(): ERC1155Builder<T & IERC1155Mintable> {
        return this.setExtension(ERC1155Mintable);
    };

    get(address: Address): T {
        return this.build({
            client: this.client,
            address
        } as IContractConfig);
    }
};