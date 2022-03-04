import { PropsWithChildren, ReactElement } from 'react';
import { Theme } from './';
import { useTheme } from '../providers/context';

export type SimpleComponent<P extends Record<string, any> = Record<string, any>> =
  (props: PropsWithChildren<P>) => ReactElement<any, any> | null;

export type ThemedProps<P extends Record<string, any>> = P & PropsWithChildren<{ theme?: Theme }>;

function withTheme<P extends Record<string, any>>(component: SimpleComponent<ThemedProps<P>>) {
  const Component = component as any;
  const WrappedComponent = (props: ThemedProps<P>) => {
    const theme = useTheme();
    //  const mergedTheme = extend ? merge(theme, extend) : theme;
    const newProps = { ...props, theme };
    return <Component {...newProps} /> as ReturnType<typeof component>;
  };
  return WrappedComponent;
}

export default withTheme;