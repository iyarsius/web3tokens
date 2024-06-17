import * as abi from "../../../abis/ERC1155/extensions/ERC1155Mintable";
import { IERC1155MintableMintBatchParams, IERC1155MintableMintParams } from "../../../types//ERC1155/extensions/ERC1155Mintable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export interface IERC1155Mintable {
    mintBatch: ContractOperation<IERC1155MintableMintBatchParams>;
    mint: ContractOperation<IERC1155MintableMintParams>;
}

export class ERC1155Mintable implements IERC1155Mintable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public mintBatch = new ContractOperation<IERC1155MintableMintBatchParams>(this.config.client, {
        abi: [abi.mintBatch],
        address: this.config.address,
        functionName: "mintBatch",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    public mint = new ContractOperation<IERC1155MintableMintParams>(this.config.client, {
        abi: [abi.mint],
        address: this.config.address,
        functionName: "mint",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

}