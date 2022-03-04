
import { mergeObject } from '../utils/object';
import base from './base';

const { colors } = base;

const defaultDark = mergeObject(base, {
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
    schemes: {
      default: {
        backgroundColor: colors.carbon700,
        color: colors.white,
        borderColor: colors.carbon700,
      }
    }
  },
  toast: {}
});


export default {
  light: base,
  dark: defaultDark
};