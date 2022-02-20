import { useState } from 'react';
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

const useColorScheme = ()=> {

  const deviceMode = _useColorScheme();
  const [mode, setMode]= useState(deviceMode);

  return {
    deviceMode,
    mode: mode as NonNullable<ColorSchemeName>,
    setMode
  };

};

export default useColorScheme;
