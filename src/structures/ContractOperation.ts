import { Hash, SimulateContractReturnType, TransactionReceipt, encodeFunctionData } from "viem";
import { SendTransactionParameters } from "viem/zksync";
import { IClient } from "../types/Client";
import { IContractOperationConfig } from "../types/Contracts";

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

export class ContractOperation<args extends Record<string, any>> {
    constructor(
        private client: IClient,
        private config: IContractOperationConfig
    ) { }

    private _parseArgs(args: args) {
        return this.config.abi[0].inputs.map(arg => args[arg.name])
    }

    /**
     * Execute a contract function
     * 
     * @returns A transaction hash
     */
    async execute(args: args): Promise<ContractOperationResult> {
        const { request } = await this.client.public.simulateContract({
            ...this.config,
            args: this._parseArgs(args),
        });

        const hash = await this.client.wallet.writeContract(request);

        return new ContractOperationResult(hash, this.client)
    }

    /**
     * Simulate a contract function call
     * 
     * @returns The result of the contract call
     * @param T The type of the result
     */
    async simulate(args: args): Promise<SimulateContractReturnType> {
        return await this.client.public.simulateContract({
            ...this.config,
            args: this._parseArgs(args),
        });
    }

    /**
      * Get the transaction data for a contract call, which can be used to send a transaction
      * 
      * @returns The transaction data
      */
    async getTxData(args: args): Promise<SendTransactionParameters> {
        const functionData = encodeFunctionData({
            abi: this.config.abi,
            functionName: this.config.functionName,
            args: this._parseArgs(args),
        });

        return {
            to: this.config.address,
            data: functionData,
            account: this.config.account,
            chain: this.config.chain,
        }
    }
}
