import { createPublicClient, http } from 'viem';
import { config } from '@/config';

export const publicClient = createPublicClient({
  chain: config.chain,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});
