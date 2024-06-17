import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "../structures/ContractBuilder";

import { Address } from "viem";

import { ERC721} from "../structures/ERC721";
import { ERC721Mintable, IERC721Mintable } from "../structures/ERC721/extensions/ERC721Mintable";
import { IClient } from "../types/Client";
import { ERC721Burnable, IERC721Burnable } from "../structures/ERC721/extensions/ERC721Burnable";
import { AccessControl, AccessManaged, IAccessControl, IAccessManaged, IOwnable, Ownable } from "../structures/access";
import { ERC721Pausable, IERC721Pausable } from "../structures/ERC721/extensions/ERC721Pausable";

export class ERC721Builder<T = ERC721> extends ContractBuilder {
  constructor(protected client: IClient) {
    super(ERC721);
  };

  setOwnable(): ERC721Builder<T & IOwnable> {
    return this.setExtension(Ownable);
  };

  setAccessControl(): ERC721Builder<T & IAccessControl> {
    return this.setExtension(AccessControl);
  };

  setAccessManaged(): ERC721Builder<T & IAccessManaged> {
    return this.setExtension(AccessManaged);
  }

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