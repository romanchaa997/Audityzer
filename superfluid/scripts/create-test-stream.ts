import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const AUDITYZER_TEST = process.env.AUDITYZER_ADDR!.toLowerCase();

async function main() {
  const provider = new ethers.JsonRpcProvider(
    `https://opt-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_KEY}`
  );
  const signer = new ethers.Wallet(process.env.DEPLOYER_PK!, provider);
  const sf = await Framework.create({ chainId: 11155420, provider });
  const usdcx = await sf.loadSuperToken("USDCx");

  const createOp = sf.cfaV1.createFlow({
    sender: await signer.getAddress(),
    receiver: AUDITYZER_TEST,
    superToken: usdcx.address,
    flowRate: "1000000",
  });

  const tx = await createOp.exec(signer);
  await tx.wait();
  console.log("Stream created:", tx.hash);
}
main();
