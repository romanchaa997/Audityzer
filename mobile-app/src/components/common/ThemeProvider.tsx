
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/store';
import { setDarkMode, getTheme } from '@/store/slices/themeSlice';
import { Theme } from '@/types';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.theme);
  const theme = getTheme({ theme: themeState });

  const toggleTheme = () => {
    dispatch(setDarkMode(!themeState.isDarkMode));
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'system') => {
    // This would be implemented with a setTheme action
    if (mode === 'system') {
      const colorScheme = Appearance.getColorScheme();
      dispatch(setDarkMode(colorScheme === 'dark'));
    } else {
      dispatch(setDarkMode(mode === 'dark'));
    }
  };

  useEffect(() => {
    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeState.currentTheme === 'system') {
        dispatch(setDarkMode(colorScheme === 'dark'));
      }
    });

    return () => subscription?.remove();
  }, [themeState.currentTheme, dispatch]);

  useEffect(() => {
    // Update status bar style based on theme
    StatusBar.setBarStyle(
      themeState.isDarkMode ? 'light-content' : 'dark-content',
      true
    );
  }, [themeState.isDarkMode]);

  const contextValue: ThemeContextType = {
    theme,
    isDarkMode: themeState.isDarkMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
