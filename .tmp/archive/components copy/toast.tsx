import Toast, { ToastProps } from 'react-native-root-toast';
import { Theme } from '../providers/theme';
import withTheme, { ThemedProps } from '../theme/lib/withTheme';
import Text from '../theme/elements/text';

type ToastVariant = Theme['schemes'];

export interface IToastComponentProps extends Omit<ToastProps, 'textColor' | 'backgroundColor'> {
  message: string;
  variant?: keyof ToastVariant
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

  const variant = theme?.schemes[variantKey];

  return (
    <Toast {...rest}>
      <Text style={variant}>
        {children}
      </Text>
    </Toast>
  );

});

export default ToastComponent;