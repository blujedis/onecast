import { createContext, FC, useContext, useState } from 'react';
import { useColorScheme} from 'react-native';
import { ThemeName, Theme } from '../theme';
import { getTheme } from '../theme';
import useStorage from '../hooks/useStorage';

export type ThemeMode = 'light' | 'dark';

export interface IThemeContext {
  name: ThemeName;
  theme: Theme;
  mode: ThemeMode;
  dark: boolean;
  setMode: (mode: ThemeMode) => void;
  setTheme: (name: ThemeName, mode?: ThemeMode) => void;
}

export interface IThemeOptions {
  theme?: ThemeName;
  mode?: ThemeMode;
}

const defaultState = {
  name: 'default' as ThemeName,
  theme: getTheme('default', 'light'),
  mode: 'light' as 'light' | 'dark',
  dark: false
};

const ThemeContext = 
  createContext<IThemeContext>(defaultState as Required<IThemeContext>);

ThemeContext.displayName = 'ThemeContext';

const ThemeProvider: FC<IThemeOptions> = ({ theme: themeName, mode, children }) => {

  const initName = themeName || 'default';
  const deviceMode = useColorScheme();
  const initMode = mode || deviceMode || 'light';
  const storage = useStorage();

  const [theme, setTheme] = useState({ name: initName, mode: initMode });

  const context: IThemeContext = {
    name: theme.name,
    mode: theme.mode,
    dark: theme.mode === 'dark',
    get theme() {
      return getTheme(theme.name, theme.mode);
    },
    setMode: (mode) => {
      const newTheme = { name: theme.name, mode };
      setTheme(newTheme);
      storage.set('theme', newTheme);
    },
    setTheme: async (name, mode = theme.mode) => {
      const newTheme = { ...theme, name, mode }
      setTheme(newTheme);
      storage.set('theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={context}>
      {children}
    </ThemeContext.Provider>
  );

};

const useThemeContext = () => useContext(ThemeContext);

const useTheme = () => {
  return useThemeContext().theme;
}

export {
  ThemeProvider,
  useThemeContext,
  useTheme
};