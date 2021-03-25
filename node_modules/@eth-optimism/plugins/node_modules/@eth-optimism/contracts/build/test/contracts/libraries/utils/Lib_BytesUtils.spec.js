"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../../data");
const helpers_1 = require("../../../helpers");
const hardhat_1 = require("hardhat");
const setup_1 = require("../../../setup");
describe('Lib_BytesUtils', () => {
    describe('JSON tests', () => {
        helpers_1.runJsonTest('TestLib_BytesUtils', data_1.Lib_BytesUtils_TEST_JSON);
    });
    describe('Use of library with other memory-modifying operations', () => {
        let TestLib_BytesUtils;
        before(async () => {
            TestLib_BytesUtils = await (await hardhat_1.ethers.getContractFactory('TestLib_BytesUtils')).deploy();
        });
        it('should allow creation of a contract beforehand and still work', async () => {
            const slice = await TestLib_BytesUtils.callStatic.sliceWithTaintedMemory('0x123412341234', 0, 0);
            setup_1.expect(slice).to.eq('0x');
        });
    });
});
//# sourceMappingURL=Lib_BytesUtils.spec.js.map