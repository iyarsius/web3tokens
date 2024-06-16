import { Address } from 'viem';
import { ERC20, IERC20 } from '../../structures/ERC20';
import { ERC20Mintable } from '../../structures/ERC20/extensions/ERC20Mintable';
import { ERC20Pausable } from '../../structures/ERC20/extensions/ERC20Pausable';
import { Constructor, InstanceTypeUnion } from './types';
import { IContractConfig } from '../../types/Contracts';

export function applyMixins<T extends Constructor>(baseClass: T, mixins: Constructor[]) {
    class Mixed extends (baseClass as any) {
        constructor(...args: any[]) {
            super(...args);
            mixins.forEach(mixin => {
                copyProperties(this, new mixin());
            });
        }
    }

    function copyProperties(target: any, source: any) {
        Object.getOwnPropertyNames(source).forEach(key => {
            if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)!);
            }
        });
    }

    return Mixed as Constructor<InstanceType<typeof Mixed>>;

}

function getERC20<T extends Constructor[]>(address: Address, extensions: T): IERC20 & InstanceTypeUnion<T> {
    if (!extensions || extensions.length === 0) return new ERC20({} as unknown as IContractConfig) as ERC20 & InstanceTypeUnion<T>;

    const MixedClasses = applyMixins(ERC20, extensions);
    return new MixedClasses({} as unknown as IContractConfig) as ERC20 & InstanceTypeUnion<T>;
};

const erc20 = getERC20("0x", [ ERC20Mintable]);