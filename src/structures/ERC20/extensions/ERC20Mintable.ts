import * as abi from "../../../abis/ERC20/extensions/ERC20Mintable";
import {  IERC20MintableMintParams } from "../../../types/ERC20/extensions/ERC20Mintable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export interface IERC20Mintable {
    /**
     * Creates a `value` amount of tokens and assigns them to `account`, by transferring it from address(0).
     */
    mint: ContractOperation<IERC20MintableMintParams>;
}

export class ERC20Mintable implements IERC20Mintable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public mint = new ContractOperation<IERC20MintableMintParams>(this.config.client, {
        abi: [abi.mint],
        address: this.config.address,
        functionName: "mint",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
