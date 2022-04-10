import { ThemeBase } from './types';
import baseTheme from './base';
import { ThemedProps } from './withTheme';
import { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';

type ExtendTheme = Partial<ThemeBase> & Record<string, any>;

type MergeObjectExtend<T extends Record<string, any> = Record<string, any>> = T & {
  _extend: <E extends Record<string, any>>(obj: E) => MergeObjectExtend<T & E>;
}

export type Shorthand_Name = keyof typeof SHORTHAND_MAP;

export const SHORTHAND_MAP = {
  margin: ['Top', 'Right', 'Bottom', 'Left'] as const,
  padding: ['Top', 'Right', 'Bottom', 'Left'] as const,
  borderWidth: ['TopWidth', 'RightWidth', 'BottomWidth', 'LeftWidth'] as const,
  borderColor: ['TopColor', 'RightColor', 'BottomColor', 'LeftColor'] as const,
  borderRadius: ['TopLeftRadius', 'TopRightRadius', 'BottomRightRadius', 'BottomLeftRadius'] as const
};

/**
 * Merges source into target object with optional extend for merging other values.
 * 
 * @param target the target to merge into.
 * @param source the source to merge from into target.
 */
 export const mergeObject = <T extends Record<string, any>, S extends Record<string, any>>(target2: T, source: S) => {

  const target = { ...target2 };

  for (const k in source as S & T) {
    const val = source[k];
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      if (typeof target[k] !== 'undefined' && (Array.isArray(target[k]) || typeof target[k] !== 'object')) {
        throw new Error(`Invalid target type for source value: "${val}"`);
      }
      target[k as keyof typeof target] = mergeObject(target[k] || {}, source[k]);
    }
    else {
      target[k as keyof typeof target] = source[k];
    }
  }
  const result = { ...target } as unknown as MergeObjectExtend<T & S>;
  
  Object.defineProperty(result, '_extend', {
    value: (obj: Record<string, any>) => mergeObject(result, obj),
    enumerable: false
  });

  return result;
}

export const mergeTheme = <T extends ThemeBase, E extends Partial<ExtendTheme>>(theme: T, extend: E) => {
  return mergeObject(theme, extend);
};

export const createTheme = <O extends Partial<ExtendTheme> = Partial<ExtendTheme>, B extends ThemeBase = typeof baseTheme> (
    dark = false, 
    overrides = {} as O,
    base?: B) => {
  const created = mergeTheme(base || baseTheme, overrides);
  const result = {
    mode: dark ? 'dark' : 'light',
    dark,
    ...created
  };
  return result;
};

export const expandProps = <P extends Record<string, any>>(props: ThemedProps<P>) => {
  const { children, ...clone } = props;
  const normalized = {} as any;
  const theme = props.theme;
  // Set border color to theme color may be overridden below 
  // or ignored if no borde width property is set.
  normalized.borderColor = theme?.colors.border;
  for (const k in clone) {
    const val = clone[k as keyof typeof clone] as any;
    if (!Array.isArray(val)) {
      normalized[k] = val;
    }
    else {
      let i = 0;
      delete clone[k as keyof typeof clone] // custom key remove from clone.
      for (const v of val) {
        const map = SHORTHAND_MAP[k as keyof typeof SHORTHAND_MAP];
        if (!map) continue;
        const key = k + map[i];
        i++
        if (typeof v === 'undefined' || v === null) continue;
        normalized[key] = v;
      }
    }
  }
  return { ...normalized, ...clone, children } as PropsWithChildren<ThemedProps<ViewStyle>>;
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