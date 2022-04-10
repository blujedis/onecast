import { FC, useState } from 'react';
// import { GalioProvider, useGalioTheme, theme as galioTheme } from 'galio-framework';
import { GalioProvider } from 'galio-framework';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { mergeObject, palette } from '../utils';
import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export type Theme = typeof defaultTheme;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface IThemeContext {
  mode: ThemeMode;
  current: typeof defaultTheme;
  toggle: () => void;
  setTheme: (theme: RecursivePartial<Theme>) => void
}

// export const schemes = {
//   default: palette.slate200 as ColorName,
//   primary: palette.indigo600 as ColorName,
//   secondary: palette.carbon600 as ColorName,
//   danger: palette.rose600 as ColorName,
//   warning: palette.yellow600 as ColorName,
//   info: palette.sky600 as ColorName,
//   success: palette.emerald600 as ColorName,
// };

const navThemeLight = {
  ...DefaultTheme,
  text: palette.slate700,
  card: palette.slate100,
  notification: palette.rose600,
  background: palette.slate50,
  border: palette.slate200,
  shadow: 'rgba(0,0,0, 0.3)',
  muted: palette.slate100
};

const navThemeDark = {
  ...DarkTheme,
  text: 'white',
  card: palette.carbon800, //  'rgb(40, 39, 56)',
  background: palette.carbon900, //  'rgb(23, 22, 30)',
  border: palette.carbon700, //  'rgb(85, 83, 124)',
  shadow: 'rgba(51,51,51,0.3)',
  muted: palette.carbon800
};

const colorsDark = {
  ...galioTheme.COLORS
};

const defaultTheme = mergeObject(galioTheme, {
  dark: false,
  colors: {
    ...navThemeLight
  },
  SIZES: {
    BASE: 18,
  },
  COLORS: {
    PRIMARY: '#4f46e5',
    THEME: '#3a3748'
  }
});

const getTheme = (mode: ThemeMode) => {
  if (mode === 'light') return defaultTheme as Theme;
  return {
    ...defaultTheme,
    dark: true,
    colors: navThemeDark,
    COLORS: {
      ...galioTheme.COLORS
    }
  } as Theme;
};

const Context = createContext({} as IThemeContext);

Context.displayName = 'ThemeContext';

const ThemeProvider: FC<{ mode: ThemeMode }> = ({ mode, children }) => {

  const [theme, setTheme] = useState(getTheme(mode));

  const getMode = () => theme.dark ? 'dark' : 'light';

  const ctx: IThemeContext = {
    get mode() { return getMode(); },
    current: theme,
    toggle: () => setTheme(getTheme(getMode())),
    setTheme: (value) => {
      setTheme(mergeObject(theme, value));
    }
  };

  return (
    <Context.Provider value={ctx}>
      <GalioProvider theme={theme}>
        {children}
      </GalioProvider>
    </Context.Provider>
  );

};

const useTheme = () => {
  return useContext(Context);
};

export {
  ThemeProvider,
  useTheme
};
