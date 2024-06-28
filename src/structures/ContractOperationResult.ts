import { Hash, TransactionReceipt } from "viem";
import { IClient } from "../types/Client";

export class ContractOperationResult {
    constructor(public hash: Hash, protected client: IClient) { };

    async waitForReceipt(confirmations: number = 1): Promise<TransactionReceipt> {
        return await this.client.public.waitForTransactionReceipt(
            {
                hash: this.hash,
                confirmations,
            },
        )
    };
}