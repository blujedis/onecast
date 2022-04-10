import { createTheme } from '../utils';
import { palette } from '../config';

export const defaultTheme = {
  light: createTheme(),
  dark: createTheme(true, {
    colors: {
      text: 'white',
      card: palette.carbon800, //  'rgb(40, 39, 56)',
      background: palette.carbon900, //  'rgb(23, 22, 30)',
      border: palette.carbon700, //  'rgb(85, 83, 124)',
      shadow: 'rgba(51,51,51,0.3)',
      muted: palette.carbon800
    }
  })
};
