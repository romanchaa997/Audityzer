
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { checkAuthStatus, updateLastActivity } from '@/store/slices/authSlice';
import { fetchUserProfile } from '@/store/slices/userSlice';
import { fetchOrganizations } from '@/store/slices/organizationSlice';
import { AppState } from 'react-native';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);

  const refreshAuth = async () => {
    try {
      if (isAuthenticated) {
        // Refresh user data when authenticated
        await Promise.all([
          dispatch(fetchUserProfile()).unwrap(),
          dispatch(fetchOrganizations()).unwrap(),
        ]);
      }
    } catch (error) {
      console.error('Failed to refresh auth data:', error);
    }
  };

  useEffect(() => {
    // Check authentication status on mount
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    // Fetch additional user data when authenticated
    if (isAuthenticated && user) {
      refreshAuth();
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    // Handle app state changes for activity tracking
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active' && isAuthenticated) {
        dispatch(updateLastActivity());
      }
    });

    return () => subscription?.remove();
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    // Update activity on user interactions
    const interval = setInterval(() => {
      if (isAuthenticated) {
        dispatch(updateLastActivity());
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, dispatch]);

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
