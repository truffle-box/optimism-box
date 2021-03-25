"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../../../helpers");
const globalContext = {
    ovmCHAINID: 420,
};
const transactionContext = {
    ovmTIMESTAMP: 12341234,
    ovmNUMBER: 13371337,
    ovmGASLIMIT: 45674567,
    ovmTXGASLIMIT: 78907890,
    ovmL1QUEUEORIGIN: 1,
    ovmL1TXORIGIN: '0x1234123412341234123412341234123412341234',
};
const messageContext = {
    ovmCALLER: '0x6789678967896789678967896789678967896789',
    ovmADDRESS: '0x4567456745674567456745674567456745674567',
};
const test_contextOpcodes = {
    name: 'unit tests for basic getter opcodes',
    preState: {
        ExecutionManager: {
            ovmStateManager: '$OVM_STATE_MANAGER',
            ovmSafetyChecker: '$OVM_SAFETY_CHECKER',
            messageRecord: {
                nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT,
            },
            globalContext,
            transactionContext,
            messageContext,
        },
        StateManager: {
            owner: '$OVM_EXECUTION_MANAGER',
            accounts: {
                $DUMMY_OVM_ADDRESS_1: {
                    codeHash: helpers_1.NON_NULL_BYTES32,
                    ethAddress: '$OVM_CALL_HELPER',
                },
            },
        },
    },
    parameters: [
        {
            name: 'gets ovmTIMESTAMP',
            steps: [
                {
                    functionName: 'ovmTIMESTAMP',
                    expectedReturnValue: transactionContext.ovmTIMESTAMP,
                },
            ],
        },
        {
            name: 'gets ovmNUMBER',
            steps: [
                {
                    functionName: 'ovmNUMBER',
                    expectedReturnValue: transactionContext.ovmNUMBER,
                },
            ],
        },
        {
            name: 'gets ovmGASLIMIT',
            steps: [
                {
                    functionName: 'ovmGASLIMIT',
                    expectedReturnValue: transactionContext.ovmGASLIMIT,
                },
            ],
        },
        {
            name: 'gets ovmL1QUEUEORIGIN',
            steps: [
                {
                    functionName: 'ovmL1QUEUEORIGIN',
                    expectedReturnValue: transactionContext.ovmL1QUEUEORIGIN,
                },
            ],
        },
        {
            name: 'gets ovmL1TXORIGIN',
            steps: [
                {
                    functionName: 'ovmL1TXORIGIN',
                    expectedReturnValue: transactionContext.ovmL1TXORIGIN,
                },
            ],
        },
        {
            name: 'gets ovmCHAINID',
            steps: [
                {
                    functionName: 'ovmCHAINID',
                    expectedReturnValue: globalContext.ovmCHAINID,
                },
            ],
        },
    ],
};
const runner = new helpers_1.ExecutionManagerTestRunner();
runner.run(test_contextOpcodes);
//# sourceMappingURL=context-opcodes.spec.js.map