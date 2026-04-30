
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import ReportsListScreen from '@/screens/reports/ReportsListScreen';
import ReportDetailsScreen from '@/screens/reports/ReportDetailsScreen';
import CreateReportScreen from '@/screens/reports/CreateReportScreen';

const Stack = createNativeStackNavigator();

const ReportsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReportsList"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="ReportsList"
        component={ReportsListScreen}
        options={{
          title: 'Reports',
        }}
      />
      <Stack.Screen
        name="ReportDetails"
        component={ReportDetailsScreen}
        options={{
          title: 'Report Details',
        }}
      />
      <Stack.Screen
        name="CreateReport"
        component={CreateReportScreen}
        options={{
          title: 'Create Report',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default ReportsNavigator;
