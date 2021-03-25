"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const data_1 = require("../../../data");
describe('OVM_SafetyChecker', () => {
    let OVM_SafetyChecker;
    before(async () => {
        const Factory__OVM_SafetyChecker = await hardhat_1.ethers.getContractFactory('OVM_SafetyChecker');
        OVM_SafetyChecker = await Factory__OVM_SafetyChecker.deploy();
    });
    describe('isBytecodeSafe()', () => {
        for (const testName of Object.keys(data_1.SAFETY_CHECKER_TEST_JSON)) {
            const test = data_1.SAFETY_CHECKER_TEST_JSON[testName];
            it(`should correctly classify: ${testName}`, async () => {
                setup_1.expect(await OVM_SafetyChecker.isBytecodeSafe(test.in)).to.equal(test.out);
            });
        }
    });
});
//# sourceMappingURL=OVM_SafetyChecker.spec.js.map