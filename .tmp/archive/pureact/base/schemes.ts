/**
 * This file includes base color variants.
 */
import { ThemeScheme } from '../types';
import common from './common';

const { colors } = common;

const _default = {
  backgroundColor: colors.slate200,
  color: colors.text,
  borderColor: colors.slate300,
} as ThemeScheme;

const primary = {
  backgroundColor: colors.primary,
  color: colors.indigo50,
  borderColor: colors.primary,
} as ThemeScheme;

const secondary = {
  backgroundColor: colors.violet600,
  color: colors.violet50,
  borderColor: colors.violet700,
} as ThemeScheme;

const danger = {
  backgroundColor: colors.rose600,
  color: colors.rose50,
  borderColor: colors.rose700,
} as ThemeScheme;

const warning = {
  backgroundColor: colors.yellow500,
  color: colors.yellow50,
  borderColor: colors.yellow600,
} as ThemeScheme;

const success = {
  backgroundColor: colors.emerald600,
  color: colors.emerald50,
  borderColor: colors.emerald700,
} as ThemeScheme;

const info = {
  backgroundColor: colors.sky600,
  color: colors.sky50,
  borderColor: colors.sky700,
} as ThemeScheme;

const schemes = {
  default: _default,
  primary,
  secondary,
  danger,
  warning,
  success,
  info,
};

export default schemes;