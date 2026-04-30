
import apiClient from '@/services/api/apiClient';
import { User } from '@/types';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
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

interface TokenRefreshResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Login failed');
    }

    return response.data;
  }

  async loginWithBiometric(data: BiometricLoginData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/biometric-login', data);
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Biometric login failed');
    }

    return response.data;
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/register', data);
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Registration failed');
    }

    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    const response = await apiClient.post<TokenRefreshResponse>('/auth/refresh', {
      refreshToken,
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Token refresh failed');
    }

    return response.data;
  }

  async logout(token: string): Promise<void> {
    try {
      await apiClient.post('/auth/logout', { token });
    } catch (error) {
      // Continue with logout even if server request fails
      console.warn('Logout request failed:', error);
    }
  }

  async validateToken(token: string): Promise<{ user: User; expiresAt: string }> {
    const response = await apiClient.get<{ user: User; expiresAt: string }>('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Token validation failed');
    }

    return response.data;
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiClient.post('/auth/forgot-password', { email });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Password reset request failed');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      password: newPassword,
    });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Password reset failed');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Password change failed');
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>('/auth/profile', data);
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Profile update failed');
    }

    return response.data;
  }

  async updateBiometricSettings(enabled: boolean): Promise<void> {
    const response = await apiClient.patch('/auth/biometric-settings', {
      biometricEnabled: enabled,
    });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Biometric settings update failed');
    }
  }

  async verify2FA(code: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/verify-2fa', { code });
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || '2FA verification failed');
    }

    return response.data;
  }

  async enable2FA(): Promise<{ qrCode: string; secret: string }> {
    const response = await apiClient.post<{ qrCode: string; secret: string }>('/auth/enable-2fa');
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to enable 2FA');
    }

    return response.data;
  }

  async disable2FA(code: string): Promise<void> {
    const response = await apiClient.post('/auth/disable-2fa', { code });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to disable 2FA');
    }
  }

  async checkEmailAvailability(email: string): Promise<boolean> {
    const response = await apiClient.get<{ available: boolean }>(`/auth/check-email?email=${encodeURIComponent(email)}`);
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Email check failed');
    }

    return response.data.available;
  }

  async resendVerificationEmail(): Promise<void> {
    const response = await apiClient.post('/auth/resend-verification');
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to resend verification email');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await apiClient.post('/auth/verify-email', { token });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Email verification failed');
    }
  }
}

export const authService = new AuthService();
export default authService;
