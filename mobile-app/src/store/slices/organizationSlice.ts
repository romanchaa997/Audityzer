
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from '@/types';
import { organizationService } from '@/services/api/organizationService';

interface OrganizationState {
  currentOrganization: Organization | null;
  organizations: Organization[];
  isLoading: boolean;
  isLoadingList: boolean;
  error: string | null;
  switchingOrganization: boolean;
}

const initialState: OrganizationState = {
  currentOrganization: null,
  organizations: [],
  isLoading: false,
  isLoadingList: false,
  error: null,
  switchingOrganization: false,
};

// Async thunks
export const fetchOrganizations = createAsyncThunk(
  'organization/fetchOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      return await organizationService.getOrganizations();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch organizations');
    }
  }
);

export const fetchOrganizationById = createAsyncThunk(
  'organization/fetchById',
  async (organizationId: string, { rejectWithValue }) => {
    try {
      return await organizationService.getOrganizationById(organizationId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch organization');
    }
  }
);

export const switchOrganization = createAsyncThunk(
  'organization/switch',
  async (organizationId: string, { rejectWithValue }) => {
    try {
      const organization = await organizationService.getOrganizationById(organizationId);
      await organizationService.setCurrentOrganization(organizationId);
      return organization;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to switch organization');
    }
  }
);

export const updateOrganization = createAsyncThunk(
  'organization/update',
  async ({ id, data }: { id: string; data: Partial<Organization> }, { rejectWithValue }) => {
    try {
      return await organizationService.updateOrganization(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update organization');
    }
  }
);

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentOrganization: (state, action: PayloadAction<Organization>) => {
      state.currentOrganization = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch organizations
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.isLoadingList = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.isLoadingList = false;
        state.error = action.payload as string;
      });

    // Fetch organization by ID
    builder
      .addCase(fetchOrganizationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrganization = action.payload;
      })
      .addCase(fetchOrganizationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Switch organization
    builder
      .addCase(switchOrganization.pending, (state) => {
        state.switchingOrganization = true;
        state.error = null;
      })
      .addCase(switchOrganization.fulfilled, (state, action) => {
        state.switchingOrganization = false;
        state.currentOrganization = action.payload;
      })
      .addCase(switchOrganization.rejected, (state, action) => {
        state.switchingOrganization = false;
        state.error = action.payload as string;
      });

    // Update organization
    builder
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.currentOrganization = action.payload;
        const index = state.organizations.findIndex(org => org.id === action.payload.id);
        if (index !== -1) {
          state.organizations[index] = action.payload;
        }
      });
  },
});

export const { clearError, setCurrentOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;

// Selectors
export const selectCurrentOrganization = (state: { organization: OrganizationState }) => 
  state.organization.currentOrganization;
export const selectOrganizations = (state: { organization: OrganizationState }) => 
  state.organization.organizations;
export const selectOrganizationLoading = (state: { organization: OrganizationState }) => 
  state.organization.isLoading;
export const selectSwitchingOrganization = (state: { organization: OrganizationState }) => 
  state.organization.switchingOrganization;
