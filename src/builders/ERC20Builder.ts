import { Client } from "..";
import { IContractConfig } from "../types/Contracts";
import { ContractBuilder } from "./ContractBuilder";

import { Address } from "viem";

import { ERC20 } from "../structures/ERC20";
import { IOwnable, Ownable } from "../structures/access/Ownable";
import {
  ERC20Mintable, IERC20Mintable,
  ERC20Pausable, IERC20Pausable,
  ERC20Burnable, IERC20Burnable,
  ERC20FlashMint, IERC20FlashMint
} from "../structures/ERC20/extensions";

export class ERC20Builder<T = ERC20> extends ContractBuilder {
  constructor(protected client: Client) {
    super(ERC20);
  };

  setOwnable(): ERC20Builder<T & IOwnable> {
    return this.setExtension(Ownable);
  };

  setMintable(): ERC20Builder<T & IERC20Mintable> {
    return this.setExtension(ERC20Mintable);
  };

  setPausable(): ERC20Builder<T & IERC20Pausable> {
    return this.setExtension(ERC20Pausable);
  };

  setBurnable(): ERC20Builder<T & IERC20Burnable> {
    return this.setExtension(ERC20Burnable);
  };

  setFlashMint(): ERC20Builder<T & IERC20FlashMint> {
    return this.setExtension(ERC20FlashMint);
  };

  get(address: Address): T {
    return this.build({
      client: this.client,
      address
    } as IContractConfig);
  }
};