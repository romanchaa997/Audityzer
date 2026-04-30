
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Platform } from 'react-native';

interface BiometricResult {
  success: boolean;
  error?: string;
  signature?: string;
}

interface BiometricAvailability {
  isAvailable: boolean;
  biometryType?: BiometryTypes;
  error?: string;
}

interface AuthenticationOptions {
  promptMessage: string;
  cancelButtonText?: string;
  fallbackPromptMessage?: string;
}

class BiometricService {
  private rnBiometrics: ReactNativeBiometrics;
  private readonly BIOMETRIC_CREDENTIALS_KEY = 'biometric_credentials';
  private readonly BIOMETRIC_PUBLIC_KEY = 'biometric_public_key';

  constructor() {
    this.rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
  }

  async isAvailable(): Promise<boolean> {
    try {
      const { available } = await this.rnBiometrics.isSensorAvailable();
      return available;
    } catch (error) {
      console.error('Biometric availability check failed:', error);
      return false;
    }
  }

  async getBiometricAvailability(): Promise<BiometricAvailability> {
    try {
      const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();
      
      return {
        isAvailable: available,
        biometryType: biometryType as BiometryTypes,
      };
    } catch (error: any) {
      return {
        isAvailable: false,
        error: error.message || 'Failed to check biometric availability',
      };
    }
  }

  async authenticate(options: AuthenticationOptions): Promise<BiometricResult> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        return {
          success: false,
          error: 'Biometric authentication not available',
        };
      }

      const { success, signature } = await this.rnBiometrics.simplePrompt({
        promptMessage: options.promptMessage,
        cancelButtonText: options.cancelButtonText || 'Cancel',
      });

      if (success) {
        return {
          success: true,
          signature,
        };
      } else {
        return {
          success: false,
          error: 'Authentication cancelled or failed',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Biometric authentication failed',
      };
    }
  }

  async authenticateWithKeystore(options: AuthenticationOptions): Promise<BiometricResult> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        return {
          success: false,
          error: 'Biometric authentication not available',
        };
      }

      // Check if keystore key exists
      const { keysExist } = await this.rnBiometrics.biometricKeysExist();
      
      if (!keysExist) {
        // Create keystore key
        const { publicKey } = await this.rnBiometrics.createKeys();
        await EncryptedStorage.setItem(this.BIOMETRIC_PUBLIC_KEY, publicKey);
      }

      // Create signature challenge
      const challenge = this.generateChallenge();
      
      const { success, signature } = await this.rnBiometrics.createSignature({
        promptMessage: options.promptMessage,
        cancelButtonText: options.cancelButtonText || 'Cancel',
        payload: challenge,
      });

      if (success && signature) {
        return {
          success: true,
          signature,
        };
      } else {
        return {
          success: false,
          error: 'Authentication cancelled or failed',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Keystore authentication failed',
      };
    }
  }

  async storeBiometricCredentials(userId: string, organizationId?: string): Promise<void> {
    try {
      const credentials = {
        userId,
        organizationId,
        createdAt: new Date().toISOString(),
        platform: Platform.OS,
      };

      await EncryptedStorage.setItem(
        this.BIOMETRIC_CREDENTIALS_KEY,
        JSON.stringify(credentials)
      );
    } catch (error) {
      throw new Error('Failed to store biometric credentials');
    }
  }

  async getBiometricCredentials(): Promise<{ userId: string; organizationId?: string } | null> {
    try {
      const credentialsString = await EncryptedStorage.getItem(this.BIOMETRIC_CREDENTIALS_KEY);
      
      if (!credentialsString) {
        return null;
      }

      const credentials = JSON.parse(credentialsString);
      return {
        userId: credentials.userId,
        organizationId: credentials.organizationId,
      };
    } catch (error) {
      console.error('Failed to retrieve biometric credentials:', error);
      return null;
    }
  }

  async removeBiometricCredentials(): Promise<void> {
    try {
      await EncryptedStorage.removeItem(this.BIOMETRIC_CREDENTIALS_KEY);
      await EncryptedStorage.removeItem(this.BIOMETRIC_PUBLIC_KEY);
      
      // Delete biometric keys from keystore
      const { keysExist } = await this.rnBiometrics.biometricKeysExist();
      if (keysExist) {
        await this.rnBiometrics.deleteKeys();
      }
    } catch (error) {
      console.error('Failed to remove biometric credentials:', error);
      throw new Error('Failed to remove biometric credentials');
    }
  }

  async hasBiometricCredentials(): Promise<boolean> {
    try {
      const credentials = await this.getBiometricCredentials();
      return credentials !== null;
    } catch (error) {
      return false;
    }
  }

  async setupBiometricAuthentication(): Promise<string> {
    try {
      const { publicKey } = await this.rnBiometrics.createKeys();
      await EncryptedStorage.setItem(this.BIOMETRIC_PUBLIC_KEY, publicKey);
      return publicKey;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to setup biometric authentication');
    }
  }

  async getBiometricType(): Promise<string> {
    try {
      const { biometryType } = await this.rnBiometrics.isSensorAvailable();
      
      switch (biometryType) {
        case BiometryTypes.TouchID:
          return 'Touch ID';
        case BiometryTypes.FaceID:
          return 'Face ID';
        case BiometryTypes.Biometrics:
          return Platform.OS === 'android' ? 'Fingerprint' : 'Biometrics';
        default:
          return 'Biometric';
      }
    } catch (error) {
      return 'Biometric';
    }
  }

  private generateChallenge(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(7);
    return `${timestamp}-${random}`;
  }

  async canAuthenticate(): Promise<boolean> {
    try {
      const { available } = await this.rnBiometrics.isSensorAvailable();
      return available;
    } catch (error) {
      return false;
    }
  }

  async isEnrolled(): Promise<boolean> {
    try {
      const { available } = await this.rnBiometrics.isSensorAvailable();
      if (!available) {
        return false;
      }

      // For Android, we can check if there are enrolled biometrics
      if (Platform.OS === 'android') {
        // This is a simplified check; you might need additional platform-specific logic
        return available;
      }

      // For iOS, if biometric is available, it's generally enrolled
      return available;
    } catch (error) {
      return false;
    }
  }

  async authenticateWithFallback(options: AuthenticationOptions): Promise<BiometricResult> {
    try {
      // First try biometric authentication
      const biometricResult = await this.authenticate(options);
      
      if (biometricResult.success) {
        return biometricResult;
      }

      // If biometric fails and fallback is enabled, try device credentials
      if (options.fallbackPromptMessage) {
        const fallbackResult = await this.rnBiometrics.simplePrompt({
          promptMessage: options.fallbackPromptMessage,
          cancelButtonText: options.cancelButtonText || 'Cancel',
        });

        return {
          success: fallbackResult.success,
          error: fallbackResult.success ? undefined : 'Fallback authentication failed',
        };
      }

      return biometricResult;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Authentication failed',
      };
    }
  }

  async clearAllBiometricData(): Promise<void> {
    try {
      await this.removeBiometricCredentials();
      
      // Clear any additional biometric-related data
      await EncryptedStorage.removeItem('biometric_preferences');
      await EncryptedStorage.removeItem('biometric_setup_completed');
    } catch (error) {
      console.error('Failed to clear biometric data:', error);
    }
  }

  async setBiometricPreferences(preferences: {
    enabled: boolean;
    promptOnAppStart: boolean;
    fallbackToDeviceCredentials: boolean;
  }): Promise<void> {
    try {
      await EncryptedStorage.setItem(
        'biometric_preferences',
        JSON.stringify(preferences)
      );
    } catch (error) {
      throw new Error('Failed to save biometric preferences');
    }
  }

  async getBiometricPreferences(): Promise<{
    enabled: boolean;
    promptOnAppStart: boolean;
    fallbackToDeviceCredentials: boolean;
  } | null> {
    try {
      const preferencesString = await EncryptedStorage.getItem('biometric_preferences');
      
      if (!preferencesString) {
        return null;
      }

      return JSON.parse(preferencesString);
    } catch (error) {
      return null;
    }
  }
}

export const biometricService = new BiometricService();
export default biometricService;
