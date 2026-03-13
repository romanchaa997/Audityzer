import { ethers } from "hardhat";

async function main() {
  const MacroForwarder = "0xcfA132E353cB4E398080B9700609bb008eceB125"; // same all networks
  const RewardsMacro = await ethers.getContractFactory("RewardsMacro");
  const macro = await RewardsMacro.deploy(MacroForwarder);
  await macro.waitForDeployment();
  console.log("RewardsMacro deployed:", await macro.getAddress());
}
main().catch(console.error);
