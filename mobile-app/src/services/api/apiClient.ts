
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@/store';
import { refreshToken, logout } from '@/store/slices/authSlice';
import { securityService } from '@/services/security/securityService';
import { ApiResponse } from '@/types';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: this.getBaseURL(),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private getBaseURL(): string {
    // Use environment variable or fallback to production URL
    return process.env.REACT_NATIVE_API_BASE_URL || 'https://api.audityzer.com/v1';
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add auth token to requests
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add organization context if available
        const currentOrg = state.organization.currentOrganization;
        if (currentOrg) {
          config.headers['X-Organization-Id'] = currentOrg.id;
        }

        // Add request timestamp for analytics
        config.metadata = { startTime: Date.now() };

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Calculate request duration for analytics
        const duration = Date.now() - response.config.metadata?.startTime;
        response.config.metadata = { ...response.config.metadata, duration };

        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle token refresh for 401 errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest);
            }).catch((err) => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const resultAction = await store.dispatch(refreshToken());
            
            if (refreshToken.fulfilled.match(resultAction)) {
              const newToken = resultAction.payload.token;
              
              // Process the failed queue
              this.processQueue(null, newToken);
              
              // Retry original request
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            } else {
              // Refresh failed, logout user
              this.processQueue(new Error('Token refresh failed'), null);
              store.dispatch(logout());
              return Promise.reject(error);
            }
          } catch (err) {
            this.processQueue(err, null);
            store.dispatch(logout());
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle network errors
        if (!error.response) {
          error.message = 'Network error. Please check your connection.';
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: any, token: string | null): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  // HTTP Methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // File upload with progress
  async uploadFile<T = any>(
    url: string,
    file: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Download file
  async downloadFile(url: string, fileName: string): Promise<string> {
    try {
      const response = await this.client.get(url, {
        responseType: 'blob',
      });

      // Create file URL for download
      const fileURL = URL.createObjectURL(response.data);
      return fileURL;
    } catch (error) {
      throw new Error('Failed to download file');
    }
  }

  private handleResponse<T>(response: AxiosResponse): ApiResponse<T> {
    const { data, status } = response;

    if (status >= 200 && status < 300) {
      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    }

    return {
      success: false,
      error: {
        code: status.toString(),
        message: data.message || 'Request failed',
        details: data.details,
      },
    };
  }

  private handleError(error: any): ApiResponse {
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      return {
        success: false,
        error: {
          code: status.toString(),
          message: data?.message || error.message || 'Request failed',
          details: data?.details,
        },
      };
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error. Please check your connection.',
        },
      };
    } else {
      // Other error
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error.message || 'An unexpected error occurred',
        },
      };
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/health');
      return response.success;
    } catch {
      return false;
    }
  }

  // Set base URL (useful for environment switching)
  setBaseURL(baseURL: string): void {
    this.client.defaults.baseURL = baseURL;
  }

  // Get current base URL
  getBaseURLValue(): string {
    return this.client.defaults.baseURL || '';
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
