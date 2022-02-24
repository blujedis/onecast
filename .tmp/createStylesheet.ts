
/**
 * Creates a stylesheet with typed keys.
 * 
 * @param base optional initial base object.
 */
 export function createStylesheet<O extends Record<string, any>>(base = {} as O) {

  type TypedObject = O & {
    $extend: typeof extend,
    $toStylesheet: typeof toStylesheet
  }

  Object.defineProperties(base, {
    $extend: {
      enumerable: false,
      value: extend
    },
    $toStylesheet: {
      enumerable: false,
      value: toStylesheet
    }
  })

  function extend<K extends string, T extends Record<string, any>>( key: K, value: T): TypedObject & Record<K, T>;
  function extend<T extends Record<string, any>>( value: T): TypedObject & T;
  function extend<K extends string, T extends Record<string, any>>(key: K | T, value?: T) {
    if (arguments.length === 1)
      return { ...base, ...(key as T) };
    base[key as keyof O] = value as O[keyof O];
    return createStylesheet({ ...base });
  }

  function toStylesheet() {
    return StyleSheet.create(base) as O;
  }

  return base as TypedObject;

}
