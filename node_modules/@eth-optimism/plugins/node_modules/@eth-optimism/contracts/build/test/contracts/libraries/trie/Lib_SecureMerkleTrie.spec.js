"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const helpers_1 = require("../../../helpers");
const NODE_COUNTS = [1, 2, 128];
describe('Lib_SecureMerkleTrie', () => {
    let Lib_SecureMerkleTrie;
    before(async () => {
        Lib_SecureMerkleTrie = await (await hardhat_1.ethers.getContractFactory('TestLib_SecureMerkleTrie')).deploy();
    });
    describe('verifyInclusionProof', () => {
        for (const nodeCount of NODE_COUNTS) {
            describe(`inside a trie with ${nodeCount} nodes`, () => {
                let generator;
                before(async () => {
                    generator = await helpers_1.TrieTestGenerator.fromRandom({
                        seed: `seed.incluson.${nodeCount}`,
                        nodeCount,
                        secure: true,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly prove inclusion for node #${i}`, async () => {
                        const test = await generator.makeInclusionProofTest(i);
                        setup_1.expect(await Lib_SecureMerkleTrie.verifyInclusionProof(test.key, test.val, test.proof, test.root)).to.equal(true);
                    });
                }
            });
        }
    });
    describe('update', () => {
        for (const nodeCount of NODE_COUNTS) {
            describe(`inside a trie with ${nodeCount} nodes`, () => {
                let generator;
                before(async () => {
                    generator = await helpers_1.TrieTestGenerator.fromRandom({
                        seed: `seed.update.${nodeCount}`,
                        nodeCount,
                        secure: true,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly update node #${i}`, async () => {
                        const test = await generator.makeNodeUpdateTest(i, '0x1234123412341234');
                        setup_1.expect(await Lib_SecureMerkleTrie.update(test.key, test.val, test.proof, test.root)).to.equal(test.newRoot);
                    });
                }
            });
        }
    });
    describe('get', () => {
        for (const nodeCount of NODE_COUNTS) {
            describe(`inside a trie with ${nodeCount} nodes`, () => {
                let generator;
                before(async () => {
                    generator = await helpers_1.TrieTestGenerator.fromRandom({
                        seed: `seed.get.${nodeCount}`,
                        nodeCount,
                        secure: true,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly get the value of node #${i}`, async () => {
                        const test = await generator.makeInclusionProofTest(i);
                        setup_1.expect(await Lib_SecureMerkleTrie.get(test.key, test.proof, test.root)).to.deep.equal([true, test.val]);
                    });
                }
            });
        }
    });
});
//# sourceMappingURL=Lib_SecureMerkleTrie.spec.js.map