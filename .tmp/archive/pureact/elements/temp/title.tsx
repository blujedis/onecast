import { Text, TextProps } from 'react-native';
import withTheme, { ThemedProps } from '../withTheme';
import { Theme } from '..';
import { PropsWithChildren } from 'react';
import Divider from './divider';
import { pickStyles } from '../../utils/object';

export interface ITitleComponentProps extends TextProps {
  size?: any,
  color?: keyof Theme['colors'],
  marginTop?: string | number;
  marginBottom?: string | number;
  divider?: boolean | JSX.Element;
  scheme?: keyof Theme['text']['schemes'];
  variant?: keyof Theme['text']['variants'];
}

const TitleComponent = withTheme<ITitleComponentProps>((props) => {

  props = {
    size: 'nm',
    color: props.theme?.colors.text as any,
    ...props
  };

  const { children, theme, scheme, variant, style, color, divider, size, ...rest } = props as Required<PropsWithChildren<ThemedProps<ITitleComponentProps>>>;

  const titleStyles = pickStyles(theme?.text, scheme, variant);

  const dividerElement = !divider ? null : divider === true ? <Divider /> : divider;

  return (
    <>
      <Text {...rest} style={[{ color, fontSize: 16 }, style]}>
        {children}
      </Text>
      {!divider ? null : dividerElement}
    </>
  );
});

export default TitleComponent;