export const mintBatch = {
    "inputs": [
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
          "name": "amounts",
          "type": "uint256[]"
       },
       {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
       }
    ],
    "name": "mintBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const mint = {
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
       },
       {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
       },
       {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
       }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 