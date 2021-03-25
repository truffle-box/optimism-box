"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../../../helpers");
const test_ovmREVERT = {
    name: 'Basic tests for ovmREVERT',
    preState: {
        ExecutionManager: {
            ovmStateManager: '$OVM_STATE_MANAGER',
            ovmSafetyChecker: '$OVM_SAFETY_CHECKER',
            messageRecord: {
                nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT,
            },
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
            name: 'ovmCALL => ovmREVERT',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmREVERT',
                                revertData: '0xdeadbeef',
                                expectedReturnStatus: false,
                                expectedReturnValue: {
                                    flag: helpers_1.REVERT_FLAGS.INTENTIONAL_REVERT,
                                    data: '0xdeadbeef',
                                    nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                    ovmGasRefund: 0,
                                },
                            },
                        ],
                    },
                    expectedReturnStatus: false,
                    expectedReturnValue: '0xdeadbeef',
                },
            ],
        },
    ],
};
const runner = new helpers_1.ExecutionManagerTestRunner();
runner.run(test_ovmREVERT);
//# sourceMappingURL=ovmREVERT.spec.js.map