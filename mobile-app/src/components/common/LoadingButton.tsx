
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface LoadingButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  icon,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.lg,
    };

    // Size variations
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = theme.spacing.sm;
        break;
      case 'large':
        baseStyle.paddingVertical = theme.spacing.lg;
        break;
      default:
        baseStyle.paddingVertical = theme.spacing.md;
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = theme.colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.colors.primary;
        break;
      case 'danger':
        baseStyle.backgroundColor = theme.colors.error;
        break;
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: theme.typography.weights.semibold,
    };

    // Size variations
    switch (size) {
      case 'small':
        baseStyle.fontSize = theme.typography.sizes.sm;
        break;
      case 'large':
        baseStyle.fontSize = theme.typography.sizes.lg;
        break;
      default:
        baseStyle.fontSize = theme.typography.sizes.md;
    }

    // Variant text colors
    switch (variant) {
      case 'outline':
        baseStyle.color = theme.colors.primary;
        break;
      default:
        baseStyle.color = '#FFFFFF';
    }

    return baseStyle;
  };

  const getLoaderColor = (): string => {
    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const styles = StyleSheet.create({
    button: {
      ...getButtonStyle(),
      ...style,
    },
    text: {
      ...getTextStyle(),
      ...textStyle,
    },
    icon: {
      marginRight: theme.spacing.sm,
    },
    loader: {
      marginRight: theme.spacing.sm,
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getLoaderColor()}
          style={styles.loader}
        />
      ) : icon ? (
        <React.Fragment>
          <React.Fragment>{icon}</React.Fragment>
        </React.Fragment>
      ) : null}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LoadingButton;
