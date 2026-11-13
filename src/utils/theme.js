import { useState, useEffect, useCallback } from 'react';

const THEME_STORAGE_KEY = 'tiku_portfolio_theme';
const THEME_CHANGE_EVENT = 'tiku-theme-change';

/**
 * Returns stored theme, strictly defaulting to 'light' as requested.
 */
export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('theme');
    if (saved === 'dark') return 'dark';
  } catch (e) {
    // Ignore storage restrictions
  }
  return 'light';
}

/**
 * Applies the given theme to document.documentElement
 */
export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark = theme === 'dark';

  if (isDark) {
    root.classList.add('dark');
    root.classList.remove('light');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem('theme', theme);
  } catch (e) {
    // Ignore storage errors
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
  }
}

/**
 * React hook for consuming and toggling theme across any component
 */
export function useTheme() {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    // Ensure initial theme is applied on mount
    applyTheme(theme);

    const handleThemeChange = (e) => {
      if (e?.detail && (e.detail === 'dark' || e.detail === 'light')) {
        setThemeState(e.detail);
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === THEME_STORAGE_KEY || e.key === 'theme') {
        const next = e.newValue === 'dark' ? 'dark' : 'light';
        setThemeState(next);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}

