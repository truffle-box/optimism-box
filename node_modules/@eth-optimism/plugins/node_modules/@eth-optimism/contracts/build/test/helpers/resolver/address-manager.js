"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddressManager = exports.setProxyTarget = void 0;
const hardhat_1 = require("hardhat");
const setProxyTarget = async (AddressManager, name, target) => {
    const SimpleProxy = await (await hardhat_1.ethers.getContractFactory('Helper_SimpleProxy')).deploy();
    await SimpleProxy.setTarget(target.address);
    await AddressManager.setAddress(name, SimpleProxy.address);
};
exports.setProxyTarget = setProxyTarget;
const makeAddressManager = async () => {
    return (await hardhat_1.ethers.getContractFactory('Lib_AddressManager')).deploy();
};
exports.makeAddressManager = makeAddressManager;
//# sourceMappingURL=address-manager.js.map