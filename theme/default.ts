import { DefaultTheme, DarkTheme } from '@react-navigation/native'

const navLight = {
  ...DefaultTheme.colors
};

const navDark = {
  ...DarkTheme.colors
};

const defaultTheme = {
  light: { nav: navLight },
  dark: { nav: navDark }
};

export default defaultTheme;
