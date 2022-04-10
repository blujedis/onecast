import { CSSProperties } from 'react';
import { View, ViewProps } from 'react-native';

export type PropertyType = string | number | undefined;
export type PropertyTypeTuple = [PropertyType?, PropertyType?, PropertyType?, PropertyType?];

const propertyTuple = ['Top', 'Right', 'Bottom', 'Left'] as const;

export interface BaseProps {

  display?: CSSProperties['display'];
  position?: CSSProperties['position'];
  flex?: CSSProperties['flex'];
  flexBasis?: CSSProperties['flexBasis'];
  flexDirection?: CSSProperties['flexDirection'];
  flexFlow?: CSSProperties['flexFlow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexWrap?: CSSProperties['flexWrap'];

  other?: ViewProps['style']

  width?: PropertyType;
  height?: PropertyType;
  minWidth?: PropertyType;
  maxWidth?: PropertyType;
  minHeight?: PropertyType;
  maxHeight?: PropertyType;
  margin?: PropertyType | PropertyTypeTuple;
  padding?: PropertyType | PropertyTypeTuple;
  marginTop?: PropertyType;
  marginRight?: PropertyType;
  marginBottom?: PropertyType;
  marginLeft?: PropertyType;
  paddingTop?: PropertyType;
  paddingRight?: PropertyType;
  paddingBottom?: PropertyType;
  paddingLeft?: PropertyType;

}

export const BASE_PROPS = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'margin', 'padding', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] as const;

export const normalizeStyles = <S extends Record<string, any>>(styles: S) => {
  const result = {} as any;
  for (const k in styles) {
    const val = styles[k];
    if (Array.isArray(val))
      val.forEach((v, i) => {
        result[k + propertyTuple[i]] = v
      });
    else
      result[k] = styles[k];
  }
  return result as S;
};

export const expandProps = <S extends Record<string, any>>(obj: S) => {
  type AllKeys = keyof S;
  type ExcludedKeys = Exclude<AllKeys, keyof BaseProps>
  type PickedStyles = Record<Extract<AllKeys, keyof BaseProps>, PropertyType>;
  type ExcludedProps = { [K in ExcludedKeys]: S[K] };
  const styles = {} as any;
  const options = {} as any;
  const normalized = normalizeStyles(obj);
  for (const k in normalized) {
    if (typeof normalized[k] === 'undefined') continue;
    if (BASE_PROPS.includes(k as any))
      styles[k] = normalized[k];
    else
      options[k] = normalized[k];
  }
  return {
    styles,
    options
  } as { styles: PickedStyles, options: ExcludedProps }
};
