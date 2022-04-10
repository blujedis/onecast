import withTheme, { ThemedProps } from "../theme/withTheme";
import Appicon, { IAppiconProps } from './icons';
import { Theme } from '../theme';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface IconButtonComponentProps extends TouchableOpacityProps {
  name: IAppiconProps['name']
  size?: number;
  color?: string;
  round?: boolean;
  variant?: keyof Theme['variants'];
}

const IconButtonComponent = withTheme<IconButtonComponentProps>((props) => {
  props = {
    size: 32,

    color: props.theme?.colors.text,
    ...props
  };

  const { name, size, color, variant, theme, style, round, ...rest } = props as Required<ThemedProps<IconButtonComponentProps>>;

  const variantStyles = theme?.variants[variant || 'default'];
  const buttonStyles = {
    ...theme?.button,
    ...variantStyles
  };

  const buttonSize = buttonStyles.height; //  (size + borderWidth) * 1.25;


  let outerStyles = {
    ...buttonStyles,
    // width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
  } as any;

  if (round) {
    outerStyles = {
      ...outerStyles,
      width: buttonSize,
      borderRadius: buttonSize / 2,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingTop: 0
    }
  }

  const iconColor = color || variantStyles.color || theme.colors.text;

  return (
    <TouchableOpacity {...rest} style={[outerStyles, style]}>

      <Appicon name={name} size={size} color={iconColor} />

    </TouchableOpacity>
  );
});

export default IconButtonComponent;


