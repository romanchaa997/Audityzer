
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux
import { useAppDispatch, useAppSelector } from '@/store';
import { login, loginWithBiometric, clearError } from '@/store/slices/authSlice';

// Services
import { biometricService } from '@/services/biometric/biometricService';

// Hooks
import { useTheme } from '@/hooks/useTheme';

// Components
import LoadingButton from '@/components/common/LoadingButton';
import FormInput from '@/components/common/FormInput';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { isLoading, error, biometricEnabled } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organizationSlug: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
    
    // Clear any previous errors
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const checkBiometricAvailability = async () => {
    try {
      const available = await biometricService.isAvailable();
      const hasCredentials = await biometricService.hasBiometricCredentials();
      setBiometricAvailable(available && hasCredentials);
    } catch (error) {
      console.error('Failed to check biometric availability:', error);
    }
  };

  const handleLogin = async () => {
    try {
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please enter both email and password');
        return;
      }

      await dispatch(login(formData)).unwrap();
      // Navigation is handled by RootNavigator based on auth state
    } catch (error: any) {
      Alert.alert('Login Failed', error || 'Please check your credentials and try again');
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const credentials = await biometricService.getBiometricCredentials();
      if (!credentials) {
        Alert.alert('Error', 'No biometric credentials found');
        return;
      }

      await dispatch(loginWithBiometric(credentials)).unwrap();
    } catch (error: any) {
      Alert.alert('Biometric Login Failed', error || 'Please try again or use your password');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register' as never);
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      justifyContent: 'center',
    },
    logo: {
      width: 120,
      height: 120,
      alignSelf: 'center',
      marginBottom: theme.spacing.xl,
    },
    title: {
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    form: {
      marginBottom: theme.spacing.lg,
    },
    inputContainer: {
      marginBottom: theme.spacing.md,
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordToggle: {
      position: 'absolute',
      right: theme.spacing.md,
      top: theme.spacing.md,
      zIndex: 1,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: theme.spacing.lg,
    },
    forgotPasswordText: {
      color: theme.colors.primary,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
    },
    loginButton: {
      marginBottom: theme.spacing.md,
    },
    biometricButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.lg,
    },
    biometricButtonText: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      marginLeft: theme.spacing.sm,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: theme.spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
      marginHorizontal: theme.spacing.md,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: theme.spacing.lg,
    },
    footerText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
    },
    registerLink: {
      color: theme.colors.primary,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      marginLeft: theme.spacing.xs,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.sizes.sm,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Logo */}
          <Image
            source={require('@/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Header */}
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to your Audityzer account
          </Text>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Login Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <FormInput
                placeholder="Email Address"
                value={formData.email}
                onChangeText={(email) => setFormData({ ...formData, email })}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <FormInput
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(password) => setFormData({ ...formData, password })}
                  secureTextEntry={!showPassword}
                  leftIcon="lock"
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={navigateToForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <LoadingButton
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />
          </View>

          {/* Biometric Login */}
          {biometricAvailable && (
            <>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.biometricButton}
                onPress={handleBiometricLogin}
                disabled={isLoading}
              >
                <Icon
                  name="fingerprint"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text style={styles.biometricButtonText}>
                  Use Biometric Authentication
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
