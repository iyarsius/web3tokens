import { Account, Address, Chain, ContractFunctionName, PublicClient, WalletClient } from "viem";

export interface IContractConfig {
    address: Address;
    client: {
        public: PublicClient;
        wallet: WalletClient;
    }
};

export interface ISimpleAbiInput {
    name: string;
    type: string;
}

export interface ISimpleAbi {
    inputs: ISimpleAbiInput[],
    stateMutability: string,
    type: string
}

export interface IContractOperationConfig<T = Record<string, any>> {
    abi: ISimpleAbi[];
    args: T,
    address: Address,
    functionName: ContractFunctionName,
    account: Account,
    chain: Chain
};