import { forwardRef, ForwardRefExoticComponent, FC } from 'react';
import { useTheme } from './provider';
import { ThemeNormalized } from './types';
import { noop } from './utils';

type StylesFn = <T extends ThemeNormalized>(theme: T) => Record<string, any>;

export const withPureact = <P extends Record<string, any>, S extends StylesFn = StylesFn>(
  ComponentRef: FC<P> | ForwardRefExoticComponent<P>, stylesFn?: S) => {
    type Ref = ReturnType<typeof ComponentRef>;
  const Component = forwardRef<Ref, P>((initProps, ref) => {
    const theme = { ...useTheme().current };
    const styles = (stylesFn || noop)(theme) as ReturnType<S>;
    const props = {
      ...initProps,
      theme,
      styles,
      ref
    };
    return <ComponentRef { ...props} />;
  });
  Component.displayName = ComponentRef.name;
  return Component;
};

