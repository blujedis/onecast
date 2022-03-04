import withTheme, { ThemedProps } from '../../theme/withTheme';
import { ViewStyle, ColorValue, View } from 'react-native';
import { PropsWithChildren } from 'react';

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

const KEY_MAP = {
  margin: ['Top', 'Right', 'Bottom', 'Left'] as const,
  padding: ['Top', 'Right', 'Bottom', 'Left'] as const,
  borderWidth: ['TopWidth', 'RightWidth', 'BottomWidth', 'LeftWidth'] as const,
  borderColor: ['TopColor', 'RightColor', 'BottomColor', 'LeftColor'] as const,
  borderRadius: ['TopLeftRadius', 'TopRightRadius', 'BottomRightRadius', 'BottomLeftRadius'] as const
};

const normalizeProps = (props: ThemedProps<IBoxComponentProps>) => {
  const { children, ...clone } = props;
  const normalized = {} as any;
  const theme = props.theme;
  // Set border color to theme color may be overridden below 
  // or ignored if no borde width property is set.
  normalized.borderColor = theme?.colors.border;
  for (const k in clone) {
    const val = clone[k as keyof typeof clone];
    if (!Array.isArray(val)) {
      normalized[k] = val;
    }
    else {
      let i = 0;
      delete clone[k as keyof typeof clone] // custom key remove from clone.
      for (const v of val) {
        const map = KEY_MAP[k as keyof typeof KEY_MAP];
        if (!map) continue;
        const key = k + map[i];
        i++
        if (typeof v === 'undefined' || v === null) continue;
        normalized[key] = v;
      }
    }
  }
  return { ...normalized, ...clone, children } as PropsWithChildren<ThemedProps<ViewStyle>>;
};

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

  const { children, theme, ...rest } = normalizeProps(props);

  const styles = {
    backgroundColor: theme?.colors.background,
    ...rest
  }

  return (
    <View style={styles}>
      {children}
    </View>
  );

});

export default BoxComponent;