// types.d.ts
import { BridgeHistoryItem } from './bridgeMock';

declare global {
  interface Window {
    ethereum: any;
    layerZeroProvider?: {
      version: string;
      bridge: (params: any) => Promise<any>;
      getHistory: () => BridgeHistoryItem[];
    };
    wormholeProvider?: {
      version: string;
      transfer: (params: any) => Promise<any>;
      getTransfers: () => BridgeHistoryItem[];
    };
    bridgeHistory?: BridgeHistoryItem[];
  }
}
