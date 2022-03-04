import {
  Button, ButtonProps, TouchableOpacityProps, TouchableOpacity,
  NativeSyntheticEvent, NativeTouchEvent, GestureResponderEvent,
  Text, TextStyle
} from 'react-native';
import { Theme } from '../../theme';
import { PropsWithChildren } from 'react';
import { useTheme } from '../../providers/context';
import { isReactElement } from '../../utils/is';
import { expandStyles } from '../../utils/object';

type Omits = 'disabled' | 'onPress' | 'title' | 'style';

type OnPressHandler<T extends boolean> = T extends true
  ? ((event: GestureResponderEvent) => void) | undefined
  : (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;

export interface IButtonComponentProps<N extends boolean> extends Omit<TouchableOpacityProps, Omits>, Omit<ButtonProps, Omits> {
  native?: N;
  scheme?: keyof Theme['button']['schemes'];
  variant?: keyof Theme['button']['variants'];
  fontWeight?: TextStyle['fontWeight'],
  fontStyle?: TextStyle['fontStyle'],
  fontFamily?: TextStyle['fontFamily'],
  fontSize?: TextStyle['fontSize'],
  fontVariant?: TextStyle['fontVariant']
  letterSpacing?: TextStyle['letterSpacing'],
  asIcon?: boolean;
  rounded?: boolean;
  disabled?: boolean | null;
  style?: TouchableOpacityProps['style'];
  onPress?: OnPressHandler<N>;
}

const ButtonComponent = <T extends boolean = false>(props: PropsWithChildren<IButtonComponentProps<T>>) => {

  props = {
    activeOpacity: 0.8,
    ...props
  };

  const { children, native, scheme, variant, rounded, asIcon, style, ...rest } = props;

  const theme = useTheme();
  const expanded = expandStyles(theme?.button, scheme, variant);

  if (!native) {

    const baseStyles = {
      ...expanded.base,
      ...expanded.scheme,
      ...expanded.variant,
      ...rest
    } as any;

    const { fontWeight, fontStyle, fontFamily, letterSpacing,
      fontVariant, fontSize, color, ...cleanedButtonStyles } = baseStyles;

    let buttonStyles = {
      ...cleanedButtonStyles,
    };

    // const adjColor = variant ? expanded.scheme.backgroundColor : expanded.scheme.color;

    const textStyles = {
      color: rest.color || color,
      fontWeight,
      fontVariant,
      fontFamily,
      fontSize,
      fontStyle,
      letterSpacing,
    } as any;

    if (rounded) {
      buttonStyles = {
        ...buttonStyles,
        borderRadius: buttonStyles.height / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }
    }

    if (asIcon) {
      buttonStyles.paddingLeft = 0;
      buttonStyles.paddingRight = 0;
      buttonStyles.paddingTop = 0;
      buttonStyles.paddingBottom = 0;
      buttonStyles.width = buttonStyles.height
    }

    return (
      <TouchableOpacity
        {...rest} style={[buttonStyles, style]} >
        {isReactElement(children)
          ? children
          :
          <Text style={textStyles}>
            {children}
          </Text>
        }
      </TouchableOpacity>
    );

  }

  const buttonStyles = {
    title: children as string,
    color: rest.color || expanded.scheme.color,
    ...rest
  };

  return (
    <Button {...buttonStyles as any} />
  );

};

export default ButtonComponent;