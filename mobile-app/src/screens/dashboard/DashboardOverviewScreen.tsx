
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchProjects } from '@/store/slices/projectSlice';
import { fetchVulnerabilities, fetchVulnerabilityStatistics } from '@/store/slices/vulnerabilitySlice';

// Hooks
import { useTheme } from '@/hooks/useTheme';
import { useAnalytics } from '@/services/analytics/AnalyticsProvider';

// Components
import LoadingScreen from '@/components/common/LoadingScreen';

const DashboardOverviewScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { trackScreenView } = useAnalytics();

  const { user } = useAppSelector((state) => state.auth);
  const { currentOrganization } = useAppSelector((state) => state.organization);
  const { projects, isLoading: projectsLoading } = useAppSelector((state) => state.project);
  const { statistics, isLoading: vulnerabilitiesLoading } = useAppSelector((state) => state.vulnerability);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    trackScreenView('Dashboard Overview');
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      await Promise.all([
        dispatch(fetchProjects({ page: 1, pageSize: 5 })).unwrap(),
        dispatch(fetchVulnerabilityStatistics()).unwrap(),
      ]);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const navigateToProjects = () => {
    navigation.navigate('Projects' as never, { screen: 'ProjectsList' } as never);
  };

  const navigateToSecurity = () => {
    navigation.navigate('Security' as never, { screen: 'VulnerabilityList' } as never);
  };

  const navigateToReports = () => {
    navigation.navigate('Reports' as never, { screen: 'ReportsList' } as never);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: theme.spacing.md,
    },
    header: {
      marginBottom: theme.spacing.lg,
    },
    greeting: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    subGreeting: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.textSecondary,
    },
    statsContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.lg,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      marginRight: theme.spacing.sm,
      alignItems: 'center',
    },
    statCardLast: {
      marginRight: 0,
    },
    statValue: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    statLabel: {
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    sectionContainer: {
      marginBottom: theme.spacing.lg,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.text,
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    seeAllText: {
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.primary,
      marginRight: theme.spacing.xs,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -theme.spacing.xs,
    },
    quickActionCard: {
      width: '48%',
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      margin: theme.spacing.xs,
      alignItems: 'center',
    },
    quickActionIcon: {
      marginBottom: theme.spacing.sm,
    },
    quickActionText: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.text,
      textAlign: 'center',
    },
    emptyState: {
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    emptyStateText: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  if (projectsLoading || vulnerabilitiesLoading) {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}!
          </Text>
          <Text style={styles.subGreeting}>
            {currentOrganization?.name || 'Your Organization'}
          </Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{projects.length}</Text>
            <Text style={styles.statLabel}>Active Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{statistics.critical + statistics.high}</Text>
            <Text style={styles.statLabel}>Critical Issues</Text>
          </View>
          <View style={[styles.statCard, styles.statCardLast]}>
            <Text style={styles.statValue}>{statistics.resolved}</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={navigateToProjects}>
              <Icon
                name="folder-plus"
                size={32}
                color={theme.colors.primary}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>New Project</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={navigateToSecurity}>
              <Icon
                name="shield-search"
                size={32}
                color={theme.colors.primary}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>Security Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={navigateToSecurity}>
              <Icon
                name="bug"
                size={32}
                color={theme.colors.primary}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>View Issues</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={navigateToReports}>
              <Icon
                name="file-chart"
                size={32}
                color={theme.colors.primary}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Projects */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={navigateToProjects}>
              <Text style={styles.seeAllText}>See All</Text>
              <Icon name="chevron-right" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          {projects.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No projects yet. Create your first project to get started.
              </Text>
            </View>
          ) : (
            <View>
              {projects.slice(0, 3).map((project) => (
                <TouchableOpacity
                  key={project.id}
                  style={styles.quickActionCard}
                  onPress={() => navigation.navigate('Projects' as never, {
                    screen: 'ProjectDetails',
                    params: { projectId: project.id }
                  } as never)}
                >
                  <Text style={styles.quickActionText}>{project.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardOverviewScreen;
