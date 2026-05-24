import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('routinerush_theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem('routinerush_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const themeClasses = {
    body: isDark
      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800',
    header: isDark
      ? 'bg-slate-900/95 border-blue-500/10'
      : 'bg-white/95 border-indigo-200/50',
    card: isDark
      ? 'bg-white/5 border-white/10 hover:border-blue-500/30'
      : 'bg-white/80 border-indigo-200/30 hover:border-indigo-400/50',
    cardStatic: isDark
      ? 'bg-white/5 border-white/10'
      : 'bg-white/80 border-indigo-200/30',
    input: isDark
      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-rose-500/50'
      : 'bg-white border-indigo-200 text-slate-800 placeholder-slate-500 focus:border-indigo-500/50',
    button: isDark
      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600',
    accent: isDark ? 'text-blue-400' : 'text-indigo-600',
    muted: isDark ? 'text-slate-300' : 'text-slate-600',
    sidebar: isDark
      ? 'bg-slate-900/90 border-r border-blue-500/10'
      : 'bg-white/80 border-indigo-200/50',
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
