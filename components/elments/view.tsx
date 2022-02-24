import { View, ViewProps } from 'react-native';
import withTheme from '../../theme/withTheme';
import { cleanStyles } from '../../utils/object';

export interface IViewComponentProps extends ViewProps {
  width?: string | number;
  height?: string | number;
}

const ViewComponent = withTheme<IViewComponentProps>((props) => {
  props = {
    width: '100%',
    ...props
  }
  const { children, width, height, style, ...rest } = props;
  const defaults = cleanStyles({ width, height });
  return (
    <View {...rest} style={[defaults, style]}>
      {children}
    </View>
  );
});

export default ViewComponent;