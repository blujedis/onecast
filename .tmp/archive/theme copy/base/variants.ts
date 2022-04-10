import { Variant, StylePropertyOrTuple } from '../types';
import common from './common';

const { colors } = common;

const filled = {};

const outlined = {
  borderWidth: [1, 1, 1, 1] as StylePropertyOrTuple,
  backgroundColor: colors.transparent
} as Variant;

const underlined = {
  backgroundColor: colors.transparent,
  borderWidth: [0, 0, 1, 0] as StylePropertyOrTuple,
  borderRadius: [0, 0, 0, 0] as StylePropertyOrTuple
} as Variant;

const link = {
  borderWidth: [0, 0, 0, 0] as StylePropertyOrTuple,
  backgroundColor: colors.transparent,
} as Variant;

const variants = {
  filled,
  outlined,
  underlined,
  link
};

export default variants;