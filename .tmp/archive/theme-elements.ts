import { ThemeProvider, createTheme, useTheme as useThemeBase, useThemeMode, ThemeMode, CreateThemeOptions } from '@rneui/themed';

type ThemeName = keyof typeof themes;

const defaultTheme = {
  // colors: {
  //   primary: '#6366f1',
  //   secondary: '#8b5cf6',
  //   error: '#f43f5e',
  //   warning: '#f59e0b',
  //   success: '#10b981',
  // }
} as CreateThemeOptions;


const themes = {
  default: defaultTheme
};

const useTheme = () => {
  const { updateTheme, theme: currentTheme, replaceTheme } = useThemeBase();
  const currentMode = useThemeMode();
  return {
    mode: currentMode,
    theme: currentTheme,
    setTheme: (theme: ThemeName, mode = currentMode) => {
      const config = themes[theme];
      replaceTheme({ ...config, mode });
    },
    setMode: (mode: ThemeMode) => updateTheme({ mode }),
    toggleMode: () => updateTheme((theme) => ({
      mode: theme.mode === 'light' ? 'dark' : 'light',
    }))
  }
};

const getTheme = (name: ThemeName, mode = 'light' as ThemeMode) => {
  const theme = createTheme({
    ...themes[name],
    mode
  });
  return theme;
}

export {
  ThemeMode,
  ThemeName,
  ThemeProvider,
  useTheme,
  useThemeMode,
  getTheme,
  themes
};