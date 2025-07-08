
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project, PaginatedResponse } from '@/types';
import { projectService } from '@/services/api/projectService';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
  };
  filters: {
    search: string;
    status: string;
    organizationId?: string;
  };
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    pageSize: 20,
  },
  filters: {
    search: '',
    status: 'all',
  },
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (params: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
    organizationId?: string;
  } = {}, { rejectWithValue }) => {
    try {
      return await projectService.getProjects(params);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch projects');
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'project/fetchById',
  async (projectId: string, { rejectWithValue }) => {
    try {
      return await projectService.getProjectById(projectId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch project');
    }
  }
);

export const createProject = createAsyncThunk(
  'project/create',
  async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      return await projectService.createProject(projectData);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create project');
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/update',
  async ({ id, data }: { id: string; data: Partial<Project> }, { rejectWithValue }) => {
    try {
      return await projectService.updateProject(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/delete',
  async (projectId: string, { rejectWithValue }) => {
    try {
      await projectService.deleteProject(projectId);
      return projectId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete project');
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    updateProjectInList: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = action.payload as PaginatedResponse<Project>;
        state.projects = response.items;
        state.pagination = {
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalCount: response.totalCount,
          pageSize: response.pageSize,
        };
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch project by ID
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create project
    builder
      .addCase(createProject.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isCreating = false;
        state.projects.unshift(action.payload);
        state.currentProject = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      });

    // Update project
    builder
      .addCase(updateProject.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.currentProject = action.payload;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      });

    // Delete project
    builder
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
      });
  },
});

export const { clearError, setFilters, clearCurrentProject, updateProjectInList } = projectSlice.actions;
export default projectSlice.reducer;

// Selectors
export const selectProjects = (state: { project: ProjectState }) => state.project.projects;
export const selectCurrentProject = (state: { project: ProjectState }) => state.project.currentProject;
export const selectProjectLoading = (state: { project: ProjectState }) => state.project.isLoading;
export const selectProjectCreating = (state: { project: ProjectState }) => state.project.isCreating;
export const selectProjectUpdating = (state: { project: ProjectState }) => state.project.isUpdating;
export const selectProjectError = (state: { project: ProjectState }) => state.project.error;
export const selectProjectPagination = (state: { project: ProjectState }) => state.project.pagination;
export const selectProjectFilters = (state: { project: ProjectState }) => state.project.filters;
