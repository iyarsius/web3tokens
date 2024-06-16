export const OwnableInvalidOwner = {
    "inputs": [
       {
          "internalType": "address",
          "name": "owner",
          "type": "address"
       }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
 };
 
 export const OwnableUnauthorizedAccount = {
    "inputs": [
       {
          "internalType": "address",
          "name": "account",
          "type": "address"
       }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
 };
 
 export const OwnershipTransferred = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
       }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
 };
 
 export const owner = {
    "inputs": [],
    "name": "owner",
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
 
 export const renounceOwnership = {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const transferOwnership = {
    "inputs": [
       {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
       }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 }; 