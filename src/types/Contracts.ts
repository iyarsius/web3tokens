import { Account, Address, Chain, ContractFunctionName, PublicClient, WalletClient } from "viem";

export interface IContractConfig {
    address: Address;
    client: {
        public: PublicClient;
        wallet: WalletClient;
    }
};

export interface IContractEventOptions<argsType> {
    filters?: { [key in keyof argsType]?: any[] };
};

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