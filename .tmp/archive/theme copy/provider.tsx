import { createContext, FC, useContext as useReactContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { defaultTheme } from './default';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, IContext, IContextOptions, ThemeMode, ThemeGroup, IThemeState } from './types';

export function createProvider<T extends Record<string, ThemeGroup> & { default?: typeof defaultTheme }>(initThemes = {} as T, storageKey = 'theme') {

  const themes = {
    default: defaultTheme,
    ...initThemes
  };

  const setStoredTheme = async (theme: string | IThemeState<T>) => {
    try {
      if (typeof theme !== 'string')
        theme = JSON.stringify(theme);
      await AsyncStorage.setItem(storageKey, theme);
      return true;
    }
    catch (ex) {
      console.log(ex);
      return false;
    }
  };

  const getStoredTheme = async (def?: IThemeState<T>) => {
    const theme = await AsyncStorage.getItem(storageKey);
    const deviceMode = useColorScheme() as ThemeMode;
    const defTheme = def || {
      name: 'default',
      mode: deviceMode === 'dark' ? 'dark' : 'light',
      deviceMode: deviceMode
    } as IThemeState<T>;
    try {
      if (theme) {
        const parsed = JSON.parse(theme || '');
        return {
          ...defTheme,
          ...parsed
        } as IThemeState<T>;
      }
      return defTheme;
    }
    catch (ex) {
      console.log(ex);
      return defTheme;
    }
  };

  const ensureStoredTheme = async (def?: IThemeState<T>) => {
    const theme = await getStoredTheme(def);
    await setStoredTheme(theme);
    return theme;
  };

  const getTheme = (key: keyof T, mode: ThemeMode) => {
    return themes[key][mode];
  };

  const Context =
    createContext<IContext<T>>(null as any);

  Context.displayName = 'ThemeContext';

  const ThemeProvider: FC<IContextOptions<T>> = (props) => {

    props = {
      theme: 'default',
      mode: 'light',
      ...props
    };

    const { theme: themeName, mode: themeMode, children } = props;

    const deviceMode = useColorScheme();

    const [theme, setTheme] = useState({
      name: themeName || 'default',
      mode: themeMode || deviceMode || 'light',
      deviceMode
    } as IThemeState<T>);

    const context: IContext<T> = {

      get current() {
        return themes[theme.name][theme.mode] as Theme
      },

      setMode: (mode) => {
        const newTheme = { name: theme.name, mode, deviceMode } as IThemeState<T>;
        setTheme(newTheme);
        setStoredTheme(newTheme);
      },

      setTheme: async (name, mode = theme.mode) => {
        const newTheme = { ...theme, name, mode, deviceMode } as IThemeState<T>;
        setTheme(newTheme);
        setStoredTheme(newTheme);
      }

    };

    return (
      <Context.Provider value={context}>
        {children}
      </Context.Provider>
    );

  };

  const useTheme = () => useReactContext(Context);

  return {
    Context,
    ThemeProvider,
    useTheme,
    setStoredTheme,
    getStoredTheme,
    ensureStoredTheme,
    getTheme
  };

}