import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ThemeName } from '../theme';
import { useColorScheme } from 'react-native';
import useStorage from './useStorage';
import { ThemeMode } from '../providers/context';

interface CacheStore {
  theme: { name: ThemeName; mode: ThemeMode, deviceMode: ThemeMode };
}

export default function useCachedResources() {

  const storage = useStorage<CacheStore>();
  const deviceScheme = useColorScheme() as ThemeMode;

  const [initialized, setInitizlized] = useState(false);
  const [theme, setTheme] = useState({
    name: 'default' as ThemeName,
    mode: deviceScheme as ThemeMode,
    deviceMode: deviceScheme
  });

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {

    async function loadResourcesAndDataAsync() {

      try {

        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        // Get the stored theme.
        const storageTheme = await storage.get('theme');

        const loadedTheme = (storageTheme
          ? { ...theme, ...storageTheme }
          : { ...theme, name: 'default', mode: deviceScheme }) as CacheStore['theme'];

        // Color mode has changed at the device level 
        // update to match that change, we track the deviceScheme or
        // mode between inits so as not to override user preference
        // for ex: device is in dark mode but user wants light.
        if (storageTheme && storageTheme.mode !== deviceScheme && storageTheme.deviceMode !== deviceScheme)
          loadedTheme.mode = deviceScheme;


        // Update the theme in storage.
        await storage.set('theme', loadedTheme);
        setTheme(loadedTheme);

      }

      // We might want to provide this error 
      //information to an error reporting service
      catch (e) {
        console.warn(e);
      }

      finally {
        setInitizlized(true);
        SplashScreen.hideAsync();
      }

    }

    loadResourcesAndDataAsync();

  }, []);

  return { initialized, theme };
}
