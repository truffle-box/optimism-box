"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mocha = exports.expect = exports.should = void 0;
const chai = require("chai");
const mocha_1 = __importDefault(require("mocha"));
exports.Mocha = mocha_1.default;
const ethereum_waffle_1 = require("ethereum-waffle");
chai.use(ethereum_waffle_1.solidity);
const should = chai.should();
exports.should = should;
const expect = chai.expect;
exports.expect = expect;
//# sourceMappingURL=setup.js.map