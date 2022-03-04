import { mergeObject } from '../utils/object';
import { Theme, ThemeMode } from './types';
import type { ThemeName } from './';


const getTheme = (theme: ThemeName, mode: 'light' | 'dark') => {
  const result = {
    name: theme,
    dark: mode === 'dark',
    mode,
    ...themes[theme][mode]
  };
  return result;
};



const extendTheme = <T extends Theme, E extends Partial<Theme> & Record<string, any>>(theme: T, extend: E) => {
  return mergeObject(theme, extend);
};

/**
 * Expands a style object from theme breaking out into schemes, variants and base styles.
 * 
 * @param obj the styles object to expand.
 */
export const expandStyles = <S extends Record<string, any>>(obj = {} as S, scheme?: keyof S['schemes'], variant?: keyof S['variants']) => {
  obj = {
    variants: {} as Record<string, any>,
    ...obj
  };
  const { schemes, variants, ...base } = obj as Required<S>;
  const _scheme = (obj.schemes || {})[scheme as string] || {};
  const _variant = (obj.variants || {})[variant as string] || {};
  return {
    schemes,
    variants,
    scheme: _scheme,
    variant: _variant,
    base
  };
};

