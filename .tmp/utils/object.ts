import { StyleProp } from 'react-native';
import { isObject } from './is';

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