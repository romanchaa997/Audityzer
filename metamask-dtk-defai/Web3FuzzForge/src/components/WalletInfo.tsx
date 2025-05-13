'use client';

import { useEffect, useState } from 'react';
import { createClient, custom, formatEther } from 'viem';
import { useSessionAccount } from '@/providers/SessionAccountProvider';
import { Bot, CreditCard, RefreshCcw } from 'lucide-react';

export default function WalletInfo() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { sessionAccount } = useSessionAccount();

  useEffect(() => {
    const getWalletInfo = async () => {
      if (!window.ethereum) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const client = createClient({
          transport: custom(window.ethereum),
        });

        // Get accounts
        const accounts = (await client.request({
          method: 'eth_requestAccounts',
        })) as string[];

        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);

          // Get balance
          const balance = (await client.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'] as any,
          })) as string;

          setBalance(formatEther(BigInt(balance)));
        }
      } catch (error) {
        console.error('Error getting wallet info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getWalletInfo();
  }, []);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const refreshBalance = async () => {
    if (!walletAddress || !window.ethereum) return;

    try {
      setIsLoading(true);
      const client = createClient({
        transport: custom(window.ethereum),
      });

      // Get balance
      const balance = (await client.request({
        method: 'eth_getBalance',
        params: [walletAddress, 'latest'] as any,
      })) as string;

      setBalance(formatEther(BigInt(balance)));
    } catch (error) {
      console.error('Error refreshing balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading wallet info...</div>;
  }

  if (!walletAddress) {
    return (
      <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 mb-8 flex items-center">
        <CreditCard className="text-yellow-500 mr-3 h-6 w-6 flex-shrink-0" />
        <p className="text-yellow-200">Please connect your wallet to continue</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center">
          <CreditCard className="mr-2 h-5 w-5" /> Your Wallet
        </h3>
        <button
          onClick={refreshBalance}
          className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
          aria-label="Refresh balance"
        >
          <RefreshCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Connected Address</div>
          <div className="font-mono text-white">{formatAddress(walletAddress)}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">ETH Balance</div>
          <div className="text-white font-medium">{parseFloat(balance).toFixed(4)} ETH</div>
        </div>
      </div>

      {sessionAccount && (
        <div className="mt-4 border-t border-gray-800 pt-4">
          <div className="flex items-center text-blue-400 mb-2">
            <Bot className="mr-2 h-5 w-5" />
            <span className="font-semibold">AI Assistant Account</span>
          </div>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Smart Account Address</div>
            <div className="font-mono text-white">{formatAddress(sessionAccount.address)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
