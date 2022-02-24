import { StyleProp } from 'react-native';
import merge from 'lodash.merge';


/**
 * Checks if object has own property by key name.
 *
 * @param obj the option to inspect for property.
 * @param key the key within the option to verify.
 */
export function hasOwn<T extends Record<string, unknown>>(obj: T, key: keyof T) {
  return Object.hasOwnProperty.call(obj, key);
}

/**
 * Checks if value is an object.
 *
 * @param value the value to inspect as object.
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}

/**
 * Cleans object removing undefined values. 
 * 
 * @param style the style prop object.
 * @param styles array of style prop objects.
 * @returns object with undefined values removed.
 */
export function cleanStyles<T = any>(style: StyleProp<T>, ...styles: StyleProp<T>[]): StyleProp<T>[];

/**
 * Cleans object removing undefined values. 
 * 
 * @param styles array of style prop objects.
 * @returns object with undefined values removed.
 */
export function cleanStyles<T = any>(styles: StyleProp<T>[]): StyleProp<T>[];

export function cleanStyles<T = any>(style: StyleProp<T> | StyleProp<T>[], ...styles: StyleProp<T>[]): StyleProp<T>[] {
  if (Array.isArray(style))
    styles = style as StyleProp<T>[];
  else
    styles.unshift(style);
  const filtered = styles
    .filter(s => {
      return (s !== null && s !== false && typeof s === 'object');
    }) as Omit<StyleProp<T>, 'Falsy'>[];
  return filtered.map(s => {
    return Object.keys(s).reduce((result, key) => {
      const val = s[key as keyof typeof s];
      if (typeof val !== 'undefined')
        result[key as keyof typeof s] = val;
      return result;
    }, {} as any)
  }) as StyleProp<T>[];
}

/**
 * Prepares style with base style returning as an array.
 * 
 * @param base the base styles from Stylesheet.create. 
 * @param style a style prop to be cleaned. 
 * @param styles array of style props to be cleaned. 
 * @returns an array of style prop. 
 */
export function prepareStyles<T = any>(base: Record<string, any> | Record<string, any>[], style: StyleProp<T> | StyleProp<T>[], ...styles: StyleProp<T>[]) {
  const cleaned = cleanStyles(style, ...styles);
  base = !Array.isArray(base) ? [base] : base;
  return [...base as StyleProp<T>[], ...cleaned] as StyleProp<T>[];
}

/**
 * Merges style objects into single object.
 * 
 * @param base the base style to merge to.
 * @param styles additional styles to merge from.
 * @returns merged style object.
 */
export function mergeStyles<T extends Record<string, any>>(...styles: StyleProp<T>[]) {
  const base = styles.shift();
  const cleaned = cleanStyles(base, ...styles);
  return merge(cleaned.shift(), ...cleaned);
}

/**
 * Usses array reduce to assign styles.
 * 
 * @param styles the styles to be assign.
 */
export function assignStyles<T extends Record<string, unknown>>(...styles: StyleProp<T>[]) {
  const base = styles.shift();
  const cleaned = cleanStyles(base, ...styles);
  return cleaned.reduce((a, c) => {
    if (isObject(c))
      a = { ...(a as Record<string, any>), ...(c as Record<string, any>) } as any;
    return a;
  }, {} as StyleProp<T>);
}

/**
 * Iterates a source object if a mapped key exists, replace the key with the new
 * specified mapped key from the map object.
 * 
 * @param source the source object to be remapped.
 * @param map the map to use for mapping to new key names.
 */
export function remap<T extends Record<string, any> = Record<string, any>>(source: Record<string, any>, map: Record<string, any>) {
  const mapKeys = Object.keys(map);
  return Object.keys(source).reduce((a, c) => {
    if (mapKeys.includes(c)) {
      const newKey = map[c];
      a[newKey as keyof T] = source[c];
    }
    else {
      a[c as keyof T] = source[c]
    }
    return a;
  }, {} as T);
}