import { ColorValue, ViewStyle, TextStyle } from 'react-native';
import type { defaultTheme } from './default';

import type common from './base/common';
import type components from './base/components';
import type variants from './base/variants';
import type schemes from './base/schemes';

export type ThemeCommon = typeof common;
export type SchemeName = keyof typeof schemes;
export type VariantName = keyof typeof variants;
export type ComponentName = keyof typeof components;
export type ThemeMode = 'light' | 'dark';
export type CommonBase = { [K in keyof ThemeCommon]: Partial<ThemeCommon[K]>; }

export type StyleProperty = string | number;
export type StylePropertyOrTuple = StyleProperty | [StyleProperty?, StyleProperty?, StyleProperty?, StyleProperty?];
export type ColorValueOrTuple = ColorValue | [ColorValue?, ColorValue?, ColorValue?, ColorValue?];
export type NumberOrTuple = number | [number?, number?, number?, number?];

export type Variant = TextStyle & ViewStyle & {
  margin: StylePropertyOrTuple;
  padding: StylePropertyOrTuple;
  borderColor: ColorValueOrTuple;
  borderWidth: NumberOrTuple;
}

export type ComponentStyle<S extends Record<string, any> = TextStyle & ViewStyle> = S & {
  margin: StylePropertyOrTuple;
  padding: StylePropertyOrTuple;
  borderColor: ColorValueOrTuple;
  borderWidth: NumberOrTuple;
}

export interface ThemeScheme {
  backgroundColor?: ColorValue;
  color?: ColorValue;
  borderColor?: ColorValueOrTuple;
}

export type ThemeVariant<S extends Record<string, any> = Record<string, any>> = {
  props?: Record<string, any>;
  style?: S;
  schemes?: Record<string, ThemeScheme>;
}

export interface ThemeComponent<S extends Record<string, any> = Record<string, any>> {
  style?: S;
  props?:  Record<string, any>;
  variants?: ThemeVariant<S>;
}

export type ThemeBase = 
CommonBase
& Record<keyof typeof components, ThemeComponent> 
& {
  schemes: Record<string, ThemeScheme>;
}

export type Theme = ThemeBase & {
  dark: boolean;
  mode: ThemeMode;
}

export type ThemeGroup = { light: Theme, dark: Theme };

export type Themes = Record<string, ThemeGroup> & { default: typeof defaultTheme };

export interface IContext<T> {
  current: Theme;
  setMode: (mode: ThemeMode) => void;
  setTheme: (name: keyof T, mode?: ThemeMode) => void;
}

export interface IContextOptions<T> {
  theme?: keyof T;
  mode?: ThemeMode;
}

export interface IThemeState<T = Themes> {
  name: keyof T;
  mode: ThemeMode;
  deviceMode: ThemeMode;
}