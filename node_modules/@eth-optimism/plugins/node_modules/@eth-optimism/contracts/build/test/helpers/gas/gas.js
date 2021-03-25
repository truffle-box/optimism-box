"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasMeasurement = void 0;
const hardhat_1 = require("hardhat");
class GasMeasurement {
    async init(wallet) {
        this.GasMeasurementContract = await (await (await hardhat_1.ethers.getContractFactory('Helper_GasMeasurer')).deploy()).connect(wallet);
    }
    async getGasCost(targetContract, methodName, methodArgs = []) {
        const gasCost = await this.GasMeasurementContract.callStatic.measureCallGas(targetContract.address, targetContract.interface.encodeFunctionData(methodName, methodArgs));
        return gasCost;
    }
}
exports.GasMeasurement = GasMeasurement;
//# sourceMappingURL=gas.js.map