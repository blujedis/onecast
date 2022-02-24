import type { ThemeBase } from './base';
import defaultTheme from './default';

export type ThemeName = keyof typeof themes;

export type Theme = {
  name: ThemeName;
  dark: boolean;
  mode: string;
} & ThemeBase & typeof defaultTheme['light'];

export const themes = {
  default: defaultTheme
};

export const getTheme = (theme: ThemeName, mode: 'light' | 'dark') => {

  const result = {
    name: theme,
    dark: mode === 'dark',
    mode,
    ...themes[theme][mode]
  };

  return result;

};


