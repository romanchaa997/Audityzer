'use client';

import { useState } from 'react';
import { createClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { erc7715ProviderActions } from '@metamask/delegation-toolkit/experimental';
import { useSessionAccount } from '@/providers/SessionAccountProvider';
import { usePermissions } from '@/providers/PermissionProvider';
import { Loader2, CheckCircle, Settings, Calendar, CircleDollarSign } from 'lucide-react';

export default function GrantPermissionsButton() {
  const { sessionAccount } = useSessionAccount();
  const { savePermission } = usePermissions();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [featureType, setFeatureType] = useState<string>('subscription');

  /**
   * Handles the permission granting process for native token streaming.
   *
   * This function:
   * 1. Creates a Viem client with ERC-7715 provider actions
   * 2. Sets up permission parameters including:
   *    - Chain ID (Sepolia testnet)
   *    - Expiry time (24 hours from current time)
   *    - Signer details (delegate smart account)
   *    - Native token stream permission configuration
   * 3. Grants the permissions through the MetaMask snap
   * 4. Stores the granted permissions using the PermissionProvider
   *
   * @throws {Error} If delegate smart account is not found
   * @async
   */
  const handleGrantPermissions = async () => {
    if (!sessionAccount) {
      throw new Error('Session account not found');
    }

    setIsLoading(true);

    try {
      const client = createClient({
        transport: custom(window.ethereum),
      }).extend(erc7715ProviderActions());

      const currentTime = Math.floor(Date.now() / 1000);
      const oneDayInSeconds = 24 * 60 * 60;
      const expiry = currentTime + oneDayInSeconds;

      // Different permission data based on the selected feature
      let permissionData;
      let justification;

      if (featureType === 'subscription') {
        // Subscription management: monthly payment
        permissionData = {
          initialAmount: 1000000000000000n, // 0.001 ETH
          amountPerSecond: 10n, // small amount per second
          startTime: currentTime,
          maxAmount: 2000000000000000n, // 0.002 ETH
        };
        justification = 'AI-managed subscription service payment';
      } else if (featureType === 'portfolio') {
        // Portfolio rebalancing: larger amount with slower rate
        permissionData = {
          initialAmount: 10000000000000000n, // 0.01 ETH
          amountPerSecond: 1n, // very small amount per second
          startTime: currentTime,
          maxAmount: 50000000000000000n, // 0.05 ETH
        };
        justification = 'AI-powered portfolio rebalancing';
      } else {
        // Spending limits: small initial amount with higher rate
        permissionData = {
          initialAmount: 5000000000000000n, // 0.005 ETH
          amountPerSecond: 5n, // small amount per second
          startTime: currentTime,
          maxAmount: 10000000000000000n, // 0.01 ETH
        };
        justification = 'AI-monitored spending limits';
      }

      const permissions = await client.grantPermissions([
        {
          chainId: sepolia.id,
          expiry,
          signer: {
            type: 'account',
            data: {
              address: sessionAccount.address,
            },
          },
          permission: {
            type: 'native-token-stream',
            data: {
              ...permissionData,
              justification,
            },
          },
        },
      ]);
      savePermission(permissions[0]);
    } catch (error) {
      console.error('Error granting permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <button
          className={`p-4 rounded-lg flex flex-col items-center justify-center ${
            featureType === 'subscription'
              ? 'bg-blue-700 border-2 border-blue-500'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          onClick={() => setFeatureType('subscription')}
        >
          <Calendar className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Subscription Management</span>
        </button>

        <button
          className={`p-4 rounded-lg flex flex-col items-center justify-center ${
            featureType === 'portfolio'
              ? 'bg-blue-700 border-2 border-blue-500'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          onClick={() => setFeatureType('portfolio')}
        >
          <Settings className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Portfolio Rebalancing</span>
        </button>

        <button
          className={`p-4 rounded-lg flex flex-col items-center justify-center ${
            featureType === 'spending'
              ? 'bg-blue-700 border-2 border-blue-500'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          onClick={() => setFeatureType('spending')}
        >
          <CircleDollarSign className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Spending Limits</span>
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="font-semibold mb-2">Feature Description:</h3>
        {featureType === 'subscription' && (
          <p className="text-gray-300">
            Grant permission to manage and pay for your subscriptions automatically. DeFAI will
            handle recurring payments and notify you of upcoming charges.
          </p>
        )}

        {featureType === 'portfolio' && (
          <p className="text-gray-300">
            Allow DeFAI to rebalance your portfolio based on market conditions and your investment
            strategy. The AI will optimize your investments within set parameters.
          </p>
        )}

        {featureType === 'spending' && (
          <p className="text-gray-300">
            Set up AI-monitored spending limits that help you manage your funds. DeFAI will track
            your spending patterns and help prevent overspending.
          </p>
        )}
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleGrantPermissions}
        disabled={isLoading}
      >
        <span>
          {isLoading
            ? 'Granting Permissions...'
            : `Enable AI ${
                featureType === 'subscription'
                  ? 'Subscription Management'
                  : featureType === 'portfolio'
                    ? 'Portfolio Rebalancing'
                    : 'Spending Limits'
              }`}
        </span>
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <CheckCircle className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
