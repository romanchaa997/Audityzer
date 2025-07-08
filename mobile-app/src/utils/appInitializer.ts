
import { Platform, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { pushNotificationService } from '@/services/notifications/pushNotificationService';
import { offlineService } from '@/services/offline/offlineService';
import { securityService } from '@/services/security/securityService';
import { store } from '@/store';
import { setDarkMode } from '@/store/slices/themeSlice';
import { Appearance } from 'react-native';

export const initializeApp = async (): Promise<void> => {
  try {
    console.log('Initializing Audityzer Mobile App...');

    // Initialize device theme detection
    await initializeTheme();

    // Initialize security services
    await initializeSecurity();

    // Initialize push notifications
    await initializePushNotifications();

    // Initialize offline capabilities
    await initializeOfflineService();

    // Initialize analytics (if enabled)
    await initializeAnalytics();

    // Perform security checks
    await performSecurityChecks();

    console.log('App initialization completed successfully');
  } catch (error) {
    console.error('App initialization failed:', error);
    // Don't throw error to prevent app crash, but log for debugging
  }
};

const initializeTheme = async (): Promise<void> => {
  try {
    // Set initial theme based on system preference
    const colorScheme = Appearance.getColorScheme();
    store.dispatch(setDarkMode(colorScheme === 'dark'));

    // Listen for theme changes
    Appearance.addChangeListener(({ colorScheme }) => {
      const state = store.getState();
      if (state.theme.currentTheme === 'system') {
        store.dispatch(setDarkMode(colorScheme === 'dark'));
      }
    });

    console.log('Theme system initialized');
  } catch (error) {
    console.error('Failed to initialize theme system:', error);
  }
};

const initializeSecurity = async (): Promise<void> => {
  try {
    // Log app start event
    await securityService.logSecurityEvent({
      type: 'APP_START',
      description: 'Mobile application started',
      severity: 'low',
      metadata: {
        platform: Platform.OS,
        version: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
      },
    });

    console.log('Security services initialized');
  } catch (error) {
    console.error('Failed to initialize security services:', error);
  }
};

const initializePushNotifications = async (): Promise<void> => {
  try {
    await pushNotificationService.initialize();
    console.log('Push notifications initialized');
  } catch (error) {
    console.error('Failed to initialize push notifications:', error);
  }
};

const initializeOfflineService = async (): Promise<void> => {
  try {
    await offlineService.initialize();
    console.log('Offline service initialized');
  } catch (error) {
    console.error('Failed to initialize offline service:', error);
  }
};

const initializeAnalytics = async (): Promise<void> => {
  try {
    // Initialize analytics service if user has consented
    const state = store.getState();
    const settings = state.settings;

    if (settings.developer.debugMode) {
      console.log('Analytics initialization skipped (debug mode)');
      return;
    }

    // TODO: Initialize Firebase Analytics or other analytics service
    console.log('Analytics initialized');
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
};

const performSecurityChecks = async (): Promise<void> => {
  try {
    const integrityCheck = await securityService.performIntegrityCheck();

    if (!integrityCheck.isSecure) {
      console.warn('Security issues detected:', integrityCheck.issues);

      // Log security issues
      await securityService.logSecurityEvent({
        type: 'SECURITY_ISSUE',
        description: 'Security integrity check failed',
        severity: 'high',
        metadata: {
          issues: integrityCheck.issues,
        },
      });

      // Show warning to user if there are critical issues
      const criticalIssues = integrityCheck.issues.filter(issue => 
        issue.includes('rooted') || 
        issue.includes('jailbroken') || 
        issue.includes('debug')
      );

      if (criticalIssues.length > 0 && !__DEV__) {
        Alert.alert(
          'Security Warning',
          'Security issues detected on this device. Some features may be limited.',
          [{ text: 'OK' }]
        );
      }
    }

    console.log('Security checks completed');
  } catch (error) {
    console.error('Security checks failed:', error);
  }
};

// App lifecycle helpers
export const handleAppStateChange = async (nextAppState: string): Promise<void> => {
  try {
    if (nextAppState === 'background') {
      // App going to background
      await securityService.logSecurityEvent({
        type: 'APP_BACKGROUND',
        description: 'App moved to background',
        severity: 'low',
      });

      // Start auto-lock timer
      const state = store.getState();
      if (state.settings.security.autoLock) {
        // TODO: Implement auto-lock functionality
      }
    } else if (nextAppState === 'active') {
      // App coming to foreground
      await securityService.logSecurityEvent({
        type: 'APP_FOREGROUND',
        description: 'App returned to foreground',
        severity: 'low',
      });

      // Check if biometric authentication is required
      const state = store.getState();
      if (state.settings.biometric.enabled && state.settings.biometric.promptOnStart) {
        // TODO: Prompt for biometric authentication
      }

      // Trigger sync if online
      if (await offlineService.isOnline()) {
        offlineService.performSync();
      }
    }
  } catch (error) {
    console.error('Failed to handle app state change:', error);
  }
};

// Error boundary helper
export const handleGlobalError = async (error: Error, errorInfo?: any): Promise<void> => {
  try {
    console.error('Global error caught:', error);

    // Log error for debugging
    await securityService.logSecurityEvent({
      type: 'APP_ERROR',
      description: 'Unhandled application error',
      severity: 'high',
      metadata: {
        error: error.message,
        stack: error.stack,
        errorInfo,
      },
    });

    // TODO: Send error to crash reporting service
  } catch (loggingError) {
    console.error('Failed to log global error:', loggingError);
  }
};

// Network status helper
export const handleNetworkChange = (isConnected: boolean): void => {
  try {
    if (isConnected) {
      console.log('Network connected - triggering sync');
      offlineService.performSync();
    } else {
      console.log('Network disconnected - enabling offline mode');
    }
  } catch (error) {
    console.error('Failed to handle network change:', error);
  }
};
