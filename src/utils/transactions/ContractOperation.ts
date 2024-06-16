// src/utils/transactions/Transaction.ts

import { Abi, Account, Address, Chain, ContractFunctionName, SendTransactionParameters, TransactionReceipt, encodeFunctionData } from "viem";
import { IClient } from "../../types/Client";

export interface IContractOperationConfig {
    abi: {
        "inputs": {
            "name": string,
            "type": string
        }[],
        "stateMutability": string,
        "type": string
    }[];
    address: Address,
    functionName: ContractFunctionName,
    account: Account,
    chain: Chain
};


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
     * @returns A transaction receipt
     */
    async execute(args: args): Promise<TransactionReceipt> {
        const { request } = await this.client.public.simulateContract({
            ...this.config,
            args: this._parseArgs(args),
        });

        const txHash = await this.client.wallet.writeContract(request);

        return await this.client.public.getTransactionReceipt({
            hash: txHash
        });
    }

    /**
     * Simulate a contract function call
     * 
     * @returns The result of the contract call
     * @param T The type of the result
     */
    async simulate<T extends any>(args: args): Promise<T> {
        const res = await this.client.public.simulateContract({
            ...this.config,
            args: this._parseArgs(args),
        });

        return res.result
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
