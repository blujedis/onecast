import { FC } from 'react';
import Toast, { ToastProps } from 'react-native-root-toast';
import { Text } from 'react-native';

export interface IToastComponentProps extends Omit<ToastProps, 'textColor' | 'backgroundColor'> {
  message: string;
}

const ToastComponent: FC<IToastComponentProps> = ((props) => {

  props = {
    position: 50,
    animation: true,
    hideOnPress: true,
    shadow: true,
    children: props.children || props.message,
    ...props
  };

  const { children, ...rest } = props;

  return (
    <Toast {...rest}>
      <Text>
        {children}
      </Text>
    </Toast>
  );

});

export default ToastComponent;