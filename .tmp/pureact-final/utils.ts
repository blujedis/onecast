import { config, palette, html } from './config';
import { Theme, PartialTheme, ThemeMode, ColorName, ThemeGroup, ThemeNormalized } from './types';

export const noop = (...args: any[]) => { return; };

/**
 * Merges source into target object with optional extend for merging other values.
 * 
 * @param target the target to merge into.
 * @param source the source to merge from into target.
 */
export const mergeObject = <T extends Record<string, any>, S extends Record<string, any>>(target: T, source: S, allowUndefined = false) => {
  const result = { ...target };
  for (const k in source as S & T) {
    const val = source[k];
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      if (typeof result[k] !== 'undefined' && (Array.isArray(result[k]) || typeof result[k] !== 'object')) {
        throw new Error(`Invalid target type for source value: "${val}"`);
      }
      result[k as keyof typeof result] = mergeObject(result[k] || {}, source[k]);
    }
    else if (allowUndefined && typeof source[k] === 'undefined' || typeof source[k] !== 'undefined') {
      result[k as keyof typeof result] = source[k];
    }
  }
  return result as T & S;
}

/**
 * Creates a theme, merging overrides while specifying mode type.
 * 
 * @param isDark indicates the theme is a dark mode theme.
 * @param extend values to extend to base theme.
 * @param base the theme to extend, if not specified uses default.
 */
export const createTheme = <C extends PartialTheme, B extends Theme = typeof config>(isDark = false, extend = {} as C, base = config as B) => {
  return mergeObject(base, { ...extend, dark: isDark });
};

/**
 * Gets a theme from themes objects by name and mode.
 * 
 * @param themes the object containing all themes.
 * @param name the name of the them to be picked.
 * @param mode the mode you wish to pick.
 */
export const getTheme = <T extends Record<string, ThemeGroup> & { default: ThemeGroup; }>(themes: T, name: keyof T, mode: ThemeMode) => {
  const root = themes[name] || themes.default;
  const theme = root[mode || 'light'];
  return theme;
}

/**
 * Converts an object of named colors to mapped values.
 * 
 * @param colors an object containing colors to convert to string.
 */
export function toColor<T extends Record<string, ColorName>>(colors: T): Record<keyof T, string>;

/**
 * Converts named color to mapped value.
 * 
 * @param color the named color to be converted.
 */
export function toColor(color: ColorName): string;
export function toColor(color: any) {
  if (typeof color === 'string')
    return ((html as any)[color] || (palette as any)[color] || color) as string;
  const result = {} as Record<string, string>;
  for (const k in color) {
    result[k] = toColor(color[k]) as any;
  }
  return result;
}

/**
 * Normalizes theme converting values as needed or ensuring defaults.
 * 
 * @param theme the theme to be normalized.
 */
export const normalizeTheme = <T extends Theme>(theme: T) => {
  const { colors: currentColors, schemes: currentSchemes, ...rest } = theme;
  const schemes = toColor(theme.schemes);
  const colors = { ...toColor(currentColors), ...schemes };
  return {
    schemes,
    colors,
    ...rest
  } as ThemeNormalized<T>;
};