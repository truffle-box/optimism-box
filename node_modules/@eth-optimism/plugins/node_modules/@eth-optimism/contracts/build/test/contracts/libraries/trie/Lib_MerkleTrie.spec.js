"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const rlp = __importStar(require("rlp"));
const hardhat_1 = require("hardhat");
const core_utils_1 = require("@eth-optimism/core-utils");
const helpers_1 = require("../../../helpers");
const NODE_COUNTS = [1, 2, 128];
describe('Lib_MerkleTrie', () => {
    let Lib_MerkleTrie;
    before(async () => {
        Lib_MerkleTrie = await (await hardhat_1.ethers.getContractFactory('TestLib_MerkleTrie')).deploy();
    });
    describe('verifyInclusionProof', () => {
        for (const nodeCount of NODE_COUNTS) {
            describe(`inside a trie with ${nodeCount} nodes`, () => {
                let generator;
                before(async () => {
                    generator = await helpers_1.TrieTestGenerator.fromRandom({
                        seed: `seed.incluson.${nodeCount}`,
                        nodeCount,
                        secure: false,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly prove inclusion for node #${i}`, async () => {
                        const test = await generator.makeInclusionProofTest(i);
                        setup_1.expect(await Lib_MerkleTrie.verifyInclusionProof(test.key, test.val, test.proof, test.root)).to.equal(true);
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
                        secure: false,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly update node #${i}`, async () => {
                        const test = await generator.makeNodeUpdateTest(i, '0x1234123412341234');
                        setup_1.expect(await Lib_MerkleTrie.update(test.key, test.val, test.proof, test.root)).to.equal(test.newRoot);
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
                        secure: false,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly get the value of node #${i}`, async () => {
                        const test = await generator.makeInclusionProofTest(i);
                        setup_1.expect(await Lib_MerkleTrie.get(test.key, test.proof, test.root)).to.deep.equal([true, test.val]);
                    });
                    if (i > 3) {
                        it(`should revert when the proof node does not pass the root check`, async () => {
                            const test = await generator.makeInclusionProofTest(i - 1);
                            const test2 = await generator.makeInclusionProofTest(i - 2);
                            await setup_1.expect(Lib_MerkleTrie.get(test2.key, test.proof, test.root)).to.be.revertedWith('Invalid large internal hash');
                        });
                        it(`should revert when the first proof element is not the root node`, async () => {
                            const test = await generator.makeInclusionProofTest(0);
                            const decodedProof = rlp.decode(test.proof);
                            decodedProof[0].write('abcd', 8);
                            const badProof = rlp.encode(decodedProof);
                            await setup_1.expect(Lib_MerkleTrie.get(test.key, badProof, test.root)).to.be.revertedWith('Invalid root hash');
                        });
                        it(`should be false when calling get on an incorrect key`, async () => {
                            const test = await generator.makeInclusionProofTest(i - 1);
                            let newKey = test.key.slice(0, test.key.length - 8);
                            newKey = newKey.concat('88888888');
                            setup_1.expect(await Lib_MerkleTrie.get(newKey, test.proof, test.root)).to.deep.equal([false, '0x']);
                        });
                    }
                }
            });
        }
    });
    describe(`inside a trie with one node`, () => {
        let generator;
        const nodeCount = 1;
        before(async () => {
            generator = await helpers_1.TrieTestGenerator.fromRandom({
                seed: `seed.get.${nodeCount}`,
                nodeCount,
                secure: false,
            });
        });
        it(`should revert on an incorrect proof node prefix`, async () => {
            const test = await generator.makeInclusionProofTest(0);
            const decodedProof = rlp.decode(test.proof);
            decodedProof[0].write('a', 3);
            test.root = hardhat_1.ethers.utils.keccak256(core_utils_1.toHexString(decodedProof[0]));
            const badProof = rlp.encode(decodedProof);
            await setup_1.expect(Lib_MerkleTrie.get(test.key, badProof, test.root)).to.be.revertedWith('Received a node with an unknown prefix');
        });
    });
});
//# sourceMappingURL=Lib_MerkleTrie.spec.js.map