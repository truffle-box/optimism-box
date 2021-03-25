"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUMMY_BYTES32 = void 0;
const ethers_1 = require("ethers");
exports.DUMMY_BYTES32 = Array.from({
    length: 10,
}, (_, i) => {
    return ethers_1.ethers.utils.keccak256(`0x0${i}`);
});
//# sourceMappingURL=bytes32.js.map