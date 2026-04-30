
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '@/types';

// Screens
import DashboardOverviewScreen from '@/screens/dashboard/DashboardOverviewScreen';
import TenantSelectorScreen from '@/screens/dashboard/TenantSelectorScreen';
import AnalyticsScreen from '@/screens/dashboard/AnalyticsScreen';

// Components
import HeaderRight from '@/components/navigation/HeaderRight';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

const DashboardNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Overview"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Overview"
        component={DashboardOverviewScreen}
        options={{
          title: 'Dashboard',
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="TenantSelector"
        component={TenantSelectorScreen}
        options={{
          title: 'Select Organization',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: 'Analytics',
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
