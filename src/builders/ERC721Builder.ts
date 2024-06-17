import { Client } from "..";
import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "../structures/ContractBuilder";

import { Address } from "viem";

import { ERC721} from "../structures/ERC721";

export class ERC721Builder<T = ERC721> extends ContractBuilder {
  constructor(protected client: Client) {
    super(ERC721);
  };

  get(address: Address): T {
    return this.build({
      client: this.client,
      address
    } as IContractConfig);
  }
};