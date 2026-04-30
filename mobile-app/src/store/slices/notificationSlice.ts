
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PushNotification as NotificationType } from '@/types';

interface NotificationState {
  notifications: NotificationType[];
  unreadCount: number;
  settings: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
    badge: boolean;
    types: {
      vulnerabilityAlerts: boolean;
      scanCompletions: boolean;
      systemUpdates: boolean;
      securityAlerts: boolean;
    };
  };
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  settings: {
    enabled: true,
    sound: true,
    vibration: true,
    badge: true,
    types: {
      vulnerabilityAlerts: true,
      scanCompletions: true,
      systemUpdates: true,
      securityAlerts: true,
    },
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    updateSettings: (state, action: PayloadAction<Partial<NotificationState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setBadgeCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  updateSettings,
  setBadgeCount,
} = notificationSlice.actions;

export default notificationSlice.reducer;

// Selectors
export const selectNotifications = (state: { notification: NotificationState }) => 
  state.notification.notifications;
export const selectUnreadCount = (state: { notification: NotificationState }) => 
  state.notification.unreadCount;
export const selectNotificationSettings = (state: { notification: NotificationState }) => 
  state.notification.settings;
