
import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  showLogo = true,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: theme.spacing.xl,
    },
    spinner: {
      marginBottom: theme.spacing.md,
    },
    message: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginHorizontal: theme.spacing.lg,
    },
  });

  return (
    <View style={styles.container}>
      {showLogo && (
        <View style={styles.logo}>
          {/* Logo would go here */}
        </View>
      )}
      
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.spinner}
      />
      
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default LoadingScreen;
