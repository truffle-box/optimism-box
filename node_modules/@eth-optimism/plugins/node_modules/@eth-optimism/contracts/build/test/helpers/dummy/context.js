"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUMMY_CONTEXT = void 0;
const constants_1 = require("../constants");
exports.DUMMY_CONTEXT = {
    GLOBAL: {
        ovmCHAINID: 11,
    },
    TRANSACTION: {
        ovmORIGIN: constants_1.NON_ZERO_ADDRESS,
        ovmTIMESTAMP: 22,
        ovmGASLIMIT: 33,
        ovmTXGASLIMIT: 44,
        ovmQUEUEORIGIN: 55,
    },
    MESSAGE: {
        ovmCALLER: constants_1.NON_ZERO_ADDRESS,
        ovmADDRESS: constants_1.NON_ZERO_ADDRESS,
        ovmSTATICCTX: true,
    },
};
//# sourceMappingURL=context.js.map