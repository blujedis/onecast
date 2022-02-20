import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ThemeName } from '../theme';
import useColorScheme from './useColorScheme';
import useStorage from './useStorage';

export default function useCachedResources() {

  const storage = useStorage();
  const scheme = useColorScheme();

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [storedTheme, setStoredTheme] = useState({ theme: 'default' as ThemeName, mode: scheme.mode });


  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {

    async function loadResourcesAndDataAsync() {

      try {

        storage.setDefaults({
          theme: 'default'
        });

        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        const themeStr = await storage.get('theme');

        if (themeStr) {
          const [theme, mode] = themeStr.split(':');
          console.log(theme, mode);
          setStoredTheme({ theme, mode: mode || scheme.mode });
        }

      }

      catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }

      finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }

    }

    loadResourcesAndDataAsync();

  }, []);

  return { isLoadingComplete, storedTheme };
}
