export interface BatchContext {
    numSequencedTransactions: number;
    numSubsequentQueueTransactions: number;
    timestamp: number;
    blockNumber: number;
}
export interface AppendSequencerBatchParams {
    shouldStartAtElement: number;
    totalElementsToAppend: number;
    contexts: BatchContext[];
    transactions: string[];
}
export declare const encodeAppendSequencerBatch: (b: AppendSequencerBatchParams) => string;
export declare const decodeAppendSequencerBatch: (b: string) => AppendSequencerBatchParams;
export declare const sequencerBatch: {
    encode: (b: AppendSequencerBatchParams) => string;
    decode: (b: string) => AppendSequencerBatchParams;
};
