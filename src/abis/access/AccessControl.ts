export const AccessControlBadConfirmation = {
    "inputs": [],
    "name": "AccessControlBadConfirmation",
    "type": "error"
 };
 
 export const AccessControlUnauthorizedAccount = {
    "inputs": [
       {
          "internalType": "address",
          "name": "account",
          "type": "address"
       },
       {
          "internalType": "bytes32",
          "name": "neededRole",
          "type": "bytes32"
       }
    ],
    "name": "AccessControlUnauthorizedAccount",
    "type": "error"
 };
 
 export const RoleAdminChanged = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       },
       {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
       },
       {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
       }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
 };
 
 export const RoleGranted = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
       }
    ],
    "name": "RoleGranted",
    "type": "event"
 };
 
 export const RoleRevoked = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
       },
       {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
       }
    ],
    "name": "RoleRevoked",
    "type": "event"
 };
 
 export const DEFAULT_ADMIN_ROLE = {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
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
 
 export const getRoleAdmin = {
    "inputs": [
       {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       }
    ],
    "name": "getRoleAdmin",
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
 
 export const grantRole = {
    "inputs": [
       {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       },
       {
          "internalType": "address",
          "name": "account",
          "type": "address"
       }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const hasRole = {
    "inputs": [
       {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       },
       {
          "internalType": "address",
          "name": "account",
          "type": "address"
       }
    ],
    "name": "hasRole",
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
 
 export const renounceRole = {
    "inputs": [
       {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       },
       {
          "internalType": "address",
          "name": "callerConfirmation",
          "type": "address"
       }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const revokeRole = {
    "inputs": [
       {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
       },
       {
          "internalType": "address",
          "name": "account",
          "type": "address"
       }
    ],
    "name": "revokeRole",
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
 
 