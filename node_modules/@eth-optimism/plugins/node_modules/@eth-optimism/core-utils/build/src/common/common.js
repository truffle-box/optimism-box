"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const assert = (condition, reason) => {
    try {
        if (condition() === false) {
            throw new Error(`Assertion failed: ${reason}`);
        }
    }
    catch (err) {
        throw new Error(`Assertion failed: ${reason}\n${err}`);
    }
};
exports.assert = assert;
//# sourceMappingURL=common.js.map