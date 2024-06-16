// src/utils/transactions/BatchManager.ts

import { ContractOperation } from './ContractOperation';

export class BatchManager {
    private batch: ContractOperation[];

    constructor() {
        this.batch = [];
    }

    addTransaction(tx: ContractOperation) {
        this.batch.push(tx);
    }

    async executeBatch() {
        console.log('Executing batch of transactions:', this.batch);
        for (const tx of this.batch) {
            await tx.execute();
        }
        this.batch = [];
    }

    async simulateBatch() {
        console.log('Simulating batch of transactions:', this.batch);
        for (const tx of this.batch) {
            await tx.simulate();
        }
    }
}
