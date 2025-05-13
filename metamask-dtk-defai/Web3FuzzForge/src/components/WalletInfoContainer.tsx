'use client';

import { useEffect, useState } from 'react';
import { createClient, custom } from 'viem';
import { useSessionAccount } from '@/providers/SessionAccountProvider';
import WalletInfo from './WalletInfo';

export default function WalletInfoContainer() {
  return (
    <div>
      <WalletInfo />
    </div>
  );
}
