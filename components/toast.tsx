import Toast, { ToastProps } from 'react-native-root-toast';
import { Theme } from '../theme';
import withTheme, { ThemedProps } from '../theme/withTheme';
import Text from './elments/text';

export interface IToastComponentProps extends Omit<ToastProps, 'textColor' | 'backgroundColor'> {
  message: string;
  variant?: keyof Theme['toast']
}

const ToastComponent = withTheme<IToastComponentProps>((props) => {

  props = {
    variant: 'default',
    position: 50,
    animation: true,
    hideOnPress: true,
    shadow: true,
    children: props.children || props.message,
    ...props
  };

  const { children, theme, variant: variantKey, ...rest } = props as Required<ThemedProps<IToastComponentProps>>;

  const variant = theme?.toast[variantKey];

  return (
    <Toast {...rest}>
      <Text style={variant}>
        {children}
      </Text>
    </Toast>
  );

});

export default ToastComponent;