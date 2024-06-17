# Web3Tokens

A library for interacting with EVM tokens such as ERC20, ERC721 and ERC1155.

# Installation

This package is not yet available on npm as it's still in development.

# Usage

This package is built on top of [Viem](https://viem.sh/) so you'll need to install it and initialize both public and wallet clients.

```ts
import { Web3Tokens } from 'web3-tokens';

// Viem stuffs
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

// You first need to create an account
const account = privateKeyToAccount(process.env.PRIVATE_KEY);

// This config is used to initialize both public and wallet clients
const config = {
    chain: sepolia,
    transport: http(),
    account
};

// Then you can initialize the library
const tokens = new Web3Tokens({
    public: createPublicClient(config),
    wallet: createWalletClient(config)
});

// And you're good to go!
```

# ERC20

The most used token standard is ERC20. Here is how you can interact with, but the scheme is similar for all tokens.

```ts
// you first need to get the token contract instance
const token = tokens.erc20().get('0x...');

// in case your token need some extensions, you can add them like this:
const token = tokens.erc20()
    .setMintable()
    .setOwnable()
    .get('0x...');
```

current supported extensions are: mintable, burnable, pausable, flashMint, ownable, accessControl and accessManaged

Once you have the contract instance, you can call its methods like this:

```ts
// read method is used like this
const balance = await token.balanceOf(account.address); // returns the token balance of the account address

// Write method are a bit different since you have multiple options to execute them:

// 1. Simulate the transaction
const transaction = await token.transfer.simulate({
    to: "0x...",
    value: 50000
});

// this will return the transaction result, and some infomation about the request.

// 2. Execute the transaction
const transaction = await token.transfer.execute({
    to: "0x...",
    value: 50000
});

// this send the transanction to the blockchain and return a transaction instance that you can use like this:
console.log(transaction.hash); // returns the transaction hash

const receipt = await transaction.waitForReceipt(4); // 4 is the number of confirmations required before returning the receipt, by default it's 1
```

In case you are using a smart client with same interface than viem, you can execute batch functions. Here is an example using [zerodev batch transactions](https://docs.zerodev.app/smart-wallet/batching-transactions#sendtransactions):

```ts
// 3. get the transaction data, ready to be executed and sent in a batch transaction for example:
const transaction1 = await token.transfer.getTxData({
    to: "0x...",
    value: 50000
});

const transaction2 = await token.transfer.getTxData({
    to: "0x...",
    value: 50000
});

// this function is not natively supported by viem, but some library can add ways to batch transactions using smart accounts.
const txHash = await kernelClient.sendTransactions({
  transactions: [
    transaction1,
    transaction2
  ],
})
```
# ERC721 and ERC1155

ERC721 and ERC1155 are working the same way than ERC20. You can create intances like this:

```ts
const erc721 = tokens.erc721().get('0x...');
const erc1155 = tokens.erc1155().get('0x...');

// extensions available for erc721 are: Burnable, Mintable, Pausable, Ownable, AccessManaged, AccessControl
const erc721Burnable = tokens.erc721().setBurnable().get('0x...');

// extensions available for erc1155 are being added but access are already supported:
const erc1155Access = tokens.erc1155().setAccessControl().get('0x...');
```

This library is still in development and some features will be added soon. Feel free to open issues or pull requests to help the project.
