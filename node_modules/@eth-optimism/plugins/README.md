# @eth-optimism/plugins

## What is this?

A collection of useful JavaScript/TypeScript tooling plugins that you might need when building on top of Optimistic Ethereum!

## What kind of plugins are we talking about?

### Plugins for [`hardhat`](https://hardhat.org)

#### `@eth-optimism/plugins/hardhat/compiler`

Automatically compiles your Solidity contracts with the OVM compiler.
Defaults to Solidity version 0.7.6, but also has support for 0.5.16 and 0.6.12.
[Full README available here](./src/hardhat/compiler).

#### `@eth-optimism/plugins/hardhat/ethers`

##### Usage

Just import into your `hardhat.config.js`!

```javascript
// hardhat.config.js

require("@eth-optimism/plugins/hardhat/ethers")
```

Or if using typescript:

```typescript
// hardhat.config.ts

import "@eth-optimism/plugins/hardhat/ethers"
```

##### What does it do?

Creates an `l2ethers` object that can be imported via `hardhat`.
Behaves identically to the `ethers` object that you would get if using `@nomiclabs/hardhat-ethers`, but deploys contracts to Layer 2 instead of Layer 1!
Here's it in action:

```typescript
import { l2ethers } from "hardhat"

describe("My Contract Test", () => {
    it("should deploy a contract", async () => {
        const factory = await l2ethers.getContractFactory("MyContractName")
        const instance = await factory.deploy()

        // Now we're cooking with gas!
    })
})
```
