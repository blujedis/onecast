import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextProvider } from './providers/context';
import { RootSiblingParent } from 'react-native-root-siblings';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { ThemeProvider } from './providers/theme';

export default function App() {

  const { initialized, storedTheme } = useCachedResources();

  if (!initialized)
    return null;

  return (
    <RootSiblingParent>
      <ContextProvider>
        <ThemeProvider mode={storedTheme.mode}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ThemeProvider>
      </ContextProvider>
    </RootSiblingParent>
  );

}
