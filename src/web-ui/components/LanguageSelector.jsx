import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAvailableLanguages, changeLanguage } from '../../core/localization/i18n';

/**
 * LanguageSelector component
 *
 * Displays a dropdown menu for selecting the application language
 * Uses the i18n translation system to apply changes throughout the app
 */
const LanguageSelector = ({ className = '', buttonClassName = '', dropdownClassName = '' }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languages = getAvailableLanguages();
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle language change
  const handleLanguageChange = langCode => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Language flags (Unicode flag emojis)
  const languageFlags = {
    en: '🇺🇸',
    de: '🇩🇪',
    es: '🇪🇸',
    fr: '🇫🇷',
    zh: '🇨🇳',
  };

  return (
    <div className={`language-selector relative ${className}`} ref={dropdownRef}>
      <button
        className={`language-selector-button flex items-center ${buttonClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="language-flag mr-2">{languageFlags[currentLanguage.code]}</span>
        <span className="language-name">{currentLanguage.name}</span>
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`language-dropdown absolute mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 ${dropdownClassName}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-selector"
        >
          <div className="py-1" role="none">
            {languages.map(language => (
              <button
                key={language.code}
                className={`language-option flex items-center w-full px-4 py-2 text-left ${
                  language.code === currentLanguage.code
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                role="menuitem"
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="language-flag mr-3">{languageFlags[language.code]}</span>
                <span className="language-name">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
