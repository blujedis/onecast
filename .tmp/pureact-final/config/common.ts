import { ColorValue } from 'react-native';
import palette, { PaletteName } from './palette';
import { HTMLColorName } from './html';

export type ColorName = ColorValue | PaletteName | HTMLColorName;

const base = 16;

export const global = {
  base,
  elementHeight: base * 3,
  elevation: 1
};

// will be merged with colors below.
export const schemes = {
  default: palette.slate200 as ColorName,
  primary: palette.indigo600 as ColorName,
  secondary: palette.carbon600 as ColorName,
  danger: palette.rose600 as ColorName,
  warning: palette.yellow600 as ColorName,
  info: palette.sky600 as ColorName,
  success: palette.emerald600 as ColorName,
};

export const colors = {
  text: palette.slate700 as ColorName,
  card: palette.slate100 as ColorName,
  notification: palette.rose600 as ColorName,
  background: palette.slate50 as ColorName,
  border: palette.slate200 as ColorName,
  shadow: 'rgba(0,0,0, 0.3)' as ColorName,
  muted: palette.slate100
};

export const typography = {
  color: colors.text,
  xs: base * 0.65,
  sm: base * 0.75,
  body: base * 0.875,
  md: base * 0.875,
  lg: base,
  xl: base * 1.25,
  x2l: base * 1.5,
  x3l: base * 1.75,
  h1: base * 2.75,
  h2: base * 2.375,
  h3: base * 1.875,
  h4: base * 1.5,
  h5: base * 1.3125,
  h6: base * 1.125,
};

export const margin = {
  none: 0,
  xs: base * .25,
  sm: base * .5,
  md: base * .75,
  lg: base,
  xl: base * 1.25,
  x2l: base * 1.5,
  x3l: base * 1.75
};

export const padding = {
  ...margin
};

export const radius = {
  none: 0,
  xs: base * .125,
  sm: base * .25,
  md: base * .35,
  lg: base * .5,
  xl: base * .75,
  x2l: base,
  x3l: base * 1.25
};

export const icon = {
  xs: base * .5,
  sm: base * .75,
  md: base,
  lg: base * 1.5,
  xl: base * 1.75,
  x2l: base * 2,
  x3l: base * 2.25
}

export const input = {
  height: base * 3
};

export const button = {
  height: input.height,
  width: input.height * 1.6
};

export const shadow = {
  offset: { width: 1, height: 4 },
  opacity: 0.15,
  radius: 3
};




