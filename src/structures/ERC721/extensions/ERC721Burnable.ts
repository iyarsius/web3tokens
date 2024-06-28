import * as abi from '../../../abis/ERC721/extensions/ERC721Burnable';
import { IERC721Burnable, IERC721BurnableBurnParams } from "../../../types//ERC721/extensions/ERC721Burnable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export class ERC721Burnable implements IERC721Burnable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public burn(args: IERC721BurnableBurnParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.burn],
            args,
            address: this.config.address,
            functionName: "burn",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }
}
