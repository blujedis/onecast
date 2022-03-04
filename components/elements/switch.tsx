import { Switch, SwitchProps } from 'react-native';
import withTheme from '../../theme/withTheme';
import { Theme } from '../../theme';
import { pickStyles } from '../../utils/object';

export interface ISwitchComponentProps extends SwitchProps {
  scheme?: keyof Theme['switch']['schemes'];
  variant?: keyof Theme['switch']['variants'];
}

const SwitchComponent = withTheme<ISwitchComponentProps>((props) => {

  props = {
    ...props
  };

  const { children, theme, scheme, style, variant, ...rest } = props;

  const switchStyles = pickStyles(theme?.switch, scheme, variant);

  const switchProps = {
    trackColor: { false: theme?.colors.card, true: theme?.colors.primary },
    thumbColor: 'white',
    activeThumbColor: 'white', // needed for web otherwise is green.
    ...rest
  };

  return (
    <Switch {...switchProps} style={[style]}>{children}</Switch>
  );

});

export default SwitchComponent;