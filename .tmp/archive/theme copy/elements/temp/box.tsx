import { withTheme } from '../withTheme';
import { ViewStyle, ColorValue, View } from 'react-native';

type StringOrNumber = string | number;

type StringOrNumberArray = StringOrNumber | [StringOrNumber?, StringOrNumber?, StringOrNumber?, StringOrNumber?];

type ColorValueArray = ColorValue | [ColorValue?, ColorValue?, ColorValue?, ColorValue?];

type NumberArray = number | [number?, number?, number?, number?];

type OmitKeys = 'margin' | 'padding' | 'borderRadius' | 'borderWidth' | 'borderColor';

export interface IBoxComponentProps extends Omit<ViewStyle, OmitKeys> {
  display?: ViewStyle['display'];
  position?: ViewStyle['position'];
  top?: ViewStyle['top'];
  right?: ViewStyle['right'];
  bottom?: ViewStyle['bottom'];
  left?: ViewStyle['left'];
  flex?: ViewStyle['flex'];
  flexWrap?: ViewStyle['flexWrap'];
  flexGrow?: ViewStyle['flexGrow'];
  flexShrink?: ViewStyle['flexShrink'];
  flexDirection?: 'row' | 'column';
  height?: ViewStyle['height'];
  width?: ViewStyle['width'];
  borderStyle?: ViewStyle['borderStyle'];
  aspectRatio?: ViewStyle['aspectRatio'];
  backgroundColor?: ViewStyle['backgroundColor'];
  alignItems?: ViewStyle['alignItems'];
  alignContent?: ViewStyle['alignContent'];
  alignSelf?: ViewStyle['alignSelf'];
  justifyContent?: ViewStyle['justifyContent'];
  margin?: StringOrNumberArray;
  padding?: StringOrNumberArray;
  borderRadius?: NumberArray;
  borderWidth?: NumberArray;
  borderColor?: ColorValueArray;
}


const BoxComponent = withTheme<IBoxComponentProps>((props) => {

  if (props.flexDirection && props.flexDirection === 'row')
    props = {
      alignItems: 'center',
      ...props
    };

  props = {
    width: '100%',
    ...props
  };

  const { children, theme, ...rest } = props; //  normalizeProps(props);

  const styles = {
    backgroundColor: theme?.colors.background,
    ...rest
  } as any;

  return (
    <View style={styles}>
      {children}
    </View>
  );

});

export default BoxComponent;