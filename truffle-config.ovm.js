const mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
const optimismMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const optimismHardhatMnemonic = 'test test test test test test test test test test test junk'

const { ganache } = require('@eth-optimism/plugins/ganache');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const ethers = require("ethers");
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
    test: {
      network_id: 108,
      networkCheckTimeout: 100000,
      provider: function() {
        return ganache.provider({
          mnemonic: mnemonic,
          network_id: 108,
          default_balance_ether: 100,
          // gasLimit: GAS_LIMIT,
          // gasPrice: GAS_PRICE,
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
    kovan_l1: {

    },
    kovan_l2: {

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
