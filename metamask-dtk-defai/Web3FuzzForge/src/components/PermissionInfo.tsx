'use client';

import { usePermissions } from '@/providers/PermissionProvider';
import { formatEther } from 'viem';
import { Bot, Clock, ShieldCheck } from 'lucide-react';

export default function PermissionInfo() {
  const { permission } = usePermissions();

  if (!permission) return null;

  // Extract permission data safely with typecasting and optional chaining
  const contextData = (permission.context as any)?.data || {};
  const permissionType = contextData.justification || '';
  const initialAmount = contextData.initialAmount
    ? formatEther(BigInt(contextData.initialAmount.toString()))
    : '0';
  const maxAmount = contextData.maxAmount
    ? formatEther(BigInt(contextData.maxAmount.toString()))
    : '0';
  const amountPerSecond = contextData.amountPerSecond || 0;
  const expiry = permission.expiry ? new Date(Number(permission.expiry) * 1000) : null;

  // Determine the AI feature based on justification
  const getFeatureType = () => {
    if (permissionType.includes('subscription')) return 'Subscription Management';
    if (permissionType.includes('portfolio')) return 'Portfolio Rebalancing';
    return 'Spending Limits';
  };

  // Get icon based on feature type
  const getFeatureIcon = () => {
    if (permissionType.includes('subscription')) {
      return <Clock className="h-5 w-5 text-blue-400" />;
    }
    if (permissionType.includes('portfolio')) {
      return <ShieldCheck className="h-5 w-5 text-green-400" />;
    }
    return <Bot className="h-5 w-5 text-purple-400" />;
  };

  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 mb-8">
      <div className="flex items-center mb-4">
        <Bot className="text-blue-400 mr-3 h-6 w-6" />
        <h3 className="font-semibold text-lg">AI Assistant Permissions</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            {getFeatureIcon()}
            <span className="ml-2 font-medium">{getFeatureType()}</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">{permissionType}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Expiration</div>
          <div className="font-medium">{expiry ? expiry.toLocaleString() : 'Unknown'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Initial Amount</div>
          <div className="font-medium">{parseFloat(initialAmount).toFixed(6)} ETH</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Maximum Amount</div>
          <div className="font-medium">{parseFloat(maxAmount).toFixed(6)} ETH</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Rate</div>
          <div className="font-medium">{amountPerSecond.toString()} WEI/second</div>
        </div>
      </div>
    </div>
  );
}
