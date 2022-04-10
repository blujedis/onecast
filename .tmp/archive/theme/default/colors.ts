import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import base from '../base';

const { colors } = base;

const colorsLight = {
  ...DefaultTheme.colors,
  text: colors.neutral700,
  background: colors.neutral100,
  border: colors.neutral400,
  primary: colors.indigo500,
};

const colorsDark = {
  ...DarkTheme.colors,
  text: 'white',
  card: 'rgb(40, 39, 56)',
  background: 'rgb(23, 22, 30)',
  border: 'rgb(85, 83, 124)',
  primary: colors.indigo500,
};

export default {
  light: colorsLight,
  dark: colorsDark
};
