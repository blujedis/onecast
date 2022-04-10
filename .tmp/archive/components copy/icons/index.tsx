import ChromecastOutline from './chromecast-outline';
import ChromecastFilled from './chromecast-filled';
import { SvgProps, Color } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import withTheme, { ThemedProps } from '../../theme/lib/withTheme';
import { OpaqueColorValue } from 'react-native';

export type AppiconName = keyof typeof library;
export type IoniconName = keyof typeof Ionicons['glyphMap'];

export interface IAppiconProps {
  name: AppiconName | IoniconName;
  size?: number;
  color?: string | OpaqueColorValue | Color;
  fill?: string | OpaqueColorValue | Color;
}

const library = {
  ChromecastFilled,
  ChromecastOutline
};

export const appiconKeys = Object.keys(library);

const DEFAULT_APPICON_SIZE = 28

const Appicon = withTheme<IAppiconProps>((props) => {

  const themedColor = props.color || props.theme?.colors.text;
  const themedFill = props.fill || themedColor;

  props = {
    color: themedColor,
    fill: themedFill,
    ...props
  };

  const { name, theme, ...rest } = props as Required<ThemedProps<IAppiconProps>>;

  const width = props.size || DEFAULT_APPICON_SIZE;
  const height = width;

  if (appiconKeys.includes(name)) {
    const Icon = library[name as AppiconName];
    return (
      <Icon {...rest as any} width={width} height={height} />
    );
  }

  return (
    <Ionicons name={name as IoniconName} {...rest as any} />
  );

});

export default Appicon;