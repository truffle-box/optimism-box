# Optimism Box

- [Requirements](#requirements)
- [Installation](#installation)
- [Setup](#setup)
- [Overview](#overview)
- [Optimistic Ethereum](#optimistic-ethereum)
  * [Compiling](#compiling)
  * [Migrating](#migrating)
  * [Testing](#testing)
  * [New Configuration File](#new-configuration-file)
  * [New File Structure for Artifacts](#new-file-structure-for-artifacts)
  * [Communication Between Ethereum and Optimism Chains](#communication-between-ethereum-and-optimism-chains)
- [Support](#support)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


This Truffle Optimism box provides you with the boilerplate structure necessary to start coding for Optimism's Ethereum L2 solution. For detailed information on how Optimism works, please see their documentation [here](http://community.optimism.io/docs/developers/integration.html#).

As a starting point, this box contains only the Migrations and SimpleStorage Solidity contracts. Including minimal code was a conscious decision as this box is meant to provide the initial building blocks needed to get to work on Optimism without pushing developers to write any particular sort of application. With this box, you will be able to compile, migrate, and test Optimistic Solidity code against a variety of Optimism test networks.

Optimism's L2 solution is almost fully compatible with the EVM, though it uses an "optimistic" EVM called the OVM. The main difference between the EVM and the OVM that developers will notice is that some opcodes are not available for contracts that are deployed to the OVM. You can see the complete list of differences between Optimism's fork of the `solc` compiler and the original [here](https://github.com/ethereum-optimism/solidity/compare/27d51765c0623c9f6aef7c00214e9fe705c331b1...develop-0.6).

## Requirements

The Optimism box has the following requirements:

- [Node.js](https://nodejs.org/) 10.x or later
- [NPM](https://docs.npmjs.com/cli/) version 5.2 or later
- [docker](https://docs.docker.com/get-docker/), version 19.03.12 or later
- [docker-compose](https://docs.docker.com/compose/install/), version 1.27.3 or later
- Recommended Docker memory allocation of >=8 GB.
- Windows, Linux or MacOS

## Installation

> Note that this installation command will only work once the box is published (in the interim you can use `truffle unbox https://github.com/truffle-box/optimism-box`).

```bash
$ truffle unbox optimism
```

## Setup

You will need at least one mnemonic to use with an optimistic network. A `.env` file has been provided for you, and you should populate it with the appropriate mnemonic. The `truffle-config-ovm.js` file expects a `GANACHE_MNEMONIC` and a `KOVAN_MNEMONIC` value to exist in `.env` for running commands on each of these networks.


## Overview

The code here will allow you to compile, migrate, and test your code against an Optimistic Ethereum instance. The following commands can be run (more details on each can be found in the next section):

 To compile:
 ```
 npm run compile:ovm
 ```

 To migrate:
 ```
 npm run migrate:ovm --network=(ganache | ol2 | kl2)
 ```

 To test:
 ```
 npm run test --network=(ganache | ol2 | kl2)
 ```


## Optimistic Ethereum


### Compiling

To compile your project using the Optimistic `solc` compiler, run the following in your terminal:

```
npm run compile:ovm
```

This script lets Truffle know to use the `truffle-config-ovm.js` configuration file, which references the Optimistic `solc` compiler. When adding new contracts to compile, you may find some discrepancies and errors, so please remember to keep an eye on [differences between solc and optimistic solc](https://github.com/ethereum-optimism/solidity/compare/27d51765c0623c9f6aef7c00214e9fe705c331b1...develop-0.6)!

Please note: the optimistic `solc` compiler we have included relies on the latest version of the package, and currently uses *version 0.7.6*. If you would like to use a different version of `solc`, see the available optimistic versions [here](https://www.npmjs.com/package/@eth-optimism/solc), and run:

```
 npm install @eth-optimism/solc@<YourVersion>
 ```

You can double check that you have the version you want by looking at the `package.json` dependencies in this project.

If you would like to recompile previously compiled contracts, you can manually run this command with `truffle compile --config truffle-config.ovm.js` and add the `--all` flag.

### Migrating

To migrate on an OVM L2, run:

```
npm run migrate:ovm --network=(ganache | ol2 | kl2)
```

(remember to choose a network from these options!).

You have several L2 networks to choose from, prepackaged in this box (note: L1 networks associated with Optimism are included in the config file as well, to aid you with further development. But here we'll just go through the L2 deployment options available):

- `ol2`: This network is the default L1/L2 integration provided by Optimism for testing your OVM code. Documentation about this setup can be found [here](https://github.com/ethereum-optimism/optimism).
  * If you wish to use this network, be sure to run `npm run startLocalOptimism` beforehand so that the optimism test ecosystem docker image can be served. For our purposes, you should be able to compile, migrate, and test against this network once the docker image is fully running. See [documentation and updates](https://github.com/ethereum-optimism/optimism/tree/develop/ops) about this docker container for additional information.
- `ganache`: This network uses an optimistic ganache instance for migrations. The usage is essentially identical to use of regular ganache.
- `kl2`: Optimism has deployed a testnet to the Kovan network. The RPC endpoint is https://kovan.optimism.io. In order to access this node for testing, you will need to connect a wallet (we suggest [MetaMask](https://metamask.io/)). Save your seed phrase in a `.env` file as `KOVAN_MNEMONIC`. Using an `.env` file for the mnemonic is safer practice because it is listed in `.gitignore` and thus will not be committed.

L1 networks are also included in the configuration file, but it is not necessary to deploy your base contracts to L1 right now. Eventually, you will likely have an L2 contract that you want to connect with an L1 contract (they do not have to be identical!). One example is an ERC20 contract that is deployed on L2. At some point the user will wish to withdraw their funds into L1. There will need to be a contract deployed on L1 that can receive the message from L2 to mint the appropriate tokens on L1 for the user. More information on this system can be found [here](http://community.optimism.io/docs/developers/integration.html#bridging-l1-and-l2).

If you would like to migrate previously migrated contracts on the same network, you can run `truffle migrate --config truffle-config.ovm.js --network=(ganache | ol2 | kl2)` and add the `--reset` flag.

### Testing

Currently, this box only supports testing via Javascript/TypeScript tests. In order to run the test currently in the boilerplate, use the following command:
```
npm run test:ovm --network=(ganache | ol2 | kl2)
```
Remember that there are some differences between the EVM and the OVM, and refer to the Optimism documentation if you run into test failures.

### New Configuration File

A new configuration file exists in this project: `truffle-config.ovm.js`. This file contains a reference to the new file location of the `contracts_build_directory` for OVM contracts, points to an optimistic version of the `solc` compiler, and lists several networks that are running OVM Layer for testing purposes.

Please note, the classic `truffle-config.js` configuration file is included here as well, because you may wish to deploy to the EVM while testing to ensure that any errors you see aren't related to your overall Solidity code (as opposed to the Optimism integration). All normal truffle commands (`truffle compile`, `truffle migrate`, etc.) will use this config file and save built files to `build/evm-contracts`.

### New File Structure for Artifacts

When you compile or migrate, the resulting `json` files for the OVM will be at `build/ovm-contracts/`. This is to distinguish them from any EVM contracts you build, which will live in `build/evm-contracts `. As we have included the appropriate `contracts_build_directory` in each configuration file, Truffle will know which set of built files to reference!

### Communication Between Ethereum and Optimism Chains

The information above should allow you to deploy to the Optimism Layer 2 chain. This is only the first step! Once you are ready to deploy your own contracts to function on L1 using L2, you will need to be aware of the [ways in which Layer 1 and Layer 2 interact in the Optimism ecosystem](http://community.optimism.io/docs/developers/integration.html#bridging-l1-and-l2). Keep an eye out for additional Truffle tooling and examples that elucidate this second step to full optimism integration!

## Support

Support for this box is available via the Truffle community available [here](https://www.trufflesuite.com/community).
