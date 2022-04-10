
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { palette, config, html, ColorName } from './config';

export {
  ColorName
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type HtmlColor = typeof html;
export type HtmlColorName = keyof HtmlColor;
export type Palette = typeof palette;
export type PaletteName = keyof Palette;

export type Theme = typeof config;
export type PartialTheme<T extends Theme = Theme> = RecursivePartial<T>;
export type ThemeMode = 'light' | 'dark';
export type ThemeGroup<T extends Theme = Theme> = { light: T, dark: T };
export type ThemeNormalized<T extends Theme = Theme> = Omit<T, 'colors'> & { 
  colors: Record<keyof T['colors'], string> & Record<keyof T['schemes'], string> 
};

export type NamedStyles<T extends Record<string, any> = Record<string, any>> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type StylesFn = <T extends Theme>(theme: ThemeNormalized<T>) => NamedStyles;

export interface IPureactStoredTheme {
  name: string;
  mode: ThemeMode;
  deviceMode?: ThemeMode;
}

export interface IPureactOptions<T extends Theme = Theme> {
  theme?: T;
}

export interface IPureactContext<T extends Theme = Theme> {
  current: ThemeNormalized<T>;
  mode: ThemeMode;
  modify: (theme: RecursivePartial<T>) => ThemeNormalized<T>;
  replace:(theme: T) => ThemeNormalized<T>;
}