
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { pushNotificationService } from './pushNotificationService';
import { addNotification, updateSettings } from '@/store/slices/notificationSlice';
import { AppState } from 'react-native';

interface PushNotificationContextType {
  isPermissionGranted: boolean;
  fcmToken: string | null;
  requestPermission: () => Promise<boolean>;
  showLocalNotification: (payload: any) => void;
  scheduleNotification: (payload: any, date: Date) => void;
  clearAllNotifications: () => Promise<void>;
  updateNotificationPreferences: (preferences: any) => Promise<void>;
}

const PushNotificationContext = createContext<PushNotificationContextType | undefined>(undefined);

interface PushNotificationProviderProps {
  children: ReactNode;
}

export const PushNotificationProvider: React.FC<PushNotificationProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.notification);
  const [isPermissionGranted, setIsPermissionGranted] = React.useState(false);

  const requestPermission = async (): Promise<boolean> => {
    try {
      const hasPermission = await pushNotificationService.checkPermissions();
      setIsPermissionGranted(hasPermission);
      return hasPermission;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  };

  const showLocalNotification = (payload: any) => {
    if (settings.enabled) {
      pushNotificationService.showLocalNotification(payload);
    }
  };

  const scheduleNotification = (payload: any, date: Date) => {
    if (settings.enabled) {
      pushNotificationService.scheduleNotification(payload, date);
    }
  };

  const clearAllNotifications = async () => {
    await pushNotificationService.clearAllNotifications();
  };

  const updateNotificationPreferences = async (preferences: any) => {
    try {
      await pushNotificationService.updateNotificationPreferences(preferences);
      dispatch(updateSettings({ types: preferences }));
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Initialize push notification service
    const initializePushNotifications = async () => {
      try {
        await pushNotificationService.initialize();
        const hasPermission = await pushNotificationService.checkPermissions();
        setIsPermissionGranted(hasPermission);
      } catch (error) {
        console.error('Failed to initialize push notifications:', error);
      }
    };

    initializePushNotifications();
  }, []);

  useEffect(() => {
    // Handle app state changes for notification badge management
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        // Clear badge when app becomes active
        pushNotificationService.setBadgeCount(0);
      }
    });

    return () => subscription?.remove();
  }, []);

  const contextValue: PushNotificationContextType = {
    isPermissionGranted,
    fcmToken: pushNotificationService.getFCMToken(),
    requestPermission,
    showLocalNotification,
    scheduleNotification,
    clearAllNotifications,
    updateNotificationPreferences,
  };

  return (
    <PushNotificationContext.Provider value={contextValue}>
      {children}
    </PushNotificationContext.Provider>
  );
};

export const usePushNotifications = (): PushNotificationContextType => {
  const context = useContext(PushNotificationContext);
  if (context === undefined) {
    throw new Error('usePushNotifications must be used within a PushNotificationProvider');
  }
  return context;
};

export default PushNotificationProvider;
