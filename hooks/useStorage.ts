import AsyncStorage from '@react-native-async-storage/async-storage';
import { promise } from '../utils/async';

function useStorage<T extends Record<string, any>>() {

  const handleError = (err: Error) => {
    console.log(err);
  };

  const stringify = (value: any) => {
    try {
      return JSON.stringify(value);
    }
    catch (err) {
      handleError(err as Error);
      return '';
    }
  };

  const parseify = (value: any) => {
    try {
      return JSON.parse(value);
    }
    catch (err) {
      return;
    }
  };

  const getMulti = async <K extends keyof T>(...keys: Extract<K, string>[]) => {
    const result = await promise(AsyncStorage.multiGet(keys));
    if (result.err) {
      return [] as T[K][];
    }
    return (result.data || []).map(v => parseify(v)) as T[K][];
  };

  const get = async <K extends keyof T>(key: Extract<K, string>) => {
    const result = await promise(AsyncStorage.getItem(key));
    return parseify(result.data) as T[K];
  };

  const set = async (key: Extract<keyof T, string>, value: any) => {
    const result = await promise(AsyncStorage.setItem(key, stringify(value)));
    if (result.err) {
      handleError(result.err);
      return false;
    }
    return true;
  };

  const remove = async <K extends keyof T>(key: Extract<K, string>) => {
    const result = await promise(AsyncStorage.removeItem(key));
    if (result.err) {
      handleError(result.err);
      return false;
    }
    return true;
  };

  const clear = async () => AsyncStorage.clear();

  const setDefaults = async (defaults = {} as T, replace = false) => {
    for (const k in defaults) {
      if (replace) {
        await set(k, defaults[k]);
      }
      else {
        const value = await get(k);
        if (typeof value === 'undefined') {
          await set(k, value);
        }
      }
    }
  };

  return {
    clear,
    stringify,
    parseify,
    getMulti,
    get,
    set,
    remove,
    setDefaults
  };

}

export default useStorage;