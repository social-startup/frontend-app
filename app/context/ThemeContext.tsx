import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { colors as lightColors } from '../../styles/colors';

export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  colors: typeof lightColors;
  spacing: (value: number) => number;
  toggleTheme: () => void;
};

const darkColors = {
  ...lightColors,
  primary: '#7f8fff',
  primaryLight: '#d8e2ff',
  primaryLighter: '#e9ecff',
  textDark: '#fff',
  textWhite: '#000',
  textMuted: '#aaa',
  backgroundWhite: '#111',
  backgroundLight: '#1f1f2a',
  borderLight: '#333',
};

const baseTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  spacing: (value: number) => value * 8,
  toggleTheme: () => {},
};

const ThemeContext = createContext<Theme>(baseTheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const value = useMemo(() => {
    const colors = mode === 'dark' ? darkColors : lightColors;
    return {
      mode,
      colors,
      spacing: (value: number) => value * 8,
      toggleTheme: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
