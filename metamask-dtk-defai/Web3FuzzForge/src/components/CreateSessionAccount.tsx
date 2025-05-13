'use client';

import { useState } from 'react';
import { useSessionAccount } from '@/providers/SessionAccountProvider';
import { Bot, Loader2 } from 'lucide-react';

export default function CreateSessionAccount() {
  const { createSessionAccount, isLoading } = useSessionAccount();

  return (
    <div className="space-y-4">
      <p className="text-gray-300 mb-2">
        Your AI financial assistant will analyze your finances and execute optimizations with your
        permission.
      </p>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        onClick={() => createSessionAccount()}
        disabled={isLoading}
      >
        <span>{isLoading ? 'Creating your AI assistant...' : 'Create AI Financial Assistant'}</span>
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Bot className="h-5 w-5" />}
      </button>
    </div>
  );
}
