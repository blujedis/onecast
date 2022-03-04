import { ViewProps, StyleSheet, View, Platform } from 'react-native';
import withTheme from '../../theme/withTheme';

export interface IDividerComponentProps extends ViewProps {
  mode?: 'horizontal' | 'vertical';
}

const baseMargin = 8;

const stylesheet = StyleSheet.create({
  horizontal: {
    marginTop: baseMargin,
    marginBottom: Platform.OS === 'android' ? baseMargin : baseMargin * 2.5,
    height: 1
  },
  vertical: {
    marginLeft: 8,
    marginRight: 8,
    width: 1
  }
});

const DividerComponent = withTheme<IDividerComponentProps>((props) => {
  props = {
    mode: 'horizontal',
    ...props
  };
  const { theme, mode, style, ...rest } = props;
  const base = mode === 'horizontal' ? stylesheet.horizontal : stylesheet.vertical;
  return (
    <View {...rest} style={[base, { backgroundColor: theme?.colors.border }]} />
  );
});

export default DividerComponent;