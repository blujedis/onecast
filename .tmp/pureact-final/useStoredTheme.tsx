import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPureactStoredTheme, ThemeMode } from './types';
import { useColorScheme } from 'react-native';

export const useStoredTheme = (key = 'theme') => {

  const defaultConfig = {
    name: 'default',
    mode: 'light',
    deviceMode: 'light'
  } as Required<IPureactStoredTheme>;

  /**
   * Gets the stored theme config or returns default values.
   * 
   * @param config an optional config to use if none is yet stored.
   */
  const getStoredTheme = async (config?: IPureactStoredTheme) => {
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
      } as Required<IPureactStoredTheme>;
    }
    catch (ex) {
      console.error(ex);
      return def as Required<IPureactStoredTheme>;
    }
  };

  /**
   * Sets storage with the specified configuration.
   * 
   * @param config the configuration to be persisted to storage.
   */
  const setStoredTheme = async (config: IPureactStoredTheme) => {
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
  const initStoredTheme = async (config?: IPureactStoredTheme) => {
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