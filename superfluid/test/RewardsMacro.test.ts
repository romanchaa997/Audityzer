import { expect } from "chai";
import { ethers } from "hardhat";

describe("RewardsMacro", function () {
  it("should deploy successfully", async function () {
    const RewardsMacro = await ethers.getContractFactory("RewardsMacro");
    const macro = await RewardsMacro.deploy();
    await macro.waitForDeployment();
    const address = await macro.getAddress();
    expect(address).to.be.properAddress;
  });

  it("should implement IUserDefinedMacro interface", async function () {
    const RewardsMacro = await ethers.getContractFactory("RewardsMacro");
    const macro = await RewardsMacro.deploy();
    await macro.waitForDeployment();

    // Verify the contract has the expected functions
    expect(macro.buildBatchOperations).to.be.a("function");
    expect(macro.postCheck).to.be.a("function");
  });
});
