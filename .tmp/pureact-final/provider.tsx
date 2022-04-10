import { createContext, useContext, useState, PropsWithChildren, ForwardRefExoticComponent, FC, forwardRef } from 'react';

import { IPureactContext, IPureactOptions, ThemeMode, Theme, RecursivePartial, ThemeNormalized, StylesFn } from './types';
import { mergeObject } from '../../utils/object';
import { normalizeTheme } from './utils';
import { defaultTheme } from './themes';

const ThemeContext = createContext({} as IPureactContext);
ThemeContext.displayName = 'PureactContext';

function ThemeProvider(props: PropsWithChildren<IPureactOptions>) {

  props = {
    theme: defaultTheme.light,
    ...props
  };

  const { children, theme: initTheme } = props as Required<PropsWithChildren<IPureactOptions>>;

  const [activeTheme, setActiveTheme] = useState(normalizeTheme(initTheme));

  const ctx: IPureactContext = {

    current: activeTheme,

    mode: (activeTheme.dark ? 'dark' : 'light') as ThemeMode,

    modify: (theme) => {
      const newTheme = mergeObject(activeTheme, theme);
      const normalized = normalizeTheme(newTheme) as unknown as ThemeNormalized;
      setActiveTheme(normalized);
      return normalized;
    },

    replace: (theme) => {
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
  useTheme
};





