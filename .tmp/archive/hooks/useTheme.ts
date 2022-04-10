import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import useColorScheme from './useColorScheme';
import useStorage from './useStorage';
import { ThemeName, Theme, getTheme } from '../theme';

/**
 * Gets a theme by name and variant.
 * 
 * @param name the theme name to be used.
 * @param mode allows override of color mode.
 * @returns an object of them props by component name.
 */
export const useTheme = (name: ThemeName = 'default', mode?: ColorSchemeName) => {
  const scheme = useColorScheme();
  const storage = useStorage();
  const baseTheme = getTheme(name, mode || scheme.mode) as Theme;
  const theme = {
    name,
    ...baseTheme
  }
  return {
    theme
  };
};
