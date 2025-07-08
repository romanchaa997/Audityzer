
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SettingsListScreen from '@/screens/settings/SettingsListScreen';
import ProfileScreen from '@/screens/settings/ProfileScreen';
import SecuritySettingsScreen from '@/screens/settings/SecuritySettingsScreen';
import NotificationSettingsScreen from '@/screens/settings/NotificationSettingsScreen';
import AboutScreen from '@/screens/settings/AboutScreen';

const Stack = createNativeStackNavigator();

const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsList"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="SettingsList"
        component={SettingsListScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="SecuritySettings"
        component={SecuritySettingsScreen}
        options={{
          title: 'Security Settings',
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
