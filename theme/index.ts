import utils from './utils';
import base from './base';
import defaultTheme from './default';

export type ThemeName = keyof typeof themes;

export type Theme = {
  dark: boolean;
  mode: string;
  utils: typeof utils
} & typeof base & typeof defaultTheme['light'];

export const themes = {
  default: defaultTheme
};

export const getTheme = (theme: ThemeName, mode: 'light' | 'dark') => {
  return {
    dark: mode === 'dark',
    mode,
    utils,
    ...base,
    ...themes[theme][mode]
  };
};


