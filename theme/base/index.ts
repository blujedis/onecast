import colors from './colors';
import size from './size';

export type ThemeBase = typeof theme;

const theme = {
  page: {
    margin: 0,
    padding: 0,
  },
  colors,
  ...size
};
export default theme;