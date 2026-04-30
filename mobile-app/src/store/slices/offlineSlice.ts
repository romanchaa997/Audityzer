
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfflineAction, SyncStatus } from '@/types';

interface OfflineState {
  isOnline: boolean;
  pendingActions: OfflineAction[];
  syncStatus: SyncStatus;
  cacheSize: number;
  lastSyncAttempt: string | null;
}

const initialState: OfflineState = {
  isOnline: true,
  pendingActions: [],
  syncStatus: {
    isOnline: true,
    isSyncing: false,
    syncProgress: 0,
    pendingActions: 0,
  },
  cacheSize: 0,
  lastSyncAttempt: null,
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
      state.syncStatus.isOnline = action.payload;
    },
    addOfflineAction: (state, action: PayloadAction<OfflineAction>) => {
      const existingIndex = state.pendingActions.findIndex(
        (a) => a.id === action.payload.id
      );
      
      if (existingIndex >= 0) {
        state.pendingActions[existingIndex] = action.payload;
      } else {
        state.pendingActions.push(action.payload);
      }
      
      state.syncStatus.pendingActions = state.pendingActions.length;
    },
    removeOfflineAction: (state, action: PayloadAction<string>) => {
      state.pendingActions = state.pendingActions.filter(
        (a) => a.id !== action.payload
      );
      state.syncStatus.pendingActions = state.pendingActions.length;
    },
    clearOfflineActions: (state) => {
      state.pendingActions = [];
      state.syncStatus.pendingActions = 0;
    },
    setSyncStatus: (state, action: PayloadAction<Partial<SyncStatus>>) => {
      state.syncStatus = { ...state.syncStatus, ...action.payload };
    },
    setSyncProgress: (state, action: PayloadAction<number>) => {
      state.syncStatus.syncProgress = action.payload;
    },
    setCacheSize: (state, action: PayloadAction<number>) => {
      state.cacheSize = action.payload;
    },
    setLastSyncAttempt: (state, action: PayloadAction<string>) => {
      state.lastSyncAttempt = action.payload;
    },
    incrementRetryCount: (state, action: PayloadAction<string>) => {
      const action_ = state.pendingActions.find((a) => a.id === action.payload);
      if (action_) {
        action_.retryCount += 1;
      }
    },
  },
});

export const {
  setOnlineStatus,
  addOfflineAction,
  removeOfflineAction,
  clearOfflineActions,
  setSyncStatus,
  setSyncProgress,
  setCacheSize,
  setLastSyncAttempt,
  incrementRetryCount,
} = offlineSlice.actions;

export default offlineSlice.reducer;

// Selectors
export const selectIsOnline = (state: { offline: OfflineState }) => state.offline.isOnline;
export const selectPendingActions = (state: { offline: OfflineState }) => state.offline.pendingActions;
export const selectSyncStatus = (state: { offline: OfflineState }) => state.offline.syncStatus;
export const selectCacheSize = (state: { offline: OfflineState }) => state.offline.cacheSize;
export const selectLastSyncAttempt = (state: { offline: OfflineState }) => state.offline.lastSyncAttempt;
