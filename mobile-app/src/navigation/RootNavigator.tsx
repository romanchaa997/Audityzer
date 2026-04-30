
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector, useAppDispatch } from '@/store';
import { checkAuthStatus } from '@/store/slices/authSlice';

// Stack Types
import { RootStackParamList } from '@/types';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';

// Components
import LoadingScreen from '@/components/common/LoadingScreen';
import SplashScreen from '@/components/common/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = React.useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check authentication status on app start
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        console.log('No valid authentication found');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  // Show splash screen while initializing
  if (isInitializing) {
    return <SplashScreen />;
  }

  // Show loading screen while checking auth
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingNavigator}
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
            options={{
              animation: 'slide_from_bottom',
            }}
          />
        </>
      ) : (
        <Stack.Screen 
          name="Main" 
          component={MainNavigator}
          options={{
            animation: 'fade',
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
