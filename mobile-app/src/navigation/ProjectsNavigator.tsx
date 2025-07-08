
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProjectsStackParamList } from '@/types';

// Screens
import ProjectsListScreen from '@/screens/projects/ProjectsListScreen';
import ProjectDetailsScreen from '@/screens/projects/ProjectDetailsScreen';
import CreateProjectScreen from '@/screens/projects/CreateProjectScreen';
import ScanResultsScreen from '@/screens/projects/ScanResultsScreen';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

const ProjectsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProjectsList"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="ProjectsList"
        component={ProjectsListScreen}
        options={{
          title: 'Projects',
        }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{
          title: 'Project Details',
        }}
      />
      <Stack.Screen
        name="CreateProject"
        component={CreateProjectScreen}
        options={{
          title: 'Create Project',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="ScanResults"
        component={ScanResultsScreen}
        options={{
          title: 'Scan Results',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProjectsNavigator;
