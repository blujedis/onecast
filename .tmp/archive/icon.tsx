import withTheme, { ThemedProps } from "../theme/withTheme";
import { Ionicons } from '@expo/vector-icons';
import Appicon, { AppiconName, appiconKeys } from './icons';

type Ionicon = keyof typeof Ionicons['glyphMap'];


export interface IconComponentProps {
  name?: Ionicon | AppiconName;
  size?: number;
  fill?: string;
}

const IconComponent = withTheme<IconComponentProps>((props) => {
  props = {
    size: 28,
    ...props
  };
  const { name, size, fill, theme } = props as Required<ThemedProps<IconComponentProps>>;

  const fillColor = fill || theme?.colors.text || 'currentColor';

  if (appiconKeys.includes(name)) {
    return (
      <Appicon name={name as AppiconName} {...rest} />
    )
  }

  return (
    <Ionicons name={name} size={size} color={fillColor} />
  );

});

export default IconComponent;


