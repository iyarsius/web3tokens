# Web3Tokens

A comprehensive library for interacting with EVM tokens, including ERC20, ERC721, and ERC1155 standards.

## Installation

To install the package, run the following command:

```bash
npm i @lunarislab/web3tokens
```

## Usage

This package is built on top of [Viem](https://viem.sh/). Therefore, you'll need to install Viem and initialize both public and wallet clients.

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

## Contribution

This library is still under development. Contributions are welcome! Feel free to open issues or submit pull requests to help improve the project.
