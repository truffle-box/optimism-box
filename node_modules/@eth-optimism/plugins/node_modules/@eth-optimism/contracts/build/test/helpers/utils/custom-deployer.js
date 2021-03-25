"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployContractCode = void 0;
const core_utils_1 = require("@eth-optimism/core-utils");
const deployContractCode = async (code, signer, gasLimit) => {
    const prefix = '0x600D380380600D6000396000f3';
    const deployCode = prefix + core_utils_1.toHexString(code).slice(2);
    const response = await signer.sendTransaction({
        to: null,
        data: deployCode,
        gasLimit,
    });
    const result = await response.wait();
    return result.contractAddress;
};
exports.deployContractCode = deployContractCode;
//# sourceMappingURL=custom-deployer.js.map