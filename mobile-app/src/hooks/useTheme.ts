
import { useAppSelector } from '@/store';
import { getTheme } from '@/store/slices/themeSlice';
import { Theme } from '@/types';

export const useTheme = (): { theme: Theme; isDarkMode: boolean } => {
  const themeState = useAppSelector((state) => state.theme);
  const theme = getTheme({ theme: themeState });
  
  return {
    theme,
    isDarkMode: themeState.isDarkMode,
  };
};
