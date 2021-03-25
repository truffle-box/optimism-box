const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
  it("...should store the value 89.", async () => {
    //.deployed() does not work here, likely due to deployer not having access to this testnet
    // const simpleStorageInstance = await SimpleStorage.deployed();
    const simpleStorageInstance = await SimpleStorage.new(1000);

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
