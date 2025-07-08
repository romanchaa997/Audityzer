
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '@/types';

interface ThemeState {
  currentTheme: 'light' | 'dark' | 'system';
  isDarkMode: boolean;
  customTheme: Partial<Theme> | null;
}

const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#6D6D80',
    border: '#E5E5EA',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#30D158',
    info: '#007AFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#98989D',
    border: '#38383A',
    error: '#FF453A',
    warning: '#FF9F0A',
    success: '#32D74B',
    info: '#64D2FF',
  },
};

const initialState: ThemeState = {
  currentTheme: 'system',
  isDarkMode: false,
  customTheme: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.currentTheme = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setCustomTheme: (state, action: PayloadAction<Partial<Theme>>) => {
      state.customTheme = action.payload;
    },
    resetCustomTheme: (state) => {
      state.customTheme = null;
    },
  },
});

export const { setTheme, setDarkMode, setCustomTheme, resetCustomTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Theme selectors and helpers
export const selectCurrentTheme = (state: { theme: ThemeState }) => state.theme.currentTheme;
export const selectIsDarkMode = (state: { theme: ThemeState }) => state.theme.isDarkMode;
export const selectCustomTheme = (state: { theme: ThemeState }) => state.theme.customTheme;

export const getTheme = (state: { theme: ThemeState }): Theme => {
  const { isDarkMode, customTheme } = state.theme;
  const baseTheme = isDarkMode ? darkTheme : lightTheme;
  
  if (customTheme) {
    return {
      ...baseTheme,
      colors: { ...baseTheme.colors, ...customTheme.colors },
      spacing: { ...baseTheme.spacing, ...customTheme.spacing },
      typography: { ...baseTheme.typography, ...customTheme.typography },
      borderRadius: { ...baseTheme.borderRadius, ...customTheme.borderRadius },
    };
  }
  
  return baseTheme;
};
