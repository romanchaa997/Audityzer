
import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import BootSplash from 'react-native-bootsplash';

// Store and Providers
import { store, persistor } from '@/store';
import { AuthProvider } from '@/services/auth/AuthProvider';
import { OfflineProvider } from '@/services/offline/OfflineProvider';
import { PushNotificationProvider } from '@/services/notifications/PushNotificationProvider';
import { AnalyticsProvider } from '@/services/analytics/AnalyticsProvider';

// Navigation
import RootNavigator from '@/navigation/RootNavigator';

// Utils
import { initializeApp } from '@/utils/appInitializer';
import { navigationRef } from '@/navigation/NavigationService';

// Theme
import { ThemeProvider } from '@/components/common/ThemeProvider';

// Components
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Suppress specific warnings for development
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  'EdgeInsetsPropType will be removed',
  'Animated: `useNativeDriver`',
]);

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    const init = async () => {
      try {
        await initializeApp();
      } catch (error) {
        console.error('App initialization failed:', error);
      } finally {
        // Hide splash screen after app is ready
        await BootSplash.hide({ fade: true });
      }
    };

    init();
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                  <AuthProvider>
                    <OfflineProvider>
                      <PushNotificationProvider>
                        <AnalyticsProvider>
                          <NavigationContainer ref={navigationRef}>
                            <StatusBar
                              barStyle="dark-content"
                              backgroundColor="transparent"
                              translucent
                            />
                            <RootNavigator />
                            <Toast />
                          </NavigationContainer>
                        </AnalyticsProvider>
                      </PushNotificationProvider>
                    </OfflineProvider>
                  </AuthProvider>
                </ThemeProvider>
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default App;
