
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { authService } from '@/services/auth/authService';
import { biometricService } from '@/services/biometric/biometricService';
import { securityService } from '@/services/security/securityService';

// Types
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  biometricEnabled: boolean;
  sessionExpiresAt: string | null;
  lastActivity: string | null;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
  organizationSlug?: string;
  rememberMe?: boolean;
}

interface BiometricLoginData {
  userId: string;
  organizationId?: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  organizationName?: string;
  organizationSlug?: string;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  refreshToken: null,
  biometricEnabled: false,
  sessionExpiresAt: null,
  lastActivity: null,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      
      // Store tokens securely
      await securityService.storeTokens(response.token, response.refreshToken);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const loginWithBiometric = createAsyncThunk(
  'auth/loginWithBiometric',
  async (data: BiometricLoginData, { rejectWithValue }) => {
    try {
      // Check if biometric is available and enrolled
      const biometricAvailable = await biometricService.isAvailable();
      if (!biometricAvailable) {
        throw new Error('Biometric authentication not available');
      }

      // Authenticate with biometric
      const biometricResult = await biometricService.authenticate({
        promptMessage: 'Authenticate to login to Audityzer',
        cancelButtonText: 'Cancel',
      });

      if (!biometricResult.success) {
        throw new Error('Biometric authentication failed');
      }

      // Login with stored credentials
      const response = await authService.loginWithBiometric(data);
      
      // Store tokens securely
      await securityService.storeTokens(response.token, response.refreshToken);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Biometric login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      
      // Store tokens securely
      await securityService.storeTokens(response.token, response.refreshToken);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const currentRefreshToken = state.auth.refreshToken;
      
      if (!currentRefreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken(currentRefreshToken);
      
      // Store new tokens securely
      await securityService.storeTokens(response.token, response.refreshToken);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Token refresh failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      
      if (state.auth.token) {
        await authService.logout(state.auth.token);
      }
      
      // Clear stored tokens
      await securityService.clearTokens();
      
      return true;
    } catch (error) {
      // Still clear local state even if server logout fails
      await securityService.clearTokens();
      return true;
    }
  }
);

export const setupBiometric = createAsyncThunk(
  'auth/setupBiometric',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      
      if (!state.auth.user) {
        throw new Error('User not authenticated');
      }

      // Check if biometric is available
      const biometricAvailable = await biometricService.isAvailable();
      if (!biometricAvailable) {
        throw new Error('Biometric authentication not available on this device');
      }

      // Test biometric authentication
      const result = await biometricService.authenticate({
        promptMessage: 'Verify your identity to enable biometric login',
        cancelButtonText: 'Cancel',
      });

      if (!result.success) {
        throw new Error('Biometric verification failed');
      }

      // Store biometric credentials
      await biometricService.storeBiometricCredentials(
        state.auth.user.id,
        state.auth.user.organizationId
      );

      // Update user preferences
      await authService.updateBiometricSettings(true);

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Biometric setup failed');
    }
  }
);

export const disableBiometric = createAsyncThunk(
  'auth/disableBiometric',
  async (_, { rejectWithValue }) => {
    try {
      // Remove stored biometric credentials
      await biometricService.removeBiometricCredentials();
      
      // Update user preferences
      await authService.updateBiometricSettings(false);

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to disable biometric');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Check if tokens exist in secure storage
      const tokens = await securityService.getStoredTokens();
      
      if (!tokens.token) {
        throw new Error('No authentication token found');
      }

      // Validate token with server
      const response = await authService.validateToken(tokens.token);
      
      return {
        ...response,
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      };
    } catch (error: any) {
      // Clear invalid tokens
      await securityService.clearTokens();
      return rejectWithValue(error.message || 'Authentication check failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLastActivity: (state) => {
      state.lastActivity = new Date().toISOString();
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setSessionExpiry: (state, action: PayloadAction<string>) => {
      state.sessionExpiresAt = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiresAt = action.payload.expiresAt;
        state.lastActivity = new Date().toISOString();
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Biometric login
    builder
      .addCase(loginWithBiometric.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithBiometric.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiresAt = action.payload.expiresAt;
        state.lastActivity = new Date().toISOString();
        state.error = null;
      })
      .addCase(loginWithBiometric.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiresAt = action.payload.expiresAt;
        state.lastActivity = new Date().toISOString();
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Refresh token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiresAt = action.payload.expiresAt;
        state.lastActivity = new Date().toISOString();
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.sessionExpiresAt = null;
      });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.biometricEnabled = false;
      state.sessionExpiresAt = null;
      state.lastActivity = null;
      state.error = null;
    });

    // Setup biometric
    builder
      .addCase(setupBiometric.fulfilled, (state) => {
        state.biometricEnabled = true;
        if (state.user) {
          state.user.biometricEnabled = true;
        }
      })
      .addCase(setupBiometric.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Disable biometric
    builder
      .addCase(disableBiometric.fulfilled, (state) => {
        state.biometricEnabled = false;
        if (state.user) {
          state.user.biometricEnabled = false;
        }
      })
      .addCase(disableBiometric.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.biometricEnabled = action.payload.user.biometricEnabled;
        state.sessionExpiresAt = action.payload.expiresAt;
        state.lastActivity = new Date().toISOString();
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.biometricEnabled = false;
        state.sessionExpiresAt = null;
      });
  },
});

// Export actions
export const { clearError, updateLastActivity, updateUser, setSessionExpiry } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectBiometricEnabled = (state: { auth: AuthState }) => state.auth.biometricEnabled;
