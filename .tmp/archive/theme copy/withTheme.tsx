import { PropsWithChildren, ReactElement } from 'react';
import { Theme } from './types';
import { useTheme } from '../../providers/context';

export type WithThemeComponent<P extends Record<string, any> = Record<string, any>> =
  (props: PropsWithChildren<P>) => ReactElement<any, any> | null;

export type ThemedProps<P extends Record<string, any>> = P & PropsWithChildren<{ theme?: Theme }>;

export function withTheme<P extends Record<string, any>>(component: WithThemeComponent<ThemedProps<P>>) {
  const Component = component as any;
  const WrappedComponent = (props: ThemedProps<P>) => {
    const theme = useTheme();
    const newProps = { ...props, theme };
    return <Component {...newProps} /> as ReturnType<typeof component>;
  };
  return WrappedComponent;
}

