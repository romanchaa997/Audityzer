
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  region: string;
  timezone: string;
  biometric: {
    enabled: boolean;
    promptOnStart: boolean;
    lockTimeout: number; // minutes
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
    badge: boolean;
    vulnerabilityAlerts: boolean;
    scanCompletions: boolean;
    systemUpdates: boolean;
    securityAlerts: boolean;
  };
  security: {
    autoLock: boolean;
    autoLockTimeout: number; // minutes
    requirePasswordForSensitiveActions: boolean;
    allowScreenshots: boolean;
    allowDebugging: boolean;
  };
  data: {
    autoSync: boolean;
    syncOnWiFiOnly: boolean;
    cacheSize: number; // MB
    offlineMode: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large' | 'extraLarge';
    highContrast: boolean;
    reduceMotion: boolean;
    voiceOver: boolean;
  };
  developer: {
    debugMode: boolean;
    showPerformanceMetrics: boolean;
    enableBetaFeatures: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
  };
}

const initialState: SettingsState = {
  language: 'en',
  region: 'US',
  timezone: 'America/New_York',
  biometric: {
    enabled: false,
    promptOnStart: true,
    lockTimeout: 5,
  },
  notifications: {
    enabled: true,
    sound: true,
    vibration: true,
    badge: true,
    vulnerabilityAlerts: true,
    scanCompletions: true,
    systemUpdates: true,
    securityAlerts: true,
  },
  security: {
    autoLock: true,
    autoLockTimeout: 5,
    requirePasswordForSensitiveActions: true,
    allowScreenshots: false,
    allowDebugging: false,
  },
  data: {
    autoSync: true,
    syncOnWiFiOnly: false,
    cacheSize: 100,
    offlineMode: false,
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    voiceOver: false,
  },
  developer: {
    debugMode: __DEV__,
    showPerformanceMetrics: false,
    enableBetaFeatures: false,
    logLevel: 'warn',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
    updateTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
    updateBiometricSettings: (state, action: PayloadAction<Partial<SettingsState['biometric']>>) => {
      state.biometric = { ...state.biometric, ...action.payload };
    },
    updateNotificationSettings: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateSecuritySettings: (state, action: PayloadAction<Partial<SettingsState['security']>>) => {
      state.security = { ...state.security, ...action.payload };
    },
    updateDataSettings: (state, action: PayloadAction<Partial<SettingsState['data']>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    updateAccessibilitySettings: (state, action: PayloadAction<Partial<SettingsState['accessibility']>>) => {
      state.accessibility = { ...state.accessibility, ...action.payload };
    },
    updateDeveloperSettings: (state, action: PayloadAction<Partial<SettingsState['developer']>>) => {
      state.developer = { ...state.developer, ...action.payload };
    },
    resetSettings: () => initialState,
    importSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  updateLanguage,
  updateRegion,
  updateTimezone,
  updateBiometricSettings,
  updateNotificationSettings,
  updateSecuritySettings,
  updateDataSettings,
  updateAccessibilitySettings,
  updateDeveloperSettings,
  resetSettings,
  importSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;

// Selectors
export const selectLanguage = (state: { settings: SettingsState }) => state.settings.language;
export const selectBiometricSettings = (state: { settings: SettingsState }) => state.settings.biometric;
export const selectNotificationSettings = (state: { settings: SettingsState }) => state.settings.notifications;
export const selectSecuritySettings = (state: { settings: SettingsState }) => state.settings.security;
export const selectDataSettings = (state: { settings: SettingsState }) => state.settings.data;
export const selectAccessibilitySettings = (state: { settings: SettingsState }) => state.settings.accessibility;
export const selectDeveloperSettings = (state: { settings: SettingsState }) => state.settings.developer;
export const selectAllSettings = (state: { settings: SettingsState }) => state.settings;
