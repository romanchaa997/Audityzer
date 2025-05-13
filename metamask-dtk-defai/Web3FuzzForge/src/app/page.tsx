'use client';
import Steps from '@/components/Steps';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import InstallFlask from '@/components/InstallFlask';
import WalletInfoContainer from '@/components/WalletInfoContainer';
import Loader from '@/components/Loader';
import PermissionInfo from '@/components/PermissionInfo';

export default function Home() {
  const [isFlask, setIsFlask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const detectFlask = async () => {
    if (window && window.ethereum) {
      const provider = window.ethereum;

      if (provider) {
        const clientVersion = await provider.request({
          method: 'web3_clientVersion',
        });

        const isFlaskDetected = (clientVersion as string[])?.includes('flask');

        setIsFlask(isFlaskDetected);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    detectFlask();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <Hero />
        <WalletInfoContainer />
        <PermissionInfo />
        {isLoading ? <Loader /> : isFlask ? <Steps /> : <InstallFlask />}
      </main>
      <Footer />
    </div>
  );
}
