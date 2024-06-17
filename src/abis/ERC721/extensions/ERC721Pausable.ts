export const EnforcedPause = {
    "inputs": [],
    "name": "EnforcedPause",
    "type": "error"
 };
 
 export const ExpectedPause = {
    "inputs": [],
    "name": "ExpectedPause",
    "type": "error"
 };
 
 export const Paused = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
       }
    ],
    "name": "Paused",
    "type": "event"
 };
 
 export const Unpaused = {
    "anonymous": false,
    "inputs": [
       {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
       }
    ],
    "name": "Unpaused",
    "type": "event"
 };
 
 export const pause = {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 export const paused = {
    "inputs": [],
    "name": "paused",
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
 
 export const unpause = {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
 };
 
 