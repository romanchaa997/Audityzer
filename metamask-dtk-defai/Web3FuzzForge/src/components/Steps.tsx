'use client';

import { Badge } from 'lucide-react';
import { useState } from 'react';
import CreateSessionAccount from './CreateSessionAccount';
import GrantPermissionsButton from './GrantPermissionsButton';
import RedeemPermissionButton from './RedeemPermissionButton';
import { useSessionAccount } from '@/providers/SessionAccountProvider';
import { usePermissions } from '@/providers/PermissionProvider';

export default function Steps() {
  const { sessionAccount } = useSessionAccount();
  const { permission } = usePermissions();

  const getActiveStep = () => {
    if (!sessionAccount) {
      return 1;
    }
    if (!permission) {
      return 2;
    }
    return 3;
  };

  const activeStep = getActiveStep();

  return (
    <div className="space-y-10 mb-10">
      <div className="space-y-8">
        <div className={`rounded-lg p-6 ${activeStep === 1 ? 'bg-blue-950/30' : 'bg-gray-800'}`}>
          <div className="flex gap-4 mb-4">
            <div
              className={`flex justify-center items-center h-10 w-10 rounded-full text-xl font-bold ${
                activeStep === 1
                  ? 'bg-blue-600 text-white'
                  : activeStep > 1
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400'
              }`}
            >
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">Create Your AI Assistant Account</h3>
              <p className="text-gray-400 mt-1">
                Create a smart account that will serve as your AI financial assistant
              </p>
            </div>
          </div>

          {activeStep === 1 && (
            <div className="ml-14">
              <CreateSessionAccount />
            </div>
          )}
        </div>

        <div className={`rounded-lg p-6 ${activeStep === 2 ? 'bg-blue-950/30' : 'bg-gray-800'}`}>
          <div className="flex gap-4 mb-4">
            <div
              className={`flex justify-center items-center h-10 w-10 rounded-full text-xl font-bold ${
                activeStep === 2
                  ? 'bg-blue-600 text-white'
                  : activeStep > 2
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400'
              }`}
            >
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">Configure AI Permissions</h3>
              <p className="text-gray-400 mt-1">
                Select the financial tasks you want your AI assistant to manage
              </p>
            </div>
          </div>

          {activeStep === 2 && (
            <div className="ml-14">
              <GrantPermissionsButton />
            </div>
          )}
        </div>

        <div className={`rounded-lg p-6 ${activeStep === 3 ? 'bg-blue-950/30' : 'bg-gray-800'}`}>
          <div className="flex gap-4 mb-4">
            <div
              className={`flex justify-center items-center h-10 w-10 rounded-full text-xl font-bold ${
                activeStep === 3
                  ? 'bg-blue-600 text-white'
                  : activeStep > 3
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400'
              }`}
            >
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">Execute AI-Powered Financial Actions</h3>
              <p className="text-gray-400 mt-1">
                Let your AI assistant analyze your finances and execute optimizations
              </p>
            </div>
          </div>

          {activeStep === 3 && (
            <div className="ml-14">
              <RedeemPermissionButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
