import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "../structures/ContractBuilder";

import { Address } from "viem";

import { ERC721} from "../structures/ERC721";
import { ERC721Mintable, IERC721Mintable } from "../structures/ERC721/extensions/ERC721Mintable";
import { IClient } from "../types/Client";

export class ERC721Builder<T = ERC721> extends ContractBuilder {
  constructor(protected client: IClient) {
    super(ERC721);
  };

  setMintable(): ERC721Builder<T & IERC721Mintable> {
    return this.setExtension(ERC721Mintable);
  }

  get(address: Address): T {
    return this.build({
      client: this.client,
      address
    } as IContractConfig);
  }
};