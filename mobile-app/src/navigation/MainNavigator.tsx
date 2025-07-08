
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Types
import { MainTabParamList } from '@/types';

// Stack Navigators
import DashboardNavigator from './DashboardNavigator';
import ProjectsNavigator from './ProjectsNavigator';
import SecurityNavigator from './SecurityNavigator';
import ReportsNavigator from './ReportsNavigator';
import SettingsNavigator from './SettingsNavigator';

// Hooks
import { useTheme } from '@/hooks/useTheme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsNavigator}
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, size }) => (
            <Icon name="folder-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Security"
        component={SecurityNavigator}
        options={{
          title: 'Security',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shield-check" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsNavigator}
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-line" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
