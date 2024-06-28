import * as abi from "../../../abis/ERC1155/extensions/ERC1155Mintable";
import { IERC1155Mintable, IERC1155MintableMintBatchParams, IERC1155MintableMintParams } from "../../../types//ERC1155/extensions/ERC1155Mintable";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export class ERC1155Mintable implements IERC1155Mintable {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    public mintBatch(args: IERC1155MintableMintBatchParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.mintBatch],
            args,
            address: this.config.address,
            functionName: "mintBatch",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

    public mint(args: IERC1155MintableMintParams) {
        return new ContractOperation(this.config.client, {
            abi: [abi.mint],
            args,
            address: this.config.address,
            functionName: "mint",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }
}