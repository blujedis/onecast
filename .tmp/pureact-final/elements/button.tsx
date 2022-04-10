import { ThemeNormalized } from '../types';
import { FC, PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { withPureact } from '../withPureact';

type Styles = ReturnType<typeof styles>;
type StyleBaseProps = Record<keyof Styles, boolean>;

export interface IButtonProps extends TouchableOpacityProps, StyleBaseProps {

}

export const Button = withPureact(
  (props: PropsWithChildren<IButtonProps>) => {


    return (
      <TouchableOpacity>

      </TouchableOpacity>
    );

  },
  (theme) => {

    const schemes = Object.keys(theme.schemes).reduce((a, c) => {
      a = a || {};
      a[c] = {
        backgroundColor: theme.schemes[c as keyof typeof theme.schemes]
      }
    }, {} as any) as Record<keyof typeof theme.schemes, { backgroundColor: string }>;
  
    return StyleSheet.create({
      ...schemes
    });

  });