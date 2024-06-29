<h1 align="center">Web3Tokens</h1>
<div align="center">
  <p align="left">
    <strong>Web3Tokens</strong> is designed to simplify the interaction with Ethereum Virtual Machine (EVM) tokens, including ERC20, ERC721, and ERC1155 standards. This library aims to make it easier for new developers to engage with smart contracts, offering an accessible entry point into blockchain development.
  </p>
  <a href="https://lunaris-lab.github.io/web3tokens/docs/intro">
    <img src="https://img.shields.io/badge/docs-available-blue" alt="Documentation Badge">
  </a>
  <a href="https://www.npmjs.com/package/@lunarislab/web3tokens">
    <img src="https://img.shields.io/npm/v/@lunarislab/web3tokens.svg" alt="NPM Version Badge">
  </a>
  <a href="https://github.com/lunaris-lab/web3tokens/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/lunaris-lab/web3tokens.svg" alt="License Badge">
  </a>
</div>

## Vision and Goals

The primary goal of Web3Tokens is to simplify the use of smart contracts, specifically focusing on token interactions. By providing a user-friendly interface and abstracting the complexities of smart contracts, ABIs, and signatures, Web3Tokens empowers developers—especially those who are new to blockchain development—to jump right in and start building.

## Prerequisites

Before you start using Web3Tokens, you should have a basic understanding of [Viem](https://viem.sh/). This knowledge is essential for correctly instantiating the client and making the most of the library's features.

## Installation

To install the package, run the following command:

```bash
npm i @lunarislab/web3tokens
```

### Example Setup

```typescript
import { Web3Tokens } from '@lunarislab/web3tokens';
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

// Create an account using a private key
const account = privateKeyToAccount(process.env.PRIVATE_KEY);

// Configuration for initializing clients
const config = {
    chain: sepolia,
    transport: http(),
    account
};

// Initialize the library
const tokens = new Web3Tokens({
    public: createPublicClient(config),
    wallet: createWalletClient(config)
});

// Ready to use!
```

## ERC20

ERC20 is the most commonly used token standard. Below are examples of how to interact with ERC20 tokens.

### Getting a Token Contract Instance

```typescript
// Retrieve the token contract instance
const token = tokens.erc20().get('0x...');

// Add extensions if needed
const token = tokens.erc20()
    .setMintable()
    .setOwnable()
    .get('0x...');
```

Current supported extensions: `mintable`, `burnable`, `pausable`, `flashMint`, `ownable`, `accessControl`, `accessManaged`.

### Calling Contract Methods

#### Reading from the Contract

```typescript
const balance = await token.balanceOf(account.address);
```

#### Writing to the Contract

```typescript
// Simulate a transaction
const transaction = await token.transfer({
    to: "0x...",
    value: 50000
}).simulate();

// Execute a transaction
const transaction = await token.transfer({
    to: "0x...",
    value: 50000
}).execute();

// Retrieve the transaction hash
console.log(transaction.hash);

// Wait for the transaction receipt (4 confirmations by default)
const receipt = await transaction.waitForReceipt(4);
```

### Batch Transactions

If using a smart client with a similar interface to Viem, you can batch functions. Here's an example using [zerodev batch transactions](https://docs.zerodev.app/smart-wallet/batching-transactions#sendtransactions):

```typescript
const transaction1 = await token.transfer({
    to: "0x...",
    value: 50000
}).getTxData();

const transaction2 = await token.transfer({
    to: "0x...",
    value: 50000
}).getTxData();

// Send batch transactions using a smart account client
const txHash = await kernelClient.sendTransactions({
  transactions: [
    transaction1,
    transaction2
  ],
});
```

### Listening to Contract Events

```typescript
token.on('Transfer', (data) => {
    console.log(data);
    // Additional logic here
});
```

## ERC721 and ERC1155

ERC721 and ERC1155 follow a similar approach to ERC20.

### Example Setup

```typescript
const erc721 = tokens.erc721().get('0x...');
const erc1155 = tokens.erc1155().get('0x...');

// ERC721 extensions: Burnable, Mintable, Pausable, Ownable, AccessManaged, AccessControl
const erc721Burnable = tokens.erc721().setBurnable().get('0x...');

// ERC1155 extensions: AccessControl (more extensions are being added)
const erc1155Access = tokens.erc1155().setAccessControl().get('0x...');
```

### Contribution and Community

Web3Tokens is an open-source project, and all contributions are welcome. Whether you’re a seasoned developer or just starting, your ideas and code improvements are valuable. Feel free to open issues or pull requests on our GitHub repository.

### Documentation

For more detailed information, please refer to the [Web3Tokens Documentation](https://lunaris-lab.github.io/web3tokens/docs/intro).