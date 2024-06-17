export const constructor = {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
 };
 
 export const ERC1155InsufficientBalance = {
    "inputs": [
       {
          "internalType": "address",
          "name": "sender",
          "type": "address"
       },
       {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
       },
       {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
       },
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "ERC1155InsufficientBalance",
    "type": "error"
 };
 
 export const ERC1155InvalidApprover = {
    "inputs": [
       {
          "internalType": "address",
          "name": "approver",
          "type": "address"
       }
    ],
    "name": "ERC1155InvalidApprover",
    "type": "error"
 };
 
 export const ERC1155InvalidArrayLength = {
    "inputs": [
       {
          "internalType": "uint256",
          "name": "idsLength",
          "type": "uint256"
       },
       {
          "internalType": "uint256",
          "name": "valuesLength",
          "type": "uint256"
       }
    ],
    "name": "ERC1155InvalidArrayLength",
    "type": "error"
 };
 
 export const ERC1155InvalidOperator = {
    "inputs": [
       {
          "internalType": "address",
          "name": "operator",
          "type": "address"
       }
    ],
    "name": "ERC1155InvalidOperator",
    "type": "error"
 };
 
 export const ERC1155InvalidReceiver = {
    "inputs": [
       {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
       }
    ],
    "name": "ERC1155InvalidReceiver",
    "type": "error"
 };
 
 export const ERC1155InvalidSender = {
    "inputs": [
       {
          "internalType": "address",
          "name": "sender",
          "type": "address"
       }
    ],
    "name": "ERC1155InvalidSender",
    "type": "error"
 };
 
 export const ERC1155MissingApprovalForAll = {
    "inputs": [
       {
          "internalType": "address",
          "name": "operator",
          "type": "address"
       },
       {
          "internalType": "address",
          "name": "owner",
          "type": "address"
       }
    ],
    "name": "ERC1155MissingApprovalForAll",
    "type": "error"
 };
 
 export const ApprovalForAll = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
       },
       {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
       }
    ],
    "name": "ApprovalForAll",
    "type": "event"
 };
 
 export const TransferBatch = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
       },
       {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
       },
       {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
       }
    ],
    "name": "TransferBatch",
    "type": "event"
 };
 
 export const TransferSingle = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
       },
       {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
       },
       {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
       }
    ],
    "name": "TransferSingle",
    "type": "event"
 };
 
 export const URI = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
       },
       {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
       }
    ],
    "name": "URI",
    "type": "event"
 };
 
 export const balanceOf = {
    "inputs": [
       {
          "internalType": "address",
          "name": "account",
          "type": "address"
       },
       {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
       }
    ],
    "name": "balanceOf",
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
 
 export const balanceOfBatch = {
    "inputs": [
       {
          "internalType": "address[]",
          "name": "accounts",
          "type": "address[]"
       },
       {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
       }
    ],
    "name": "balanceOfBatch",
    "outputs": [
       {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
       }
    ],
    "stateMutability": "view",
    "type": "function"
 };
 
 export const isApprovedForAll = {
    "inputs": [
       {
          "internalType": "address",
          "name": "account",
          "type": "address"
       },
       {
          "internalType": "address",
          "name": "operator",
          "type": "address"
       }
    ],
    "name": "isApprovedForAll",
    "outputs": [
       {
          "internalType": "bool",
          "name": "",
          "type": "bool"
       }
    ],
    "stateMutability": "view",
    "type": "function"
 };
 
 export const safeBatchTransferFrom = {
    "inputs": [
       {
          "internalType": "address",
          "name": "from",
          "type": "address"
       },
       {
          "internalType": "address",
          "name": "to",
          "type": "address"
       },
       {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
       },
       {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
       },
       {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
       }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const safeTransferFrom = {
    "inputs": [
       {
          "internalType": "address",
          "name": "from",
          "type": "address"
       },
       {
          "internalType": "address",
          "name": "to",
          "type": "address"
       },
       {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
       },
       {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
       },
       {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
       }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const setApprovalForAll = {
    "inputs": [
       {
          "internalType": "address",
          "name": "operator",
          "type": "address"
       },
       {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
       }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const supportsInterface = {
    "inputs": [
       {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
       }
    ],
    "name": "supportsInterface",
    "outputs": [
       {
          "internalType": "bool",
          "name": "",
          "type": "bool"
       }
    ],
    "stateMutability": "view",
    "type": "function"
 };
 
 export const uri = {
    "inputs": [
       {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
       }
    ],
    "name": "uri",
    "outputs": [
       {
          "internalType": "string",
          "name": "",
          "type": "string"
       }
    ],
    "stateMutability": "view",
    "type": "function"
 };
 
 