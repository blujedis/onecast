import { ThemeNormalized } from '../types';
import { FC } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { withPureact } from '../withPureact';
import { BaseProps } from './types';

type Styles = ReturnType<typeof styles>;
type StyleBaseProps = Record<keyof Styles, boolean>;

export interface IRENAMEProps extends  ViewProps, StyleBaseProps {

}

const RENAMEComponent: FC<IRENAMEProps> = (props) => {

};

const styles = (theme: ThemeNormalized) => StyleSheet.create({});

export const RENAME = withPureact(RENAMEComponent);