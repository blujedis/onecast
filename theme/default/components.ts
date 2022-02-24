import base from '../base';

const { colors } = base;

const toast = {
  light: {

    default: {
      backgroundColor: colors.zinc200,
      color: colors.zinc600
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
    }

  },

  dark: {

    default: {
      backgroundColor: colors.slate700,
      color: colors.slate100
    },
    error: {
      backgroundColor: colors.rose700,
      color: colors.rose100
    },
    warning: {
      backgroundColor: colors.amber700,
      color: colors.amber100
    },
    success: {
      backgroundColor: colors.emerald700,
      color: colors.emerald100
    },
    info: {
      backgroundColor: colors.sky700,
      color: colors.sky100
    }

  }

};

export default {
  light: {
    toast: toast.light
  },
  dark: {
    toast: toast.dark
  }
};