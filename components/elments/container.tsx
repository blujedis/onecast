import { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export interface IContainerProps extends ViewProps {
  valign?: 'top' | 'center' | 'bottom';
  align?: 'left' | 'center' | 'right';
  margin?: string | number;
  padding?: string | number;
}

const POSITION_MAP = {
  top: 'flex-start',
  left: 'flex-start',
  right: 'flex-end',
  bottom: 'flex-end',
  center: 'center',
};

const stylesheet = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  }
});

const ContainerComponent: FC<IContainerProps> = (props) => {

  props = {
    valign: 'top',
    align: 'center',
    ...props
  };

  const { children, align, valign, margin, padding, style, ...rest } = props as Required<IContainerProps> & { children: ReactNode; };

  const alignItems = POSITION_MAP[align] as any;
  const justifyContent = POSITION_MAP[valign] as any;

  return (
    <View {...rest}
      style={[stylesheet.base, { alignItems, justifyContent, margin, padding }, style]}>
      {children}
    </View>
  );

};

export default ContainerComponent;