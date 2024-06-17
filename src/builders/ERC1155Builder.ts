import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "../structures/ContractBuilder";

import { Address } from "viem";

import { ERC1155} from "../structures/ERC1155";
import { IClient } from "../types/Client";
import { AccessControl, AccessManaged, IAccessControl, IAccessManaged, IOwnable, Ownable } from "../structures/access";
import { ERC1155Mintable, IERC1155Mintable } from "../structures/ERC1155/extensions/ERC1155Mintable";

export class ERC1155Builder<T = ERC1155> extends ContractBuilder {
  constructor(protected client: IClient) {
    super(ERC1155);
  };

  setOwnable(): ERC1155Builder<T & IOwnable> {
    return this.setExtension(Ownable);
  };

  setAccessControl(): ERC1155Builder<T & IAccessControl> {
    return this.setExtension(AccessControl);
  };

  setAccessManaged(): ERC1155Builder<T & IAccessManaged> {
    return this.setExtension(AccessManaged);
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