import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {

  const { isLoadingComplete, storedTheme } = useCachedResources();

  if (!isLoadingComplete)
    return null;

  return (
    <SafeAreaProvider>
      <Navigation theme={storedTheme.theme} mode={storedTheme.mode} />
      <StatusBar />
    </SafeAreaProvider>
  );


}
