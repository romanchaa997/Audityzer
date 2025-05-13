import { createBundlerClient } from 'viem/account-abstraction';
import { erc7710BundlerActions } from '@metamask/delegation-toolkit/experimental';
import { http } from 'viem';
import { config } from '@/config';
const pimlicoKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

if (!pimlicoKey) {
  throw new Error('Pimlico API key is not set');
}

/**
 * A configured bundler client for ERC-7710 account abstraction operations.
 * Uses Pimlico's bundler service on the specified chain.
 * Extends the base bundler client with ERC-7710 specific actions.
 */
export const bundlerClient = createBundlerClient({
  transport: http(`https://api.pimlico.io/v2/${config.chain.id}/rpc?apikey=${pimlicoKey}`),
  paymaster: true,
}).extend(erc7710BundlerActions());
