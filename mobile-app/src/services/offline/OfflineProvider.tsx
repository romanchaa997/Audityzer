
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { offlineService } from './offlineService';
import NetInfo from '@react-native-community/netinfo';
import { setOnlineStatus, setSyncStatus } from '@/store/slices/offlineSlice';

interface OfflineContextType {
  isOnline: boolean;
  isSyncing: boolean;
  pendingActionsCount: number;
  performSync: () => Promise<void>;
  getCacheSize: () => Promise<number>;
  clearCache: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

interface OfflineProviderProps {
  children: ReactNode;
}

export const OfflineProvider: React.FC<OfflineProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isOnline, syncStatus, pendingActions } = useAppSelector((state) => state.offline);

  const performSync = async () => {
    try {
      await offlineService.performSync();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const getCacheSize = async () => {
    try {
      return await offlineService.getCacheSize();
    } catch (error) {
      console.error('Failed to get cache size:', error);
      return 0;
    }
  };

  const clearCache = async () => {
    try {
      await offlineService.clearCache();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  useEffect(() => {
    // Initialize offline service
    offlineService.initialize();

    // Setup network monitoring
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected && state.isInternetReachable;
      dispatch(setOnlineStatus(isConnected));

      if (isConnected && !syncStatus.isSyncing) {
        // Auto-sync when coming back online
        performSync();
      }
    });

    return () => {
      unsubscribe();
      offlineService.destroy();
    };
  }, [dispatch, syncStatus.isSyncing]);

  const contextValue: OfflineContextType = {
    isOnline,
    isSyncing: syncStatus.isSyncing,
    pendingActionsCount: pendingActions.length,
    performSync,
    getCacheSize,
    clearCache,
  };

  return (
    <OfflineContext.Provider value={contextValue}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

export default OfflineProvider;
