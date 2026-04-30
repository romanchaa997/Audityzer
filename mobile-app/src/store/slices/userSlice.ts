
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserPreferences } from '@/types';
import apiClient from '@/services/api/apiClient';

interface UserState {
  profile: User | null;
  preferences: UserPreferences | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  lastActivity: string | null;
}

const initialState: UserState = {
  profile: null,
  preferences: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  lastActivity: null,
};

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/user/profile');
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch user profile');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch('/user/profile', profileData);
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update profile');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

export const updateUserPreferences = createAsyncThunk(
  'user/updatePreferences',
  async (preferences: Partial<UserPreferences>, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch('/user/preferences', preferences);
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update preferences');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update preferences');
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (imageUri: string, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      } as any);

      const response = await apiClient.uploadFile('/user/avatar', formData);
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to upload avatar');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to upload avatar');
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async (password: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete('/user/account', {
        data: { password },
      });
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to delete account');
      }
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete account');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLastActivity: (state) => {
      state.lastActivity = new Date().toISOString();
    },
    updateProfileLocally: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    updatePreferencesLocally: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.preferences) {
        state.preferences = { ...state.preferences, ...action.payload };
      }
    },
    clearUserData: (state) => {
      state.profile = null;
      state.preferences = null;
      state.lastActivity = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.user || action.payload;
        state.preferences = action.payload.preferences || state.preferences;
        state.lastActivity = new Date().toISOString();
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.profile = action.payload;
        state.lastActivity = new Date().toISOString();
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      });

    // Update user preferences
    builder
      .addCase(updateUserPreferences.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.preferences = action.payload;
        state.lastActivity = new Date().toISOString();
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      });

    // Upload avatar
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (state.profile) {
          state.profile.avatar = action.payload.avatarUrl || action.payload.avatar;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      });

    // Delete account
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.isUpdating = false;
        // Account deletion will trigger logout, so this state will be cleared
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  updateLastActivity,
  updateProfileLocally,
  updatePreferencesLocally,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUserProfile = (state: { user: UserState }) => state.user.profile;
export const selectUserPreferences = (state: { user: UserState }) => state.user.preferences;
export const selectUserLoading = (state: { user: UserState }) => state.user.isLoading;
export const selectUserUpdating = (state: { user: UserState }) => state.user.isUpdating;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export const selectLastActivity = (state: { user: UserState }) => state.user.lastActivity;
