'use client';

import { useState } from 'react';
import { createPublicClient, Hex, http } from 'viem';
import { sepolia } from 'viem/chains';
import { pimlicoClient } from '@/services/pimlicoClient';
import { bundlerClient } from '@/services/bundlerClient';
import { useSessionAccount } from '@/providers/SessionAccountProvider';
import { usePermissions } from '@/providers/PermissionProvider';
import { Loader2, CheckCircle, ExternalLink, Bot, TrendingUp, AlertCircle } from 'lucide-react';
import { config } from '@/config';

export default function RedeemPermissionButton() {
  const { sessionAccount } = useSessionAccount();
  const { permission } = usePermissions();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<Hex | null>(null);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [actionType, setActionType] = useState<string | null>(null);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  /**
   * Generate AI financial insights based on the permission type
   */
  const generateAiInsights = (permissionType: string) => {
    let insights = '';

    if (permissionType === 'subscription') {
      insights =
        "Based on your transaction history, I've identified 3 active subscriptions totaling $45.99/month. Your Netflix subscription will renew in 2 days, and I've detected a possible duplicate subscription to Spotify. Would you like me to optimize these subscriptions?";
    } else if (permissionType === 'portfolio') {
      insights =
        'Market analysis indicates your portfolio is overexposed to tech stocks by 12%. I recommend rebalancing by reducing tech allocation by 5% and increasing exposure to consumer staples by 3% and healthcare by 2%. This adjustment could potentially reduce volatility while maintaining similar returns.';
    } else {
      insights =
        "I've noticed your spending on dining out has increased by 28% this month compared to your 6-month average. At current rates, you'll exceed your monthly budget by $120. Would you like me to suggest expense categories where you could reduce spending?";
    }

    return insights;
  };

  /**
   * Determine the permission type from justification string
   */
  const getPermissionType = () => {
    try {
      // Since the structure might be complex, use a type assertion to safely access it
      const contextObj = permission?.context as any;
      const justification = contextObj?.data?.justification || '';

      if (justification.includes('subscription')) return 'subscription';
      if (justification.includes('portfolio')) return 'portfolio';
      return 'spending';
    } catch (e) {
      // Default to subscription if there's any error accessing the data
      return 'subscription';
    }
  };

  /**
   * Handles the redemption of delegation permissions.
   * Retrieves stored permission data, sends a user operation with delegation,
   * and updates the transaction hash state.
   * @returns {Promise<void>}
   */
  const handleRedeemPermission = async () => {
    if (!permission) return;
    if (!sessionAccount) return;

    const permissionType = getPermissionType();
    setActionType(permissionType);
    setLoading(true);

    try {
      const { accountMeta, context, signerMeta } = permission;

      if (!signerMeta) {
        console.error('No signer meta found');
        setLoading(false);
        return;
      }
      const { delegationManager } = signerMeta;

      // Validate required parameters
      if (!context || !delegationManager) {
        console.error('Missing required parameters for delegation');
        setLoading(false);
        return;
      }

      // Get AI insights before executing transaction
      const insights = generateAiInsights(permissionType);
      setAiInsights(insights);

      const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

      /**
       * Sends a user operation with delegation to the bundler client. Only the session account can redeem the delegation.
       * This operation includes:
       * - A transfer of ETH based on permission type
       * - The required permissions context and delegation manager
       * - Account metadata and gas fee information
       */
      const hash = await bundlerClient.sendUserOperationWithDelegation({
        publicClient,
        account: sessionAccount,
        calls: [
          {
            to: sessionAccount.address,
            data: '0x',
            value: permissionType === 'portfolio' ? 10000000000000000n : 1000000000000000n, // 0.01 ETH for portfolio, 0.001 ETH for others
            permissionsContext: context,
            delegationManager,
          },
        ],
        ...fee,
        accountMetadata: accountMeta,
      });

      const { receipt } = await bundlerClient.waitForUserOperationReceipt({
        hash,
      });

      setTxHash(receipt.transactionHash);

      console.log(receipt);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (txHash) {
    return (
      <div className="space-y-4">
        <div className="bg-green-800 border-2 border-green-600 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-2">AI Action Completed!</h3>
          <p className="text-gray-300 mb-4">
            Your AI-powered financial action has been processed and confirmed on the blockchain.
          </p>

          {aiInsights && (
            <div className="bg-gray-800 p-4 rounded-lg mb-4 flex gap-3">
              <Bot className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">AI Analysis</h4>
                <p className="text-gray-300">{aiInsights}</p>
              </div>
            </div>
          )}

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            onClick={() => window.open(`${config.ethScanerUrl}/tx/${txHash}`, '_blank')}
          >
            <span>View Transaction Details</span>
            <ExternalLink className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <button
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleRedeemPermission}
            disabled={loading}
          >
            <span>{loading ? 'Processing...' : 'Execute Another AI Action'}</span>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Bot className="h-5 w-5" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {aiInsights && !loading && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4 flex gap-3">
          <Bot className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-400 mb-1">AI Analysis</h4>
            <p className="text-gray-300">{aiInsights}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-lg mb-4 flex items-center gap-3">
          <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
          <div>
            <h4 className="font-semibold text-blue-400">AI Processing</h4>
            <p className="text-gray-300">
              {actionType === 'subscription'
                ? 'Analyzing subscription patterns and optimizing payment schedule...'
                : actionType === 'portfolio'
                  ? 'Running market analysis and calculating optimal portfolio allocation...'
                  : 'Analyzing spending patterns and creating budget recommendations...'}
            </p>
          </div>
        </div>
      )}

      <button
        className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleRedeemPermission}
        disabled={loading}
      >
        <span>{loading ? 'Processing...' : 'Execute AI Financial Action'}</span>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Bot className="h-5 w-5" />}
      </button>
    </div>
  );
}
