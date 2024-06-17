import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "../structures/ContractBuilder";

import { Address } from "viem";

import { ERC1155} from "../structures/ERC1155";
import { IClient } from "../types/Client";
import { AccessControl, AccessManaged, IAccessControl, IAccessManaged, IOwnable, Ownable } from "../structures/access";

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
  }

  get(address: Address): T {
    return this.build({
      client: this.client,
      address
    } as IContractConfig);
  }
};