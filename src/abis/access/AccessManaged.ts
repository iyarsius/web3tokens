export const AccessManagedInvalidAuthority = {
   "inputs": [
      {
         "internalType": "address",
         "name": "authority",
         "type": "address"
      }
   ],
   "name": "AccessManagedInvalidAuthority",
   "type": "error"
};

export const AccessManagedRequiredDelay = {
   "inputs": [
      {
         "internalType": "address",
         "name": "caller",
         "type": "address"
      },
      {
         "internalType": "uint32",
         "name": "delay",
         "type": "uint32"
      }
   ],
   "name": "AccessManagedRequiredDelay",
   "type": "error"
};

export const AccessManagedUnauthorized = {
   "inputs": [
      {
         "internalType": "address",
         "name": "caller",
         "type": "address"
      }
   ],
   "name": "AccessManagedUnauthorized",
   "type": "error"
};

export const AuthorityUpdated = {
   "anonymous": false,
   "inputs": [
      {
         "indexed": false,
         "internalType": "address",
         "name": "authority",
         "type": "address"
      }
   ],
   "name": "AuthorityUpdated",
   "type": "event"
};

export const authority = {
   "inputs": [],
   "name": "authority",
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

export const isConsumingScheduledOp = {
   "inputs": [],
   "name": "isConsumingScheduledOp",
   "outputs": [
      {
         "internalType": "bytes4",
         "name": "",
         "type": "bytes4"
      }
   ],
   "stateMutability": "view",
   "type": "function"
};

export const setAuthority = {
   "inputs": [
      {
         "internalType": "address",
         "name": "newAuthority",
         "type": "address"
      }
   ],
   "name": "setAuthority",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
};

