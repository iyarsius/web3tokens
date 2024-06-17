export const ERC721IncorrectOwner = {
    "inputs": [
       {
          "internalType": "address",
          "name": "sender",
          "type": "address"
       },
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       },
       {
          "internalType": "address",
          "name": "owner",
          "type": "address"
       }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
 };
 
 export const ERC721InsufficientApproval = {
    "inputs": [
       {
          "internalType": "address",
          "name": "operator",
          "type": "address"
       },
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
 };
 
 export const ERC721InvalidApprover = {
    "inputs": [
       {
          "internalType": "address",
          "name": "approver",
          "type": "address"
       }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
 };
 
 export const ERC721InvalidOperator = {
    "inputs": [
       {
          "internalType": "address",
          "name": "operator",
          "type": "address"
       }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
 };
 
 export const ERC721InvalidOwner = {
    "inputs": [
       {
          "internalType": "address",
          "name": "owner",
          "type": "address"
       }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
 };
 
 export const ERC721InvalidReceiver = {
    "inputs": [
       {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
       }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
 };
 
 export const ERC721InvalidSender = {
    "inputs": [
       {
          "internalType": "address",
          "name": "sender",
          "type": "address"
       }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
 };
 
 export const ERC721NonexistentToken = {
    "inputs": [
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
 };
 
 export const Approval = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "Approval",
    "type": "event"
 };
 
 export const ApprovalForAll = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
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
 
 export const Transfer = {
    "anonymous": false,
    "inputs": [
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
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "Transfer",
    "type": "event"
 };
 
 export const approve = {
    "inputs": [
       {
          "internalType": "address",
          "name": "to",
          "type": "address"
       },
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const balanceOf = {
    "inputs": [
       {
          "internalType": "address",
          "name": "owner",
          "type": "address"
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
 
 export const getApproved = {
    "inputs": [
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "getApproved",
    "outputs": [
       {
          "internalType": "address",
          "name": "",
          "type": "address"
       }
    ],
    "stateMutability": "view",
    "type": "function"
 };
 
 export const isApprovedForAll = {
    "inputs": [
       {
          "internalType": "address",
          "name": "owner",
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
 
 export const name = {
    "inputs": [],
    "name": "name",
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
 
 export const ownerOf = {
    "inputs": [
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "ownerOf",
    "outputs": [
       {
          "internalType": "address",
          "name": "",
          "type": "address"
       }
    ],
    "stateMutability": "view",
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
          "name": "tokenId",
          "type": "uint256"
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
 
 export const symbol = {
    "inputs": [],
    "name": "symbol",
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
 
 export const tokenURI = {
    "inputs": [
       {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "tokenURI",
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
 
 export const transferFrom = {
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
          "name": "tokenId",
          "type": "uint256"
       }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 }; 