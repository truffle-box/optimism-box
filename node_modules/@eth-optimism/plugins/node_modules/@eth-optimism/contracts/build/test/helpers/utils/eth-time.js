"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextBlockNumber = exports.getBlockTime = exports.mineBlock = exports.increaseEthTime = exports.setEthTime = exports.getEthTime = void 0;
const getEthTime = async (provider) => {
    return (await provider.getBlock('latest')).timestamp;
};
exports.getEthTime = getEthTime;
const setEthTime = async (provider, time) => {
    await provider.send('evm_setNextBlockTimestamp', [time]);
};
exports.setEthTime = setEthTime;
const increaseEthTime = async (provider, amount) => {
    await exports.setEthTime(provider, (await exports.getEthTime(provider)) + amount);
    await exports.mineBlock(provider);
};
exports.increaseEthTime = increaseEthTime;
const mineBlock = async (provider, timestamp) => {
    await provider.send('evm_mine', timestamp ? [timestamp] : []);
};
exports.mineBlock = mineBlock;
const getBlockTime = async (provider, block) => {
    await exports.mineBlock(provider);
    if (!!block) {
        block = await exports.getNextBlockNumber(provider);
    }
    return (await provider.getBlock(block)).timestamp;
};
exports.getBlockTime = getBlockTime;
const getNextBlockNumber = async (provider) => {
    return (await provider.getBlock('latest')).number + 1;
};
exports.getNextBlockNumber = getNextBlockNumber;
//# sourceMappingURL=eth-time.js.map