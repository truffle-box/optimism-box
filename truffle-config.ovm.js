// create a file at the root of your project and name it .env -- there you can set process variables
// like the mnemomic below. Note: .env is ignored by git in this project to keep your private information safe
require('dotenv').config();
const mnemonic = process.env["KOVAN_MNEMONIC"];

const { ganache } = require('@eth-optimism/plugins/ganache');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require("web3");

const GAS_LIMIT = 10000000
const GAS_PRICE = 0

module.exports = {

  /**
  * contracts_build_directory tells Truffle where to store compiled contracts
  */
  contracts_build_directory: './build/ovm-contracts',

  networks: {
    development: {
      url: "http://127.0.0.1:7545",
      network_id: "*",
    },
    ganache: {
      network_id: 108,
      networkCheckTimeout: 100000,
      provider: function() {
        return ganache.provider({
          mnemonic: mnemonic,
          network_id: 108,
          default_balance_ether: 100,
        })
      },
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    },
    optimism_l2: {
      network_id: "*",
      provider: function() {
        const wallet = new Web3.providers.HttpProvider("http://127.0.0.1:8545/");
        return wallet;
      },
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
    },
    optimism_l1: {
      network_id: "*",
      provider: function() {
        const wallet = new Web3.providers.HttpProvider("http://127.0.0.1:9545/");
        return wallet;
      },
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
    },
    kovan_l2: {
      network_id: 69,
      chain_id: 69,
      provider: function() {
        const wallet = new HDWalletProvider(mnemonic, "https://kovan.optimism.io", 0, 1);
        return wallet;
      },
      gasPrice: GAS_PRICE
    },
    kovan_l1: {
      network_id: 42,
      chain_id: 42,
      provider: function() {
        const wallet = new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/a9b1958523114b4f8c9f1bfd412f4607", 0, 1);
        return wallet;
      },
      gasPrice: GAS_PRICE
    }

  },

  mocha: {
    timeout: 100000
  },

  compilers: {
    solc: {
      version: "./node_modules/@eth-optimism/solc",
      settings:  {
        optimizer: {
          enabled: true,
          runs: 800
        }
      }
    },
  },
  db: {
    enabled: true
  }
}
