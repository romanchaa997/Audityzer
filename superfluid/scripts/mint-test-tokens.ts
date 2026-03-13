import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    `https://opt-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_KEY}`
  );
  const signer = new ethers.Wallet(process.env.DEPLOYER_PK!, provider);
  const sf = await Framework.create({ chainId: 11155420, provider });

  const usdcx = await sf.loadSuperToken("USDCx");
  const underlyingToken = usdcx.underlyingToken;

  if (!underlyingToken) {
    console.error("No underlying token found for USDCx on this network");
    return;
  }

  // Approve and upgrade (wrap) underlying tokens to SuperTokens
  const amount = ethers.parseUnits("1000", 18);

  const approveTx = await underlyingToken.approve({
    receiver: usdcx.address,
    amount: amount.toString(),
  }).exec(signer);
  await approveTx.wait();
  console.log("Approved underlying token spend:", approveTx.hash);

  const upgradeTx = await usdcx.upgrade({
    amount: amount.toString(),
  }).exec(signer);
  await upgradeTx.wait();
  console.log("Upgraded to SuperToken:", upgradeTx.hash);

  const balance = await usdcx.balanceOf({
    account: await signer.getAddress(),
    providerOrSigner: provider,
  });
  console.log("USDCx balance:", ethers.formatEther(balance));
}
main().catch(console.error);
