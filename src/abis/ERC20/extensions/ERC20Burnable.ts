export const burn = {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
};

export const burnFrom = {
    "inputs": [
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }
    ],
    "name": "burnFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
};