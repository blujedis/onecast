import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark';
export interface IStoredTheme {
  name: string;
  mode: ThemeMode;
  deviceMode: ThemeMode;
}

export const useStoredTheme = (key = 'theme') => {

  const defaultConfig = {
    name: 'default',
    mode: 'light',
    deviceMode: 'light'
  } as Required<IStoredTheme>;

  /**
   * Gets the stored theme config or returns default values.
   * 
   * @param config an optional config to use if none is yet stored.
   */
  const getStoredTheme = async (config?: IStoredTheme) => {
    const storedConfig = await AsyncStorage.getItem(key);
    const def = {
      ...defaultConfig,
      ...config
    };
    def.deviceMode = (def.deviceMode || useColorScheme()) as ThemeMode;
    try {
      return {
        ...def,
        ...JSON.parse(storedConfig || '{}')
      } as Required<IStoredTheme>;
    }
    catch (ex) {
      console.error(ex);
      return def as Required<IStoredTheme>;
    }
  };

  /**
   * Sets storage with the specified configuration.
   * 
   * @param config the configuration to be persisted to storage.
   */
  const setStoredTheme = async (config: IStoredTheme) => {
    const storedConfig = {
      ...defaultConfig,
      ...config,
    };
    storedConfig.deviceMode = (storedConfig.deviceMode || useColorScheme()) as ThemeMode;
    try {
      await AsyncStorage.setItem(key, JSON.stringify(storedConfig))
      return true;
    }
    catch (ex) {
      console.error(ex);
      return false;
    }
  };

  /**
   * Ensures storage contains a theme configuration object.
   * 
   * @param config optional config to initialize with.
   */
  const initStoredTheme = async (config?: IStoredTheme) => {
    const storedTheme = await getStoredTheme(config);
    setStoredTheme(storedTheme);
    return storedTheme;
  };

  return {
    default: defaultConfig,
    get: getStoredTheme,
    set: setStoredTheme,
    init: initStoredTheme
  };

};