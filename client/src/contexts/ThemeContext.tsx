import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'ocean';

type ThemeContextType = {
  theme: ThemeMode;
  cycleTheme: (theme?: ThemeMode) => void;
  isPremiumMode: boolean;
  togglePremiumMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_ORDER: ThemeMode[] = ['light', 'dark', 'ocean'];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme') as ThemeMode;
    return saved && THEME_ORDER.includes(saved) ? saved : 'dark';
  });

  const [isPremiumMode, setIsPremiumMode] = useState(() => {
    const saved = localStorage.getItem('premiumMode');
    return saved === 'true';
  });

  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove('light', 'dark', 'ocean');
    // Add current theme class
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isPremiumMode) {
      document.documentElement.classList.add('premium-mode');
    } else {
      document.documentElement.classList.remove('premium-mode');
    }
    localStorage.setItem('premiumMode', String(isPremiumMode));
  }, [isPremiumMode]);

  const cycleTheme = (newTheme?: ThemeMode) => {
    if (newTheme && THEME_ORDER.includes(newTheme)) {
      setTheme(newTheme);
    } else {
      const currentIndex = THEME_ORDER.indexOf(theme);
      const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
      setTheme(THEME_ORDER[nextIndex]);
    }
  };

  const togglePremiumMode = () => {
    setIsPremiumMode(!isPremiumMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, isPremiumMode, togglePremiumMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
