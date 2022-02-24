import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './providers/context';
import { RootSiblingParent } from 'react-native-root-siblings';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {

  const { initialized, theme } = useCachedResources();

  if (!initialized)
    return null;

  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme.name} mode={theme.mode}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </RootSiblingParent>
  );

}
