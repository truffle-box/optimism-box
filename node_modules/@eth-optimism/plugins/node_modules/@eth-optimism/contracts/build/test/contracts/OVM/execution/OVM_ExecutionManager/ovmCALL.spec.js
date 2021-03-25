"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../../../helpers");
const DUMMY_REVERT_DATA = '0xdeadbeef1e5420deadbeef1e5420deadbeef1e5420deadbeef1e5420deadbeef1e5420';
const DEAD_ADDRESS = '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1234';
const test_ovmCALL = {
    name: 'Basic tests for ovmCALL',
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
                $DUMMY_OVM_ADDRESS_2: {
                    codeHash: helpers_1.NON_NULL_BYTES32,
                    ethAddress: '$OVM_CALL_HELPER',
                },
                $DUMMY_OVM_ADDRESS_3: {
                    codeHash: helpers_1.VERIFIED_EMPTY_CONTRACT_HASH,
                    ethAddress: '0x' + '00'.repeat(20),
                },
            },
            verifiedContractStorage: {
                $DUMMY_OVM_ADDRESS_1: {
                    [helpers_1.NON_NULL_BYTES32]: true,
                },
            },
        },
    },
    parameters: [
        {
            name: 'ovmCALL(ADDRESS_1) => ovmADDRESS',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmADDRESS',
                                expectedReturnValue: '$DUMMY_OVM_ADDRESS_1',
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmSSTORE',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSSTORE',
                                functionParams: {
                                    key: helpers_1.NON_NULL_BYTES32,
                                    value: helpers_1.NON_NULL_BYTES32,
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmSSTORE + ovmSLOAD, ovmCALL(ADDRESS_1) => ovmSLOAD',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSSTORE',
                                functionParams: {
                                    key: helpers_1.NON_NULL_BYTES32,
                                    value: helpers_1.NON_NULL_BYTES32,
                                },
                                expectedReturnStatus: true,
                            },
                            {
                                functionName: 'ovmSLOAD',
                                functionParams: {
                                    key: helpers_1.NON_NULL_BYTES32,
                                },
                                expectedReturnStatus: true,
                                expectedReturnValue: helpers_1.NON_NULL_BYTES32,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSLOAD',
                                functionParams: {
                                    key: helpers_1.NON_NULL_BYTES32,
                                },
                                expectedReturnStatus: true,
                                expectedReturnValue: helpers_1.NON_NULL_BYTES32,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmCALL(ADDRESS_2) => ovmADDRESS + ovmCALLER',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                    target: '$DUMMY_OVM_ADDRESS_2',
                                    subSteps: [
                                        {
                                            functionName: 'ovmADDRESS',
                                            expectedReturnValue: '$DUMMY_OVM_ADDRESS_2',
                                        },
                                        {
                                            functionName: 'ovmCALLER',
                                            expectedReturnValue: '$DUMMY_OVM_ADDRESS_1',
                                        },
                                    ],
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmCALL(ADDRESS_3)',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                    target: '$DUMMY_OVM_ADDRESS_3',
                                    calldata: '0x',
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                    expectedReturnValue: '0x',
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => INTENTIONAL_REVERT',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'evmREVERT',
                                returnData: {
                                    flag: helpers_1.REVERT_FLAGS.INTENTIONAL_REVERT,
                                    data: DUMMY_REVERT_DATA,
                                },
                            },
                        ],
                    },
                    expectedReturnStatus: false,
                    expectedReturnValue: DUMMY_REVERT_DATA,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => EXCEEDS_NUISANCE_GAS',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'evmREVERT',
                                returnData: {
                                    flag: helpers_1.REVERT_FLAGS.EXCEEDS_NUISANCE_GAS,
                                },
                            },
                        ],
                    },
                    expectedReturnStatus: false,
                    expectedReturnValue: '0x',
                },
            ],
        },
        {
            name: 'ovmCALL(0xdeaddeaddead...) returns (true, 0x)',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: DEAD_ADDRESS,
                        subSteps: [],
                    },
                    expectedReturnStatus: true,
                    expectedReturnValue: {
                        ovmSuccess: true,
                        returnData: '0x',
                    },
                },
            ],
        },
    ],
};
const runner = new helpers_1.ExecutionManagerTestRunner();
runner.run(test_ovmCALL);
//# sourceMappingURL=ovmCALL.spec.js.map