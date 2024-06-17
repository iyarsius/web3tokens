import * as abi from '../../../abis/ERC721/extensions/ERC721Burnable';
import { IERC721BurnableBurnParams } from "../../../types//ERC721/extensions/ERC721Burnable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address, WatchContractEventReturnType } from "viem";

export interface IERC721Burnable {
    burn: ContractOperation<IERC721BurnableBurnParams>;
}

export class ERC721Burnable implements IERC721Burnable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public burn = new ContractOperation<IERC721BurnableBurnParams>(this.config.client, {
        abi: [abi.burn],
        address: this.config.address,
        functionName: "burn",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
