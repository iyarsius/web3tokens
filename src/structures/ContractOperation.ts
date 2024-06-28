import { SimulateContractReturnType, TransactionReceipt, encodeFunctionData } from "viem";
import { SendTransactionParameters } from "viem/zksync";
import { IClient } from "../types/Client";
import { IContractOperationConfig } from "../types/Contracts";
import { ContractOperationResult } from "./ContractOperationResult";

export class ContractOperation {
    constructor(
        protected client: IClient,
        protected config: IContractOperationConfig
    ) { }

    protected _parseArgs() {
        const args = this.config.args;

        return this.config.abi[0].inputs.map(arg => args[arg.name])
    }

    /**
     * Execute a contract function directly on the blockchain.
     * 
     * @returns A `ContractOperationResult` instance which contains the transaction hash
     */
    async execute(): Promise<ContractOperationResult> {
        const { request } = await this.client.public.simulateContract({
            ...this.config,
            args: this._parseArgs(),
        });

        const hash = await this.client.wallet.writeContract(request);

        return new ContractOperationResult(hash, this.client)
    }

    /**
     * Simulate a contract function call.
     * 
     * @returns The result of the contract call
     */
    async simulate(): Promise<SimulateContractReturnType> {
        return await this.client.public.simulateContract({
            ...this.config,
            args: this._parseArgs(),
        });
    }

    /**
      * Get the transaction data for a contract call, which can be used to send a transaction
      * 
      * @returns The transaction data
      */
    async getTxData(): Promise<SendTransactionParameters> {
        const functionData = encodeFunctionData({
            abi: this.config.abi,
            functionName: this.config.functionName,
            args: this._parseArgs(),
        });

        return {
            to: this.config.address,
            data: functionData,
            account: this.config.account,
            chain: this.config.chain,
        }
    }
}
