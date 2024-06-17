import * as abi from "../../../abis/ERC721/extensions/ERC721Mintable";
import { IERC721MintableSafeMintParams } from "../../../types/ERC721/extensions/ERC721Mintable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export interface IERC721Mintable {
    safeMint: ContractOperation<IERC721MintableSafeMintParams>;
}

export class ERC721Mintable implements IERC721Mintable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public safeMint = new ContractOperation<IERC721MintableSafeMintParams>(this.config.client, {
        abi: [abi.safeMint],
        address: this.config.address,
        functionName: "safeMint",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}
