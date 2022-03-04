import { View, ViewProps } from 'react-native';
import withTheme from '../../theme/withTheme';
import { Theme } from '../../theme';
import { pickStyles } from '../../utils/object';

export interface IViewComponentProps extends ViewProps {
  scheme?: keyof Theme['schemes'];
  variant?: keyof Theme['view']['variants'];
}

const ViewComponent = withTheme<IViewComponentProps>((props) => {
  const { children, theme, style, scheme, variant, ...rest } = props;

  const viewStyles = pickStyles(theme?.view, scheme, variant);

  return (
    <View {...rest} style={[viewStyles, style]}>
      {children}
    </View>
  );

});

export default ViewComponent;