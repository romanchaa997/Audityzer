
import EncryptedStorage from 'react-native-encrypted-storage';
import Keychain from 'react-native-keychain';
import { Platform } from 'react-native';
import CryptoJS from 'crypto-js';

interface StoredTokens {
  token: string | null;
  refreshToken: string | null;
}

interface SecureStorageOptions {
  service?: string;
  accessGroup?: string;
  touchID?: boolean;
  showModal?: boolean;
}

class SecurityService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly ENCRYPTION_KEY = 'encryption_key';
  private readonly SERVICE_NAME = 'AudityzerMobile';

  private encryptionKey: string | null = null;

  constructor() {
    this.initializeEncryption();
  }

  private async initializeEncryption(): Promise<void> {
    try {
      // Try to get existing encryption key
      let key = await EncryptedStorage.getItem(this.ENCRYPTION_KEY);
      
      if (!key) {
        // Generate new encryption key
        key = this.generateEncryptionKey();
        await EncryptedStorage.setItem(this.ENCRYPTION_KEY, key);
      }
      
      this.encryptionKey = key;
    } catch (error) {
      console.error('Failed to initialize encryption:', error);
      // Fallback to a session-based key
      this.encryptionKey = this.generateEncryptionKey();
    }
  }

  private generateEncryptionKey(): string {
    return CryptoJS.lib.WordArray.random(256/8).toString();
  }

  private encrypt(data: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption not initialized');
    }
    
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(encryptedData: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption not initialized');
    }
    
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Token management using Keychain (more secure)
  async storeTokens(token: string, refreshToken: string): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        // Use Keychain for iOS
        await Keychain.setInternetCredentials(
          this.SERVICE_NAME,
          this.TOKEN_KEY,
          JSON.stringify({ token, refreshToken }),
          {
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          }
        );
      } else {
        // Use EncryptedStorage for Android with additional encryption
        const tokenData = this.encrypt(JSON.stringify({ token, refreshToken }));
        await EncryptedStorage.setItem(this.TOKEN_KEY, tokenData);
      }
    } catch (error) {
      console.error('Failed to store tokens:', error);
      throw new Error('Failed to store authentication tokens');
    }
  }

  async getStoredTokens(): Promise<StoredTokens> {
    try {
      if (Platform.OS === 'ios') {
        // Use Keychain for iOS
        const credentials = await Keychain.getInternetCredentials(this.SERVICE_NAME);
        
        if (credentials && credentials.password) {
          const tokenData = JSON.parse(credentials.password);
          return {
            token: tokenData.token,
            refreshToken: tokenData.refreshToken,
          };
        }
      } else {
        // Use EncryptedStorage for Android
        const encryptedTokenData = await EncryptedStorage.getItem(this.TOKEN_KEY);
        
        if (encryptedTokenData) {
          const decryptedData = this.decrypt(encryptedTokenData);
          const tokenData = JSON.parse(decryptedData);
          return {
            token: tokenData.token,
            refreshToken: tokenData.refreshToken,
          };
        }
      }
      
      return { token: null, refreshToken: null };
    } catch (error) {
      console.error('Failed to retrieve tokens:', error);
      return { token: null, refreshToken: null };
    }
  }

  async clearTokens(): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await Keychain.resetInternetCredentials(this.SERVICE_NAME);
      } else {
        await EncryptedStorage.removeItem(this.TOKEN_KEY);
      }
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }

  // Secure storage for sensitive data
  async storeSecureData(key: string, data: any, options?: SecureStorageOptions): Promise<void> {
    try {
      const dataString = JSON.stringify(data);
      
      if (Platform.OS === 'ios' && options?.touchID) {
        // Use Keychain with biometric protection on iOS
        await Keychain.setInternetCredentials(
          options.service || this.SERVICE_NAME,
          key,
          dataString,
          {
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          }
        );
      } else {
        // Use encrypted storage
        const encryptedData = this.encrypt(dataString);
        await EncryptedStorage.setItem(key, encryptedData);
      }
    } catch (error) {
      console.error('Failed to store secure data:', error);
      throw new Error('Failed to store secure data');
    }
  }

  async getSecureData<T = any>(key: string, options?: SecureStorageOptions): Promise<T | null> {
    try {
      if (Platform.OS === 'ios' && options?.touchID) {
        // Use Keychain for iOS
        const credentials = await Keychain.getInternetCredentials(
          options.service || this.SERVICE_NAME
        );
        
        if (credentials && credentials.username === key) {
          return JSON.parse(credentials.password);
        }
      } else {
        // Use encrypted storage
        const encryptedData = await EncryptedStorage.getItem(key);
        
        if (encryptedData) {
          const decryptedData = this.decrypt(encryptedData);
          return JSON.parse(decryptedData);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      return null;
    }
  }

  async removeSecureData(key: string, options?: SecureStorageOptions): Promise<void> {
    try {
      if (Platform.OS === 'ios' && options?.touchID) {
        await Keychain.resetInternetCredentials(options.service || this.SERVICE_NAME);
      } else {
        await EncryptedStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Failed to remove secure data:', error);
    }
  }

  // Session management
  async storeSessionData(sessionId: string, data: any): Promise<void> {
    try {
      const sessionKey = `session_${sessionId}`;
      await this.storeSecureData(sessionKey, {
        ...data,
        timestamp: Date.now(),
      });
    } catch (error) {
      throw new Error('Failed to store session data');
    }
  }

  async getSessionData(sessionId: string): Promise<any | null> {
    try {
      const sessionKey = `session_${sessionId}`;
      const sessionData = await this.getSecureData(sessionKey);
      
      if (sessionData) {
        // Check if session is still valid (24 hours)
        const sessionAge = Date.now() - sessionData.timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge > maxAge) {
          await this.removeSecureData(sessionKey);
          return null;
        }
        
        return sessionData;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve session data:', error);
      return null;
    }
  }

  async clearAllSessionData(): Promise<void> {
    try {
      // This is a simplified approach; in production, you'd want to track session keys
      await EncryptedStorage.clear();
      
      if (Platform.OS === 'ios') {
        await Keychain.resetInternetCredentials(this.SERVICE_NAME);
      }
    } catch (error) {
      console.error('Failed to clear session data:', error);
    }
  }

  // Security utilities
  async generateSecureToken(): Promise<string> {
    try {
      const randomBytes = CryptoJS.lib.WordArray.random(32);
      return randomBytes.toString(CryptoJS.enc.Hex);
    } catch (error) {
      // Fallback to timestamp-based token
      return `${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }
  }

  validateTokenFormat(token: string): boolean {
    // Basic JWT format validation
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    return jwtRegex.test(token);
  }

  async hashData(data: string): Promise<string> {
    return CryptoJS.SHA256(data).toString();
  }

  async verifyDataIntegrity(data: string, hash: string): Promise<boolean> {
    const computedHash = await this.hashData(data);
    return computedHash === hash;
  }

  // Certificate pinning helpers
  async storeCertificatePins(pins: { [domain: string]: string[] }): Promise<void> {
    try {
      await this.storeSecureData('certificate_pins', pins);
    } catch (error) {
      throw new Error('Failed to store certificate pins');
    }
  }

  async getCertificatePins(): Promise<{ [domain: string]: string[] } | null> {
    try {
      return await this.getSecureData('certificate_pins');
    } catch (error) {
      return null;
    }
  }

  // Security audit trail
  async logSecurityEvent(event: {
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    metadata?: any;
  }): Promise<void> {
    try {
      const securityLog = {
        ...event,
        timestamp: new Date().toISOString(),
        deviceId: await this.getDeviceId(),
      };

      // Store locally for offline access
      const existingLogs = await this.getSecureData('security_logs') || [];
      existingLogs.push(securityLog);

      // Keep only last 100 logs
      const trimmedLogs = existingLogs.slice(-100);
      await this.storeSecureData('security_logs', trimmedLogs);

      // TODO: Send to server if online
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  async getSecurityLogs(): Promise<any[]> {
    try {
      return await this.getSecureData('security_logs') || [];
    } catch (error) {
      return [];
    }
  }

  private async getDeviceId(): Promise<string> {
    try {
      let deviceId = await this.getSecureData('device_id');
      
      if (!deviceId) {
        deviceId = await this.generateSecureToken();
        await this.storeSecureData('device_id', deviceId);
      }
      
      return deviceId;
    } catch (error) {
      return 'unknown_device';
    }
  }

  // App integrity checks
  async performIntegrityCheck(): Promise<{
    isSecure: boolean;
    issues: string[];
  }> {
    const issues: string[] = [];

    try {
      // Check if device is rooted/jailbroken (simplified check)
      const isDeviceCompromised = await this.isDeviceCompromised();
      if (isDeviceCompromised) {
        issues.push('Device appears to be rooted or jailbroken');
      }

      // Check if debugging is enabled
      if (__DEV__) {
        issues.push('App is running in debug mode');
      }

      // Check certificate pinning
      const certificatePins = await this.getCertificatePins();
      if (!certificatePins) {
        issues.push('Certificate pinning not configured');
      }

      // Check encryption availability
      if (!this.encryptionKey) {
        issues.push('Encryption not properly initialized');
      }

      return {
        isSecure: issues.length === 0,
        issues,
      };
    } catch (error) {
      return {
        isSecure: false,
        issues: ['Integrity check failed'],
      };
    }
  }

  private async isDeviceCompromised(): Promise<boolean> {
    // This is a simplified check; in production, you'd use more sophisticated detection
    try {
      if (Platform.OS === 'ios') {
        // Check for common jailbreak indicators
        // This is a basic check and should be enhanced
        return false;
      } else {
        // Check for common root indicators on Android
        // This is a basic check and should be enhanced
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export const securityService = new SecurityService();
export default securityService;
