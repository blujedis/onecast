import { useState } from 'react';
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
const useColorScheme = (overrideMode?: 'light' | 'dark')=> {
  const [mode, setMode]= useState(overrideMode || _useColorScheme());
  return {
    mode: mode as NonNullable<ColorSchemeName>,
    setMode
  };
};

export default useColorScheme;
