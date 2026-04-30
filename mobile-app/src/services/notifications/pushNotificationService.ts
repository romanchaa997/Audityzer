
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { store } from '@/store';
import { addNotification } from '@/store/slices/notificationSlice';
import { PushNotification as NotificationType, NotificationPriority, NotificationType as NotificationTypeEnum } from '@/types';
import apiClient from '@/services/api/apiClient';

interface NotificationPayload {
  title: string;
  body: string;
  data?: any;
  type?: NotificationTypeEnum;
  priority?: NotificationPriority;
  sound?: string;
  badge?: number;
}

class PushNotificationService {
  private fcmToken: string | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Request permissions
      await this.requestPermissions();

      // Initialize push notifications
      this.initializePushNotifications();

      // Initialize Firebase messaging
      await this.initializeFirebaseMessaging();

      this.isInitialized = true;
      console.log('Push notification service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize push notification service:', error);
    }
  }

  private async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          Alert.alert(
            'Notifications Disabled',
            'Please enable notifications in Settings to receive important security alerts.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Settings', onPress: () => this.openSettings() },
            ]
          );
        }

        return enabled;
      } else {
        // Android permissions
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  private initializePushNotifications(): void {
    PushNotification.configure({
      onRegister: (token) => {
        console.log('Push notification token registered:', token);
      },

      onNotification: (notification) => {
        console.log('Push notification received:', notification);
        this.handleNotification(notification);
      },

      onAction: (notification) => {
        console.log('Notification action:', notification.action);
        this.handleNotificationAction(notification);
      },

      onRegistrationError: (err) => {
        console.error('Push notification registration error:', err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    // Create notification channels for Android
    if (Platform.OS === 'android') {
      this.createNotificationChannels();
    }
  }

  private createNotificationChannels(): void {
    PushNotification.createChannel(
      {
        channelId: 'security-alerts',
        channelName: 'Security Alerts',
        channelDescription: 'High priority security alerts and vulnerability notifications',
        importance: 4,
        vibrate: true,
        sound: 'security_alert.mp3',
      },
      () => {}
    );

    PushNotification.createChannel(
      {
        channelId: 'scan-updates',
        channelName: 'Scan Updates',
        channelDescription: 'Security scan completion and progress notifications',
        importance: 3,
        vibrate: true,
      },
      () => {}
    );

    PushNotification.createChannel(
      {
        channelId: 'general',
        channelName: 'General Notifications',
        channelDescription: 'General app notifications and updates',
        importance: 2,
        vibrate: false,
      },
      () => {}
    );
  }

  private async initializeFirebaseMessaging(): Promise<void> {
    try {
      // Get FCM token
      this.fcmToken = await messaging().getToken();
      console.log('FCM Token:', this.fcmToken);

      // Send token to server
      if (this.fcmToken) {
        await this.registerTokenWithServer(this.fcmToken);
      }

      // Listen for token refresh
      messaging().onTokenRefresh(async (token) => {
        console.log('FCM Token refreshed:', token);
        this.fcmToken = token;
        await this.registerTokenWithServer(token);
      });

      // Handle background messages
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Background message received:', remoteMessage);
        this.handleFirebaseMessage(remoteMessage);
      });

      // Handle foreground messages
      messaging().onMessage(async (remoteMessage) => {
        console.log('Foreground message received:', remoteMessage);
        this.handleFirebaseMessage(remoteMessage);
      });

      // Handle notification opened app
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log('Notification opened app:', remoteMessage);
        this.handleNotificationOpen(remoteMessage);
      });

      // Check if app was opened from a notification
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log('App opened from notification:', initialNotification);
        this.handleNotificationOpen(initialNotification);
      }
    } catch (error) {
      console.error('Firebase messaging initialization failed:', error);
    }
  }

  private async registerTokenWithServer(token: string): Promise<void> {
    try {
      await apiClient.post('/notifications/register-token', {
        token,
        platform: Platform.OS,
        appVersion: '1.0.0', // TODO: Get from app config
      });
    } catch (error) {
      console.error('Failed to register token with server:', error);
    }
  }

  private handleFirebaseMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage): void {
    if (remoteMessage.notification) {
      const { title, body } = remoteMessage.notification;
      const data = remoteMessage.data;

      this.showLocalNotification({
        title: title || 'Audityzer',
        body: body || 'New notification',
        data,
        type: this.getNotificationTypeFromData(data),
        priority: this.getNotificationPriorityFromData(data),
      });
    }
  }

  private handleNotification(notification: any): void {
    // Add notification to store
    const notificationData: NotificationType = {
      id: notification.id || Date.now().toString(),
      title: notification.title,
      body: notification.message || notification.body,
      data: notification.data,
      type: this.getNotificationTypeFromData(notification.data),
      priority: this.getNotificationPriorityFromData(notification.data),
    };

    store.dispatch(addNotification(notificationData));
  }

  private handleNotificationAction(notification: any): void {
    console.log('Handling notification action:', notification);
    // TODO: Implement navigation based on notification action
  }

  private handleNotificationOpen(remoteMessage: FirebaseMessagingTypes.RemoteMessage): void {
    console.log('Handling notification open:', remoteMessage);
    // TODO: Implement deep linking based on notification data
  }

  private getNotificationTypeFromData(data: any): NotificationTypeEnum {
    if (data?.type) {
      return data.type as NotificationTypeEnum;
    }
    return NotificationTypeEnum.SYSTEM_UPDATE;
  }

  private getNotificationPriorityFromData(data: any): NotificationPriority {
    if (data?.priority) {
      return data.priority as NotificationPriority;
    }
    return NotificationPriority.NORMAL;
  }

  showLocalNotification(payload: NotificationPayload): void {
    const channelId = this.getChannelIdForType(payload.type);

    PushNotification.localNotification({
      title: payload.title,
      message: payload.body,
      data: payload.data,
      channelId,
      priority: this.getPriorityNumber(payload.priority),
      vibrate: payload.priority === NotificationPriority.HIGH || payload.priority === NotificationPriority.URGENT,
      playSound: true,
      soundName: payload.sound || 'default',
      badge: payload.badge,
      actions: this.getActionsForType(payload.type),
    });
  }

  scheduleNotification(payload: NotificationPayload, date: Date): void {
    const channelId = this.getChannelIdForType(payload.type);

    PushNotification.localNotificationSchedule({
      title: payload.title,
      message: payload.body,
      data: payload.data,
      date,
      channelId,
      priority: this.getPriorityNumber(payload.priority),
      vibrate: payload.priority === NotificationPriority.HIGH || payload.priority === NotificationPriority.URGENT,
      playSound: true,
      soundName: payload.sound || 'default',
    });
  }

  private getChannelIdForType(type?: NotificationTypeEnum): string {
    switch (type) {
      case NotificationTypeEnum.VULNERABILITY_ALERT:
      case NotificationTypeEnum.SECURITY_ALERT:
        return 'security-alerts';
      case NotificationTypeEnum.SCAN_COMPLETED:
        return 'scan-updates';
      default:
        return 'general';
    }
  }

  private getPriorityNumber(priority?: NotificationPriority): 'high' | 'normal' | 'low' {
    switch (priority) {
      case NotificationPriority.URGENT:
      case NotificationPriority.HIGH:
        return 'high';
      case NotificationPriority.LOW:
        return 'low';
      default:
        return 'normal';
    }
  }

  private getActionsForType(type?: NotificationTypeEnum): string[] {
    switch (type) {
      case NotificationTypeEnum.VULNERABILITY_ALERT:
        return ['View Details', 'Dismiss'];
      case NotificationTypeEnum.SCAN_COMPLETED:
        return ['View Results', 'Dismiss'];
      default:
        return ['Open', 'Dismiss'];
    }
  }

  async clearAllNotifications(): Promise<void> {
    PushNotification.cancelAllLocalNotifications();
  }

  async clearNotification(id: string): Promise<void> {
    PushNotification.cancelLocalNotifications({ id });
  }

  async getBadgeCount(): Promise<number> {
    return new Promise((resolve) => {
      PushNotification.getApplicationIconBadgeNumber((badgeCount) => {
        resolve(badgeCount);
      });
    });
  }

  async setBadgeCount(count: number): Promise<void> {
    PushNotification.setApplicationIconBadgeNumber(count);
  }

  async checkPermissions(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().hasPermission();
      return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted;
    }
  }

  private openSettings(): void {
    // TODO: Implement opening app settings
    console.log('Opening app settings...');
  }

  async subscribeToTopic(topic: string): Promise<void> {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error(`Failed to subscribe to topic ${topic}:`, error);
    }
  }

  async unsubscribeFromTopic(topic: string): Promise<void> {
    try {
      await messaging().unsubscribeFromTopic(topic);
      console.log(`Unsubscribed from topic: ${topic}`);
    } catch (error) {
      console.error(`Failed to unsubscribe from topic ${topic}:`, error);
    }
  }

  getFCMToken(): string | null {
    return this.fcmToken;
  }

  async updateNotificationPreferences(preferences: {
    vulnerabilityAlerts: boolean;
    scanCompletions: boolean;
    systemUpdates: boolean;
    securityAlerts: boolean;
  }): Promise<void> {
    try {
      // Update server preferences
      await apiClient.patch('/notifications/preferences', preferences);

      // Subscribe/unsubscribe from topics based on preferences
      if (preferences.vulnerabilityAlerts) {
        await this.subscribeToTopic('vulnerability-alerts');
      } else {
        await this.unsubscribeFromTopic('vulnerability-alerts');
      }

      if (preferences.scanCompletions) {
        await this.subscribeToTopic('scan-completions');
      } else {
        await this.unsubscribeFromTopic('scan-completions');
      }

      if (preferences.systemUpdates) {
        await this.subscribeToTopic('system-updates');
      } else {
        await this.unsubscribeFromTopic('system-updates');
      }

      if (preferences.securityAlerts) {
        await this.subscribeToTopic('security-alerts');
      } else {
        await this.unsubscribeFromTopic('security-alerts');
      }
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      throw new Error('Failed to update notification preferences');
    }
  }
}

export const pushNotificationService = new PushNotificationService();
export default pushNotificationService;
