
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SecurityStackParamList } from '@/types';

// Screens
import VulnerabilityListScreen from '@/screens/security/VulnerabilityListScreen';
import VulnerabilityDetailsScreen from '@/screens/security/VulnerabilityDetailsScreen';
import SecurityScanScreen from '@/screens/security/SecurityScanScreen';
import ThreatMonitoringScreen from '@/screens/security/ThreatMonitoringScreen';

const Stack = createNativeStackNavigator<SecurityStackParamList>();

const SecurityNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="VulnerabilityList"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="VulnerabilityList"
        component={VulnerabilityListScreen}
        options={{
          title: 'Security Issues',
        }}
      />
      <Stack.Screen
        name="VulnerabilityDetails"
        component={VulnerabilityDetailsScreen}
        options={{
          title: 'Vulnerability Details',
        }}
      />
      <Stack.Screen
        name="SecurityScan"
        component={SecurityScanScreen}
        options={{
          title: 'Security Scan',
        }}
      />
      <Stack.Screen
        name="ThreatMonitoring"
        component={ThreatMonitoringScreen}
        options={{
          title: 'Threat Monitoring',
        }}
      />
    </Stack.Navigator>
  );
};

export default SecurityNavigator;
