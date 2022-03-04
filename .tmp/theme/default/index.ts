import colors from './colors';
import base from '../base';
import components from './components';
import { mergeTheme } from '../utils';

const light = mergeTheme(base, {
  components: components.light,
  colors: colors.light
});

const dark = mergeTheme(base, {
  components: components.dark,
  colors: colors.dark
});

export default {
  light,
  dark
};