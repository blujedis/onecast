import { CSSProperties } from 'react';
import 'react-native-svg';
// import 'galio-framework';


declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
  }
  export interface PathProps {
    style?: CSSProperties;
  }
}

// declare module 'galio-framework' {
//   export function useGalioTheme(): ThemeType
// }