import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * ThemeToggle component
 *
 * Provides a toggle button to switch between light and dark themes
 * Manages theme preference in localStorage and respects system preference
 */
const ThemeToggle = ({ className = '', iconOnly = false }) => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }

      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }

    // Default to light
    return 'light';
  });

  // Apply theme class to document when theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove old theme class
    root.classList.remove('light-theme', 'dark-theme');

    // Add new theme class
    root.classList.add(`${theme}-theme`);

    // Store in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={t('settings.theme')}
      title={t('settings.theme')}
      className={`theme-toggle flex items-center focus:outline-none ${className}`}
    >
      {theme === 'light' ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          {!iconOnly && <span className="ml-2">{t('settings.themes.dark')}</span>}
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
          {!iconOnly && <span className="ml-2">{t('settings.themes.light')}</span>}
        </>
      )}
    </button>
  );
};

// Component for adding theme toggle to settings page
export const ThemeSelector = () => {
  const { t } = useTranslation();

  return (
    <div className="theme-selector mb-6">
      <h3 className="text-lg font-medium mb-2">{t('settings.theme')}</h3>
      <div className="flex flex-col space-y-2">
        <ThemeToggle className="w-full justify-between p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition" />

        {/* System preference option could be added here */}
      </div>
    </div>
  );
};

export default ThemeToggle;
