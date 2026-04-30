
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsEvent, UserSession, DeviceInfo } from '@/types';
import apiClient from '@/services/api/apiClient';

interface AnalyticsState {
  events: AnalyticsEvent[];
  currentSession: UserSession | null;
  deviceInfo: DeviceInfo | null;
  isLoading: boolean;
  error: string | null;
  settings: {
    enabled: boolean;
    crashReporting: boolean;
    performanceMonitoring: boolean;
    userInteractionTracking: boolean;
  };
}

const initialState: AnalyticsState = {
  events: [],
  currentSession: null,
  deviceInfo: null,
  isLoading: false,
  error: null,
  settings: {
    enabled: true,
    crashReporting: true,
    performanceMonitoring: true,
    userInteractionTracking: true,
  },
};

// Async thunks
export const startSession = createAsyncThunk(
  'analytics/startSession',
  async (deviceInfo: DeviceInfo, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/analytics/session/start', {
        deviceInfo,
        startTime: new Date().toISOString(),
      });
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to start session');
      }
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to start session');
    }
  }
);

export const endSession = createAsyncThunk(
  'analytics/endSession',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/analytics/session/${sessionId}/end`, {
        endTime: new Date().toISOString(),
      });
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to end session');
      }
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to end session');
    }
  }
);

export const trackEvent = createAsyncThunk(
  'analytics/trackEvent',
  async (event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { analytics: AnalyticsState };
      
      if (!state.analytics.settings.enabled) {
        return null; // Analytics disabled
      }

      const eventData: AnalyticsEvent = {
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: state.analytics.currentSession?.id || 'unknown',
      };

      const response = await apiClient.post('/analytics/events', eventData);
      
      if (!response.success) {
        // Don't throw error for analytics failures, just log
        console.warn('Analytics event tracking failed:', response.error?.message);
        return eventData; // Still return event for local storage
      }
      
      return eventData;
    } catch (error: any) {
      console.warn('Analytics event tracking failed:', error.message);
      // Return event for local storage even if server fails
      const eventData: AnalyticsEvent = {
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: 'unknown',
      };
      return eventData;
    }
  }
);

export const trackCrash = createAsyncThunk(
  'analytics/trackCrash',
  async (crashData: {
    error: string;
    stack?: string;
    additionalInfo?: any;
  }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { analytics: AnalyticsState };
      
      if (!state.analytics.settings.crashReporting) {
        return null;
      }

      const response = await apiClient.post('/analytics/crashes', {
        ...crashData,
        timestamp: new Date().toISOString(),
        sessionId: state.analytics.currentSession?.id || 'unknown',
        deviceInfo: state.analytics.deviceInfo,
      });
      
      if (!response.success) {
        console.warn('Crash reporting failed:', response.error?.message);
      }
      
      return crashData;
    } catch (error: any) {
      console.warn('Crash reporting failed:', error.message);
      return crashData;
    }
  }
);

export const trackPerformance = createAsyncThunk(
  'analytics/trackPerformance',
  async (performanceData: {
    metric: string;
    value: number;
    unit: string;
    context?: any;
  }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { analytics: AnalyticsState };
      
      if (!state.analytics.settings.performanceMonitoring) {
        return null;
      }

      const response = await apiClient.post('/analytics/performance', {
        ...performanceData,
        timestamp: new Date().toISOString(),
        sessionId: state.analytics.currentSession?.id || 'unknown',
      });
      
      if (!response.success) {
        console.warn('Performance tracking failed:', response.error?.message);
      }
      
      return performanceData;
    } catch (error: any) {
      console.warn('Performance tracking failed:', error.message);
      return performanceData;
    }
  }
);

export const syncEvents = createAsyncThunk(
  'analytics/syncEvents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { analytics: AnalyticsState };
      const unsyncedEvents = state.analytics.events.filter(event => !event.synced);
      
      if (unsyncedEvents.length === 0) {
        return [];
      }

      const response = await apiClient.post('/analytics/events/batch', {
        events: unsyncedEvents,
      });
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to sync events');
      }
      
      return unsyncedEvents.map(event => event.name);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sync events');
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setDeviceInfo: (state, action: PayloadAction<DeviceInfo>) => {
      state.deviceInfo = action.payload;
    },
    updateSettings: (state, action: PayloadAction<Partial<AnalyticsState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    addEventLocally: (state, action: PayloadAction<AnalyticsEvent>) => {
      state.events.unshift(action.payload);
      
      // Keep only last 100 events in memory
      if (state.events.length > 100) {
        state.events = state.events.slice(0, 100);
      }
    },
    markEventsSynced: (state, action: PayloadAction<string[]>) => {
      const syncedEventNames = action.payload;
      state.events.forEach(event => {
        if (syncedEventNames.includes(event.name)) {
          (event as any).synced = true;
        }
      });
    },
    clearEvents: (state) => {
      state.events = [];
    },
    clearSession: (state) => {
      state.currentSession = null;
    },
  },
  extraReducers: (builder) => {
    // Start session
    builder
      .addCase(startSession.fulfilled, (state, action) => {
        state.currentSession = action.payload;
      })
      .addCase(startSession.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // End session
    builder
      .addCase(endSession.fulfilled, (state) => {
        state.currentSession = null;
      });

    // Track event
    builder
      .addCase(trackEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.events.unshift(action.payload);
          
          // Keep only last 100 events
          if (state.events.length > 100) {
            state.events = state.events.slice(0, 100);
          }
        }
      });

    // Sync events
    builder
      .addCase(syncEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Mark synced events
        const syncedEventNames = action.payload;
        state.events.forEach(event => {
          if (syncedEventNames.includes(event.name)) {
            (event as any).synced = true;
          }
        });
      })
      .addCase(syncEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setDeviceInfo,
  updateSettings,
  addEventLocally,
  markEventsSynced,
  clearEvents,
  clearSession,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;

// Selectors
export const selectAnalyticsEvents = (state: { analytics: AnalyticsState }) => state.analytics.events;
export const selectCurrentSession = (state: { analytics: AnalyticsState }) => state.analytics.currentSession;
export const selectDeviceInfo = (state: { analytics: AnalyticsState }) => state.analytics.deviceInfo;
export const selectAnalyticsSettings = (state: { analytics: AnalyticsState }) => state.analytics.settings;
export const selectAnalyticsLoading = (state: { analytics: AnalyticsState }) => state.analytics.isLoading;
export const selectAnalyticsError = (state: { analytics: AnalyticsState }) => state.analytics.error;
