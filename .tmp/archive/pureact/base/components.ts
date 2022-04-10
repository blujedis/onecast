
import common from './common';
import schemes from './schemes';
import variants from './variants';

const { colors, global } = common;

const page = {
  base: {
    margin: 0 as StylePropertyOrTuple,
    padding: [50, 20, 50, 20] as StylePropertyOrTuple,
  },
  variants: {}
};

const text = {
  base: {
    ...common.font,
    backgroundColor: colors.transparent,
    color: colors.text,
  },
  variants: {
    ...variants
  }
};

const view = {
  base: {
    backgroundColor: colors.transparent,
  },
  variants: {
    ...variants
  }
};

const button = {
  base: {
    ...schemes.default,
    borderWidth: 1,
    padding: [0, 14, 0, 14],
    height: global.elementHeight,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
    fontVariant: ['small-caps'],
    letterSpacing: .75,
  },
  variants: {
    ...variants
  }
};

const _switch = {
  base: {},
  variants: {
    ...variants
  }
};

const input = {
  base: {
    height: global.elementHeight,
    padding: [0, 8, 0, 8],
    backroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.border,
  },
  variants: {
    ...variants
  }
};

const image = {
  base: {},
  props: {
    resizeMethod: 'auto',
    resizeMode: 'cover'
  },
  variants: {}
};

const toast = {
  base: {},
  props: {},
  variants: {}
};

export default {
  page,
  text,
  view,
  button,
  switch: _switch,
  input,
  image,
  toast
};