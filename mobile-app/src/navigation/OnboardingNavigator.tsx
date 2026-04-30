
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import WelcomeScreen from '@/screens/onboarding/WelcomeScreen';
import FeaturesScreen from '@/screens/onboarding/FeaturesScreen';
import PermissionsScreen from '@/screens/onboarding/PermissionsScreen';

const Stack = createNativeStackNavigator();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="Features"
        component={FeaturesScreen}
      />
      <Stack.Screen
        name="Permissions"
        component={PermissionsScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
