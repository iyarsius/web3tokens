import * as abi from "../../../abis//ERC20/extensions/ERC20Permit";
import { IERC20Permit, IERC20PermitEip712DomainReturns, IERC20PermitEvents, IERC20PermitPermitParams } from "../../../types//ERC20/extensions/ERC20Permit";
import { ContractOperation } from "../../ContractOperation";
import { IContractConfig } from "../../../types/Contracts";
import { Address } from "viem";

export class ERC20Permit implements IERC20Permit {
    address: Address;

    constructor(protected config: IContractConfig) {
        this.address = config.address
    }

    on<T extends keyof IERC20PermitEvents>(eventName: T, callback: IERC20PermitEvents[T]) {
        return this.config.client.public.watchContractEvent({
            address: this.config.address,
            abi: [abi[eventName]],
            onLogs: logs => logs.map(l => callback(l as any))
        })
    };

    async DOMAIN_SEPARATOR(): Promise<string> {
        return await this.config.client.public.readContract({
            abi: [abi.DOMAIN_SEPARATOR],
            address: this.address,
            functionName: "DOMAIN_SEPARATOR",
            args: []
        }) as any
    }

    async eip712Domain(): Promise<IERC20PermitEip712DomainReturns> {
        const data = await this.config.client.public.readContract({
            abi: [abi.eip712Domain],
            address: this.address,
            functionName: "eip712Domain",
            args: []
        }) as any
        return {
            fields: data[0],
            name: data[1],
            version: data[2],
            chainId: data[3],
            verifyingContract: data[4],
            salt: data[5],
            extensions: data[6]
        } as IERC20PermitEip712DomainReturns
    }

    async nonces(owner: string): Promise<number> {
        return await this.config.client.public.readContract({
            abi: [abi.nonces],
            address: this.address,
            functionName: "nonces",
            args: [owner]
        }) as any
    }

    public permit(args: IERC20PermitPermitParams): ContractOperation {
        return new ContractOperation(this.config.client, {
            abi: [abi.permit],
            args,
            address: this.config.address,
            functionName: "permit",
            account: this.config.client.wallet.account!,
            chain: this.config.client.wallet.chain!
        });
    }

}
