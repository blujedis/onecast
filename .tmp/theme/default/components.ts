import base from '../base';
import themeColors from './colors';

const { colors } = base;

const DEFAULT_ELEMENT_HEIGHT = 46;

const variants = {
  light: {
    primary: {
      backgroundColor: colors.indigo200,
      color: colors.indigo600
    },
    default: {
      backgroundColor: colors.zinc200,
      color: colors.zinc600,
    },
    error: {
      backgroundColor: colors.rose200,
      color: colors.rose600
    },
    warning: {
      backgroundColor: colors.amber200,
      color: colors.amber600
    },
    success: {
      backgroundColor: colors.green200,
      color: colors.green600
    },
    info: {
      backgroundColor: colors.sky200,
      color: colors.sky600
    },
    ghost: {
      color: colors.zinc600,
      borderColor: colors.zinc700,
      borderWidth: 1
    }
  },
  dark: {
    primary: {
      backgroundColor: colors.indigo700,
      color: colors.indigo100
    },
    default: {
      backgroundColor: colors.slate700,
      color: colors.slate100
    },
    error: {
      backgroundColor: colors.rose700,
      color: colors.rose100
    },
    warning: {
      backgroundColor: colors.amber600,
      color: colors.amber100
    },
    success: {
      backgroundColor: colors.emerald700,
      color: colors.emerald100
    },
    info: {
      backgroundColor: colors.sky700,
      color: colors.sky100
    },
    ghost: {
      color: colors.slate100,
      borderColor: colors.slate500,
      borderWidth: 1
    }
  }
};

const toast = {
  light: {
    ...variants.light
  },
  dark: {
    ...variants.dark
  }
};

const buttonBase = {
  borderRadius: 4,
  paddingLeft: 10,
  paddingRight: 10,
  borderWidth: 1,
  borderColor: colors.slate500,
  height: DEFAULT_ELEMENT_HEIGHT,
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '700',
  fontVariant: 'small-caps',
  letterSpacing: .75,
};

const button = {
  light: {
    primary: {
      ...buttonBase,
      ...variants.light.primary,
      borderColor: colors.indigo400,
    },
    default: {
      ...buttonBase,
      ...variants.light.default,
      borderColor: colors.zinc400,
    },
    error: {
      ...buttonBase,
      ...variants.light.error,
      borderColor: colors.rose400,
    },
    warning: {
      ...buttonBase,
      ...variants.light.warning,
      borderColor: colors.amber400,
    },
    success: {
      ...buttonBase,
      ...variants.light.success,
      borderColor: colors.emerald400,
    },
    info: {
      ...buttonBase,
      ...variants.light.info,
      borderColor: colors.sky400,
    },
    ghost: {
      ...buttonBase,
      ...variants.light.ghost,
      backgroundColor: 'transparent',
      borderColor: colors.zinc400,
    }
  },
  dark: {
    primary: {
      ...buttonBase,
      ...variants.dark.primary,
      borderColor: colors.indigo400,
    },
    default: {
      ...buttonBase,
      ...variants.dark.default,
      borderColor: colors.slate400,
    },
    error: {
      ...buttonBase,
      ...variants.dark.error,
      borderColor: colors.rose400,
    },
    warning: {
      ...buttonBase,
      ...variants.dark.warning,
      borderColor: colors.amber400,
    },
    success: {
      ...buttonBase,
      ...variants.dark.success,
      borderColor: colors.emerald400,
    },
    info: {
      ...buttonBase,
      ...variants.dark.info,
      borderColor: colors.sky400,
    },
    ghost: {
      ...buttonBase,
      ...variants.dark.ghost,
      backgroundColor: 'transparent',
      borderColor: colors.slate400,
    }
  }
};

const input = {
  light: {

  },
  dark: {

  }
}

export default {
  light: {
    toast: toast.light,
    button: button.light
  },
  dark: {
    toast: toast.dark,
    button: button.dark
  }
};