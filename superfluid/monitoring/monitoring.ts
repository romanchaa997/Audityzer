import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const CONFIG = {
  chainId: 10,
  wsUrl: `wss://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_WS_KEY}`,
  audityzerAddr: process.env.AUDITYZER_ADDR!.toLowerCase(),
  pollIntervalMs: 120_000,
};

let provider: ethers.WebSocketProvider;
let sf: Framework;

async function initializeMonitoring() {
  try {
    provider = new ethers.WebSocketProvider(CONFIG.wsUrl);
    sf = await Framework.create({ chainId: CONFIG.chainId, provider });
    const usdcx = await sf.loadSuperToken("USDCx");

    setInterval(async () => {
      const [rtb, netFlow] = await Promise.all([
        usdcx.realtimeBalanceOf({ account: CONFIG.audityzerAddr, providerOrSigner: provider }),
        sf.cfaV1.getNetFlow({ superToken: usdcx.address, account: CONFIG.audityzerAddr, providerOrSigner: provider }),
      ]);
      console.log({
        availableBalance: ethers.formatEther(rtb.availableBalance),
        deposit: ethers.formatEther(rtb.deposit),
        netFlowRateWeiPerSec: netFlow,
      });
    }, CONFIG.pollIntervalMs);

    const cfaContract = new ethers.Contract(
      sf.settings.config.cfaV1Address,
      ["event FlowUpdated(address indexed token, address indexed sender, address indexed receiver, int96 flowRate, int256 totalSenderFlowRate, int256 totalReceiverFlowRate, bytes userData)"],
      provider
    );

    cfaContract.on("FlowUpdated", (token: string, sender: string, receiver: string, flowRate: bigint) => {
      if (receiver.toLowerCase() === CONFIG.audityzerAddr) {
        console.log(`Stream update: ${sender} → rate ${flowRate}`);
      }
    });

    provider.websocket.on("close", () => {
      console.warn("WS disconnected — reconnecting in 5s...");
      setTimeout(initializeMonitoring, 5000);
    });
  } catch (err) {
    console.error("Monitor init failed:", err);
    setTimeout(initializeMonitoring, 10_000);
  }
}

initializeMonitoring();
