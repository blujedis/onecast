import base from './default';

export type ThemeName = keyof typeof themes;

const themes = {
  default: defaultTheme
};





export {
  ThemeName,
  themes,
  getTheme,
  extendTheme
};

export * from './types';

