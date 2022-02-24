import { FC, PropsWithChildren } from 'react';
import { Switch, ViewStyle, View, StyleSheet, Platform } from 'react-native';
import withTheme from '../../theme/withTheme';

export interface ISwitchComponentProps {
  position?: 'top' | 'right' | 'bottom' | 'left';
  fullwidth?: boolean;
  enabled?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  onChange?: (value: boolean) => void | Promise<void>;
}

const stylesheet = StyleSheet.create({
  base: {
    display: 'flex'
  }
});

const SwitchComponent = withTheme<PropsWithChildren<ISwitchComponentProps>>((props) => {

  props = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { },
    style: {},
    position: 'left',
    ...props
  };

  const { position, onChange, enabled, style, fullwidth, children, disabled, theme } = props;

  const switchStyle = {
    ...style,
  };

  const switchProps = {
    trackColor: { false: theme?.colors.card, true: theme?.colors.primary },
    thumbColor: 'white',
    activeThumbColor: 'white' // needed for web otherwise is green.
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
      {...switchProps}
      style={switchStyle}
      onValueChange={onChange}
      value={enabled}
      disabled={disabled}
    />
  );

  if (!children)
    return <>{component}</>;

  const viewStyle: ViewStyle = { ...stylesheet.base };

  if (position) {
    if (['top', 'bottom'].includes(position))
      viewStyle.flexDirection = 'column';
    else
      viewStyle.flexDirection = 'row';
  }

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


});

export default SwitchComponent;