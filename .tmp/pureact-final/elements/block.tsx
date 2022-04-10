import { ThemeNormalized } from '../types';
import { FC, PropsWithChildren } from 'react';
import { View, StyleSheet, ViewProps, SafeAreaView } from 'react-native';
import { withPureact } from '../withPureact';

type Styles = ReturnType<typeof styles>;
type StyleBaseProps = Record<keyof Styles, boolean>;

export interface IBlockProps extends ViewProps, Partial<StyleBaseProps> {
  flex?: boolean | number;
  height?: number;
  width?: number;
  shadowColor?: string;
  space?: number;
  safe?: boolean;
}

const BlockComponent: FC<IBlockProps> = (props) => {

  type Props = IBlockProps & { theme: ThemeNormalized, styles: Styles };

  const { theme, styles, ...clean } = props as Required<PropsWithChildren<Props>>;

  const {
    children, style: initStyle,
    column, row, fluid, middle, center, space,
    left, right, top, bottom, flex, height, width,
    shadowColor, card, shadow, safe, ...rest
  } = clean;

  const style = [
    // styles.column,
    row && styles.row,
    flex && { flex: flex > 0 ? flex : 1 },
    center && styles.center,
    middle && styles.middle,
    top && styles.top,
    bottom && styles.bottom,
    right && styles.right,
    left && styles.left,
    space && { justifyContent: `space-${space}` },
    shadow && styles.shadow,
    fluid && styles.fluid,
    card && styles.card,
    height && { height },
    width && { width },
    shadowColor && { shadowColor },
    initStyle
  ] as ViewProps['style'][];

  if (!safe)
    return (
      <View style={style} {...rest} >
        {children}
      </View>
    );

  return (
    <SafeAreaView style={style} {...rest} >
      {children}
    </SafeAreaView>
  );

};

const styles = (theme: ThemeNormalized) => StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  fluid: {
    width: 'auto',
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  top: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  bottom: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  card: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  shadow: {
    shadowColor: theme.colors.shadow,
    shadowOffset: theme.shadow.offset,
    shadowOpacity: theme.shadow.opacity,
    shadowRadius: theme.shadow.radius,
    elevation: theme.global.elevation
  },
});

export const Block = withPureact(BlockComponent, styles);