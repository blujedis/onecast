import { Text, TextProps } from 'react-native';
import withTheme, { ThemedProps } from '../../theme/withTheme';
import { Theme } from '../../theme';
import { PropsWithChildren } from 'react';
import Divider from './divider';

export interface ITitleComponentProps extends TextProps {
  size?: keyof Theme['fontSize'],
  color?: keyof Theme['colors'],
  marginTop?: string | number;
  marginBottom?: string | number;
  divider?: boolean | JSX.Element;
}

const TitleComponent = withTheme<ITitleComponentProps>((props) => {

  props = {
    size: 'nm',
    color: props.theme?.colors.text as any,
    ...props
  };

  const { children, theme, style, color, divider, size, ...rest } = props as Required<PropsWithChildren<ThemedProps<ITitleComponentProps>>>;

  const dividerElement = !divider ? null : divider === true ? <Divider /> : divider;

  return (
    <>
      <Text {...rest} style={[{ color, fontSize: theme.fontSize[size] }, style]}>
        {children}
      </Text>
      {!divider ? null : dividerElement}
    </>
  );
});

export default TitleComponent;