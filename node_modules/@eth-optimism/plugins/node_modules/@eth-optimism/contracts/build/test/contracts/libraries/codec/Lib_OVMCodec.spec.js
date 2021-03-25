"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../setup");
const data_1 = require("../../../data");
const helpers_1 = require("../../../helpers");
describe.skip('Lib_OVMCodec', () => {
    describe('JSON tests', () => {
        helpers_1.runJsonTest('TestLib_OVMCodec', data_1.Lib_OVMCodec_TEST_JSON);
    });
});
//# sourceMappingURL=Lib_OVMCodec.spec.js.map