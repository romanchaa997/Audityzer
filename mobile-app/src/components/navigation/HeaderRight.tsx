
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/store';

const HeaderRight: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { unreadCount } = useAppSelector((state) => state.notification);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: theme.spacing.sm,
    },
    iconButton: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.sm,
    },
    notificationBadge: {
      position: 'absolute',
      top: -2,
      right: -2,
      backgroundColor: theme.colors.error,
      borderRadius: 8,
      minWidth: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications' as never);
  };

  const handleTenantSelectorPress = () => {
    navigation.navigate('TenantSelector' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleTenantSelectorPress}
      >
        <Icon
          name="domain-switch"
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleNotificationsPress}
      >
        <Icon
          name="bell-outline"
          size={24}
          color={theme.colors.text}
        />
        {unreadCount > 0 && (
          <View style={styles.notificationBadge}>
            {/* Badge content would go here */}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
