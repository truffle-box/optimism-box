"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NULL_BYTES32 = exports.NULL_ADDRESS = void 0;
var makeNullBytes = function (length) {
    return '0x' + '00'.repeat(length);
};
exports.NULL_ADDRESS = makeNullBytes(20);
exports.NULL_BYTES32 = makeNullBytes(32);
//# sourceMappingURL=constants.js.map