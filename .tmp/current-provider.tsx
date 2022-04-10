import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { IPureactContext, IPureactOptions, PartialTheme, Theme, ThemeMode } from './types';
import { mergeObject } from '../utils/object';
import { themes } from './themes';
import { normalizeTheme } from './utils';

const ThemeContext = createContext({} as IPureactContext);
ThemeContext.displayName = 'PureactContext';

function ThemeProvider(props: PropsWithChildren<IPureactOptions>) {

  props = {
    theme: themes?.default.light,
    ...props
  };

  const { children, theme: initTheme } = props as Required<PropsWithChildren<IPureactOptions>>;

  const [activeTheme, setActiveTheme] = useState(normalizeTheme(initTheme));

  const ctx = {

    current: activeTheme,

    mode: (activeTheme.dark ? 'dark' : 'light') as ThemeMode,

    modify: (theme: PartialTheme) => {
      const newTheme = mergeObject(activeTheme, theme);
      const normalized = normalizeTheme(newTheme);
      setActiveTheme(normalized);
      return normalized;
    },

    replace: (theme: Theme) => {
      const normalized = normalizeTheme(theme);
      setActiveTheme(normalized);
      return normalized;
    }

  };

  return (
    <ThemeContext.Provider value={ctx}>
      {children}
    </ThemeContext.Provider>
  );

}

const useTheme = () => {
  return useContext(ThemeContext);
};

export {
  ThemeContext,
  ThemeProvider,
  useTheme,
};
