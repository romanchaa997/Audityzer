
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { startSession, endSession, trackEvent, setDeviceInfo } from '@/store/slices/analyticsSlice';
import DeviceInfo from 'react-native-device-info';
import { AppState } from 'react-native';
import { DeviceInfo as DeviceInfoType, AnalyticsEvent } from '@/types';

interface AnalyticsContextType {
  trackEvent: (event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>) => void;
  trackScreenView: (screenName: string, params?: Record<string, any>) => void;
  trackUserAction: (action: string, params?: Record<string, any>) => void;
  trackError: (error: Error, context?: string) => void;
  isEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { settings, currentSession } = useAppSelector((state) => state.analytics);
  const { user } = useAppSelector((state) => state.auth);

  const trackEventWrapper = (event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>) => {
    if (settings.enabled) {
      dispatch(trackEvent({
        ...event,
        userId: user?.id,
      }));
    }
  };

  const trackScreenView = (screenName: string, params?: Record<string, any>) => {
    trackEventWrapper({
      name: 'screen_view',
      properties: {
        screen_name: screenName,
        ...params,
      },
    });
  };

  const trackUserAction = (action: string, params?: Record<string, any>) => {
    if (settings.userInteractionTracking) {
      trackEventWrapper({
        name: 'user_action',
        properties: {
          action,
          ...params,
        },
      });
    }
  };

  const trackError = (error: Error, context?: string) => {
    trackEventWrapper({
      name: 'error',
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        context,
      },
    });
  };

  useEffect(() => {
    // Initialize device info and start session
    const initializeAnalytics = async () => {
      try {
        const deviceInfo: DeviceInfoType = {
          platform: await DeviceInfo.getSystemName() as 'ios' | 'android',
          osVersion: await DeviceInfo.getSystemVersion(),
          deviceModel: await DeviceInfo.getModel(),
          appVersion: DeviceInfo.getVersion(),
          buildNumber: DeviceInfo.getBuildNumber(),
        };

        dispatch(setDeviceInfo(deviceInfo));

        if (settings.enabled && user?.id) {
          await dispatch(startSession(deviceInfo)).unwrap();
        }
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };

    if (user?.id) {
      initializeAnalytics();
    }

    return () => {
      // End session when component unmounts
      if (currentSession?.id) {
        dispatch(endSession(currentSession.id));
      }
    };
  }, [user?.id, settings.enabled, dispatch]);

  useEffect(() => {
    // Handle app state changes for session management
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' && currentSession?.id) {
        // Pause session when app goes to background
        trackEventWrapper({
          name: 'session_pause',
          properties: {
            session_id: currentSession.id,
          },
        });
      } else if (nextAppState === 'active' && currentSession?.id) {
        // Resume session when app becomes active
        trackEventWrapper({
          name: 'session_resume',
          properties: {
            session_id: currentSession.id,
          },
        });
      }
    });

    return () => subscription?.remove();
  }, [currentSession?.id]);

  const contextValue: AnalyticsContextType = {
    trackEvent: trackEventWrapper,
    trackScreenView,
    trackUserAction,
    trackError,
    isEnabled: settings.enabled,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export default AnalyticsProvider;
