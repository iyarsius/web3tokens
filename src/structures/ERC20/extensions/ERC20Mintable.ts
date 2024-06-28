import * as abi from "../../../abis/ERC20/extensions/ERC20Mintable";
import { IERC20Mintable, IERC20MintableMintParams } from "../../../types/ERC20/extensions/ERC20Mintable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export class ERC20Mintable implements IERC20Mintable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public mint(args: IERC20MintableMintParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.mint],
            args,
            address: this.config.address,
            functionName: "mint",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    };
}
