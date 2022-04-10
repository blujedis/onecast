import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useStoredTheme } from '../.tmp/pureact-final';

export default function useCachedResources() {

  const storedTheme = useStoredTheme('theme');
  const [initialized, setInitizlized] = useState(false);
  const [initTheme, setInitTheme] = useState(storedTheme.default);

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

        const config = await storedTheme.init();
        setInitTheme(config);

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

  return { initialized, storedTheme: initTheme };

}
