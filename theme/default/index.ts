import colors from './colors';
import base from '../base';
import components from './components';

const light = {
  ...base,
  ...components.light,
  colors: { ...base.colors, ...colors.light },
};

const dark = {
  ...base,
  ...components.dark,
  colors: { ...base.colors, ...colors.dark }
};

export default {
  light,
  dark
};