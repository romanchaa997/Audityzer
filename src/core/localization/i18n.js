/**
 * i18n.js - Internationalization setup for Web3FuzzForge
 *
 * This module sets up internationalization for the entire application
 * using i18next library to support multiple languages.
 */

import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../../locales/en/translation.json';
import deTranslation from '../../../locales/de/translation.json';
import esTranslation from '../../../locales/es/translation.json';
import frTranslation from '../../../locales/fr/translation.json';
import zhTranslation from '../../../locales/zh/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  de: {
    translation: deTranslation,
  },
  es: {
    translation: esTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

/**
 * Initialize i18next internationalization
 *
 * This configures:
 * - Language detection (browser, localStorage, querystring)
 * - Loading translations from JSON files
 * - Fallback language
 * - Debug mode (disabled by default)
 */
i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'preferredLanguage',
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: true,
    },
  });

/**
 * Changes the application language
 *
 * @param {string} lang - Language code to switch to (e.g., 'en', 'fr', 'es')
 * @returns {Promise} Promise that resolves when language change is complete
 */
export const changeLanguage = lang => {
  return i18next.changeLanguage(lang);
};

/**
 * Get the current language code
 *
 * @returns {string} Current language code
 */
export const getCurrentLanguage = () => {
  return i18next.language;
};

/**
 * Get available languages with their display names
 *
 * @returns {Array} Array of language objects with code and name
 */
export const getAvailableLanguages = () => {
  return [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
  ];
};

/**
 * Translate a key into the current language
 *
 * This is a convenience function for non-React environments
 * In React components, use the useTranslation hook from react-i18next
 *
 * @param {string} key - Translation key
 * @param {Object} options - Options for interpolation
 * @returns {string} Translated text
 */
export const t = (key, options = {}) => {
  return i18next.t(key, options);
};

export default i18next;
