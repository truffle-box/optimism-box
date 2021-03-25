"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findExchangeCurrencyConfig = void 0;

var _erc = _interopRequireDefault(require("../data/exchange/erc20"));

var _coins = _interopRequireDefault(require("../data/exchange/coins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const all = [..._erc.default, ..._coins.default];
const configs = {};

for (const [id, config, signature] of all) {
  configs[id] = {
    config,
    signature
  };
}
/**
 *
 */


const findExchangeCurrencyConfig = id => configs[id];

exports.findExchangeCurrencyConfig = findExchangeCurrencyConfig;
//# sourceMappingURL=exchange.js.map