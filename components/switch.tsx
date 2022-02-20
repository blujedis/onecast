import { StyleProp, Switch, ViewStyle, View, StyleSheet } from 'react-native';
import { FC, ReactNode } from 'react';

export interface ISwitchComponentProps {
  position?: 'top' | 'right' | 'bottom' | 'left';
  fullwidth?: boolean;
  enabled?: boolean;
  style?: ViewStyle;
  onChange?: (value: boolean) => void | Promise<void>;
}

const stylesheet = StyleSheet.create({
  base: {
    display: 'flex'
  }
});

const SwitchComponent: FC<ISwitchComponentProps> = (props: ISwitchComponentProps) => {

  props = {
    onChange: () => { },
    style: {},
    position: 'left',
    ...props
  };

  const { position, onChange, enabled, style, fullwidth, children } = props as Required<ISwitchComponentProps> & { children?: ReactNode; };

  const switchStyle = {
    ...style
  };

  const margin = 4;

  if (position === 'left')
    switchStyle.marginRight = margin;
  else if (position === 'right')
    switchStyle.marginLeft = margin;
  else if (position === 'top')
    switchStyle.marginBottom = margin;
  else
    switchStyle.marginTop = margin;

  const component = (
    <Switch
      style={switchStyle}
      onValueChange={onChange}
      value={enabled}
    />
  );

  if (!children)
    return <>{component}</>;

  const viewStyle: ViewStyle = { ...stylesheet.base };

  if (['top', 'bottom'].includes(position))
    viewStyle.flexDirection = 'column';
  else
    viewStyle.flexDirection = 'row';

  if (fullwidth) {
    viewStyle.flexGrow = 1;
    viewStyle.width = '100%';
  }

  if (position === 'left' || position === 'bottom')
    return (
      <View style={viewStyle}>
        {component}
        {children}
      </View>
    );

  return (
    <View style={viewStyle}>
      {children}
      {component}
    </View>
  );


};

export default SwitchComponent;