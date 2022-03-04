import { ColorValue, ViewStyle, TextStyle } from 'react-native';

import type common from './base/common';
import type components from './base/components';
import type variants from './base/variants';
import type schemes from './base/schemes';

export type SchemeName = keyof typeof schemes;
export type VariantName = keyof typeof variants;
export type ComponentName = keyof typeof components;
export type ThemeMode = 'light' | 'dark';

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
  base?: S;
  props?:  Record<string, any>;
  variants?: ThemeVariant<S>;
}

export type ThemeBase = 
typeof common 
& Record<keyof typeof components, ThemeComponent> 
& {
  schemes: Record<string, ThemeScheme>;
}

export type Theme = ThemeBase & {
  name: string;
  dark: boolean;
  mode: ThemeMode;
}

const temp: Partial<ThemeBase> = {

    text: {
      base: {},
      props: {},
      variants: {
        props: {},
        style: {},
        schemes: {
          danger: {
            
          }
        }
      }
    }
  
}