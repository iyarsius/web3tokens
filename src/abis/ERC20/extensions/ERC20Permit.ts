export const EIP712DomainChanged = {
    "anonymous": false,
    "inputs": [],
    "name": "EIP712DomainChanged",
    "type": "event"
};

export const DOMAIN_SEPARATOR = {
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
    ],
    "stateMutability": "view",
    "type": "function"
};

export const eip712Domain = {
    "inputs": [],
    "name": "eip712Domain",
    "outputs": [
        {
            "internalType": "bytes1",
            "name": "fields",
            "type": "bytes1"
        },
        {
            "internalType": "string",
            "name": "name",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "version",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "verifyingContract",
            "type": "address"
        },
        {
            "internalType": "bytes32",
            "name": "salt",
            "type": "bytes32"
        },
        {
            "internalType": "uint256[]",
            "name": "extensions",
            "type": "uint256[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
};

export const nonces = {
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "nonces",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
};

export const permit = {
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
    ],
    "name": "permit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
};