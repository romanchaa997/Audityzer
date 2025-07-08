
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const { theme } = useTheme();
  const logoScale = new Animated.Value(0.5);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    // Animate logo entrance
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoScale, logoOpacity, textOpacity]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    logoText: {
      fontSize: 32,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.primary,
      letterSpacing: -1,
    },
    titleContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold,
      color: '#FFFFFF',
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.typography.sizes.md,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginHorizontal: theme.spacing.lg,
    },
    versionContainer: {
      position: 'absolute',
      bottom: theme.spacing.xl,
      alignItems: 'center',
    },
    version: {
      fontSize: theme.typography.sizes.sm,
      color: 'rgba(255, 255, 255, 0.6)',
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>A</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: textOpacity,
          },
        ]}
      >
        <Text style={styles.title}>Audityzer</Text>
        <Text style={styles.subtitle}>
          Web3 Security Platform
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.versionContainer,
          {
            opacity: textOpacity,
          },
        ]}
      >
        <Text style={styles.version}>v1.0.0</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
