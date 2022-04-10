import { ThemeScheme, Variant } from "../providers/theme";

export type MergeObjectExtend<T extends Record<string, any> = Record<string, any>> = T & {
  _extend: <E extends Record<string, any>>(obj: E) => MergeObjectExtend<T & E>;
}

const EXPAND_TUPLES = {
  margin: ['Top', 'Right', 'Bottom', 'Left'] as const,
  padding: ['Top', 'Right', 'Bottom', 'Left'] as const,
  borderColor: ['Top', 'Right', 'Bottom', 'Left'] as const,
  borderWidth: ['Top', 'Right', 'Bottom', 'Left'] as const,
  borderRadius: ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'] as const
};

const EXPANDABLE_PROPS = Object.keys(EXPAND_TUPLES);


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
 * Iterates a source object if a mapped key exists, replace the key with the new
 * specified mapped key from the map object.
 * 
 * @param source the source object to be remapped.
 * @param map the map to use for mapping to new key names.
 */
export function remapObject<T extends Record<string, any> = Record<string, any>>(source: Record<string, any>, map = {} as Record<string, any>) {
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

/**
 * Iterates through object styles expanding styles defined by arrays.
 * 
 * @param obj the object to be exapnded. 
 */
export const expandProps = <S extends Record<string, any>>(obj: S) => {
  for (const k in obj) {

    if (!hasOwn(obj, k)) continue;

    const val = obj[k] as any;

    if (val !== null && !Array.isArray(val) && typeof val === 'object') {
      obj[k] = expandProps(val);
    }

    else if (EXPANDABLE_PROPS.includes(k) && Array.isArray(val)) {

      (val as (string | number)[]).forEach((v, i) => {
        const splitKey = k.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')
        const prefix = splitKey[0];
        const suffix = splitKey[1] || '';
        const newKey = (prefix + EXPAND_TUPLES[k as keyof typeof EXPAND_TUPLES][i] + suffix) as keyof typeof obj;
        obj[newKey] = v as any;
      });

      delete obj[k];

    }

  }

  return obj;

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


