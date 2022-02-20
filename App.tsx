import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './providers/theme';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {

  const { initialized, theme } = useCachedResources();

  if (!initialized)
    return null;

  return (
    <ThemeProvider theme={theme.name} mode={theme.mode}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </ThemeProvider>

  );

}
