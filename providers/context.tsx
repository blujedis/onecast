import { createContext, FC, useContext as useReactContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeName, Theme } from '../theme';
import { getTheme } from '../theme';
import useStorage from '../hooks/useStorage';

export type ThemeMode = 'light' | 'dark';

export type CastType = 'chromecast' | 'airplay';

export interface IContext {
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  setTheme: (name: ThemeName, mode?: ThemeMode) => void;
  cast: undefined | null | { type: CastType, uri: string };
  setCast: (type?: CastType, uri?: string) => void;
  updateCast: (uri: string) => void;
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
  const [cast, setCast] = useState(null as null | undefined | { type: CastType, uri: string });

  const context: IContext = {
    get theme() {
      return getTheme(theme.name, theme.mode);
    },
    get cast() {
      return cast;
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
    },
    setCast: (type?: CastType, uri?: string) => {
      if (type && uri)
        setCast({ type, uri })
      else
        setCast(null);
    },
    updateCast: (uri: string) => {
      if (cast && cast.type)
        setCast({ ...cast, uri });
    }
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );

};

const useContext = () => useReactContext(Context);

const useTheme = () => {
  return useContext().theme;
}

export {
  ThemeProvider,
  useContext,
  useTheme
};