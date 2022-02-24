import { createContext, FC, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeName, Theme } from '../theme';
import { getTheme } from '../theme';
import useStorage from '../hooks/useStorage';

export type ThemeMode = 'light' | 'dark';

export interface IContext {
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  setTheme: (name: ThemeName, mode?: ThemeMode) => void;
  // showToast: (message: string, variant?: any) => void;
  // hideToast: () => void;
}

export interface IContextOptions {
  theme?: ThemeName;
  mode?: ThemeMode;
}

const defaultState = {
  theme: getTheme('default', 'light'),
};

const Context =
  createContext<IContext>(defaultState as Required<IContext>);

Context.displayName = 'ThemeContext';

const ThemeProvider: FC<IContextOptions> = ({ theme: themeName, mode, children }) => {

  const initName = themeName || 'default';
  const deviceMode = useColorScheme();
  const initMode = mode || deviceMode || 'light';
  const storage = useStorage();

  const [theme, setTheme] = useState({ name: initName, mode: initMode });
  // const [toast, setToast] = useState({ } as {visible: boolean, message: string, variant?: string})

  const context: IContext = {
    get theme() {
      return getTheme(theme.name, theme.mode) as any;
    },
    setThemeMode: (mode) => {
      const newTheme = { name: theme.name, mode, deviceMode };
      setTheme(newTheme);
      storage.set('theme', newTheme);
    },
    setTheme: async (name, mode = theme.mode) => {
      const newTheme = { ...theme, name, mode, deviceMode }
      setTheme(newTheme);
      storage.set('theme', newTheme);
    }
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );

};

const useThemeContext = () => useContext(Context);

const useTheme = () => {
  return useThemeContext().theme;
}

export {
  ThemeProvider,
  useThemeContext,
  useTheme
};