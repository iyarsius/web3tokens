import * as abi from "../../../abis/ERC20/extensions/ERC20FlashMint";
import { IERC20FlashMintFlashLoanParams } from "../../../types/ERC20/extensions/ERC20FlashMint";
import { ContractOperation } from "../../../utils/transactions/ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export interface IERC20FlashMint {
    flashFee(token: string, value: number): Promise<number>;
    flashLoan: ContractOperation<IERC20FlashMintFlashLoanParams>;
    maxFlashLoan(token: string): Promise<number>;
}

export class ERC20FlashMint implements IERC20FlashMint {
    address: Address;

    constructor(public config: IContractConfig) {
        this.address = config.address
    }

    async flashFee(token: string, value: number): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.flashFee],
            address: this.address,
            functionName: "flashFee",
            args: [token, value]
        }) as any
    }

    public flashLoan = new ContractOperation<IERC20FlashMintFlashLoanParams>(this.config.client, {
        abi: [abi.flashLoan],
        address: this.config.address,
        functionName: "flashLoan",
        account: this.config.client.wallet.account!,
        chain: this.config.client.wallet.chain!
    });

    async maxFlashLoan(token: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.maxFlashLoan],
            address: this.address,
            functionName: "maxFlashLoan",
            args: [token]
        }) as any
    }

}
