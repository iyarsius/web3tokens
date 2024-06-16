import { Address, PublicClient, WalletClient } from "viem";
import { IClient } from "./Client";
import { Client } from "..";

export interface IContractConfig {
    address: Address;
    client: Client
};

export interface IContractEventOptions<argsType> {
    filters?: { [key in keyof argsType]?: any[] };
}