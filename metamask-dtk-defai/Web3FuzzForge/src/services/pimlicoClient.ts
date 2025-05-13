import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { config } from '@/config';
import { http } from 'viem';

const pimlicoKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

if (!pimlicoKey) {
  throw new Error('Pimlico API key is not set');
}

/**
 * Pimlico client instance configured for Linea Sepolia network
 * Used for estimating gas prices (maxFeePerGas, maxPriorityFeePerGas) for sending a UserOperation
 */
export const pimlicoClient = createPimlicoClient({
  transport: http(`https://api.pimlico.io/v2/${config.chain.id}/rpc?apikey=${pimlicoKey}`),
});
