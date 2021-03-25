"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const data_1 = require("../../../data");
const encode = async (Lib_RLPWriter, input) => {
    if (Array.isArray(input)) {
        const elements = await Promise.all(input.map(async (el) => {
            return encode(Lib_RLPWriter, el);
        }));
        return Lib_RLPWriter.writeList(elements);
    }
    else if (Number.isInteger(input)) {
        return Lib_RLPWriter.writeUint(input);
    }
    else {
        return Lib_RLPWriter.writeString(input);
    }
};
describe('Lib_RLPWriter', () => {
    let Lib_RLPWriter;
    before(async () => {
        Lib_RLPWriter = await (await hardhat_1.ethers.getContractFactory('TestLib_RLPWriter')).deploy();
    });
    describe('Official Ethereum RLP Tests', () => {
        for (const [key, test] of Object.entries(data_1.Lib_RLPWriter_TEST_JSON)) {
            it(`should properly encode: ${key}`, async () => {
                setup_1.expect(await encode(Lib_RLPWriter, test.in)).to.equal(test.out);
            });
        }
    });
    describe('Use of library with other memory-modifying operations', () => {
        it('should allow creation of a contract beforehand and still work', async () => {
            const randomAddress = '0x1234123412341234123412341234123412341234';
            const rlpEncodedRandomAddress = '0x941234123412341234123412341234123412341234';
            const encoded = await Lib_RLPWriter.callStatic.writeAddressWithTaintedMemory(randomAddress);
            setup_1.expect(encoded).to.eq(rlpEncodedRandomAddress);
        });
    });
});
//# sourceMappingURL=Lib_RLPWriter.spec.js.map