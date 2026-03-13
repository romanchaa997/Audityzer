import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    "op-sepolia": {
      url: "https://sepolia.optimism.io",
      chainId: 11155420,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
    "op-mainnet": {
      url: process.env.OP_MAINNET_RPC || "https://mainnet.optimism.io",
      chainId: 10,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: { optimisticEthereum: process.env.OPTIMISTIC_ETHERSCAN_API_KEY || "" },
  },
};
export default config;
