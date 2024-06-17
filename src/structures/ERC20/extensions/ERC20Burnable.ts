import * as abi from "../../../abis/ERC20/extensions/ERC20Burnable";
import { IERC20BurnableBurnParams, IERC20BurnableBurnFromParams } from "../../../types/ERC20/extensions/ERC20Burnable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IERC20Burnable {
    burn: ContractOperation<IERC20BurnableBurnParams>;
    burnFrom: ContractOperation<IERC20BurnableBurnFromParams>;
}

export class ERC20Burnable implements IERC20Burnable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public burn = new ContractOperation<IERC20BurnableBurnParams>(this.config.client, {
        abi: [abi.burn],
        address: this.config.address,
        functionName: "burn",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    public burnFrom = new ContractOperation<IERC20BurnableBurnFromParams>(this.config.client, {
        abi: [abi.burnFrom],
        address: this.config.address,
        functionName: "burnFrom",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
