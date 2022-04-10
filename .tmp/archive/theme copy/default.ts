
import base from './base';
import { createTheme } from './utils';

const { colors } = base;

const defaultLight = createTheme();

const defaultDark = createTheme(true,
  {
    colors: {
      text: 'white',
      card: colors.carbon800, //  'rgb(40, 39, 56)',
      background: colors.carbon900, //  'rgb(23, 22, 30)',
      border: colors.carbon700, //  'rgb(85, 83, 124)',
      primary: colors.indigo600,
      notification: colors.rose600
    },
    text: {},
    view: {},
    switch: {},
    input: {},
    button: {
      style: {
        backgroundColor: colors.carbon700,
        color: colors.white,
        borderColor: colors.carbon700,
      },
      props: {},
      variants: {
        props: {},
        style: {},
        schemes: {
          danger: {

          }
        }
      }
    },
    toast: {}
  });

export const defaultTheme = {
  light: defaultLight,
  dark: defaultDark
};
