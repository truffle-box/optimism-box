"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
const config_1 = require("./config");
const contract_defs_1 = require("../contract-defs");
const deploy = async (config) => {
    let AddressManager;
    if (config.addressManager) {
        AddressManager = contract_defs_1.getContractFactory('Lib_AddressManager', config.deploymentSigner).attach(config.addressManager);
    }
    else {
        AddressManager = await contract_defs_1.getContractFactory('Lib_AddressManager', config.deploymentSigner).deploy();
        if (config.waitForReceipts) {
            await AddressManager.deployTransaction.wait();
        }
    }
    const contractDeployConfig = await config_1.makeContractDeployConfig(config, AddressManager);
    const failedDeployments = [];
    const contracts = {};
    for (const [name, contractDeployParameters] of Object.entries(contractDeployConfig)) {
        if (config.dependencies && !config.dependencies.includes(name)) {
            continue;
        }
        try {
            contracts[name] = await contractDeployParameters.factory
                .connect(config.deploymentSigner)
                .deploy(...(contractDeployParameters.params || []), config.deployOverrides);
            if (config.waitForReceipts) {
                await contracts[name].deployTransaction.wait();
            }
            const res = await AddressManager.setAddress(name, contracts[name].address);
            if (config.waitForReceipts) {
                await res.wait();
            }
        }
        catch (err) {
            console.error(`Error deploying ${name}: ${err}`);
            failedDeployments.push(name);
        }
    }
    for (const [name, contractDeployParameters] of Object.entries(contractDeployConfig)) {
        if (config.dependencies && !config.dependencies.includes(name)) {
            continue;
        }
        if (contractDeployParameters.afterDeploy) {
            await contractDeployParameters.afterDeploy(contracts);
        }
    }
    return {
        AddressManager,
        failedDeployments,
        contracts,
    };
};
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map