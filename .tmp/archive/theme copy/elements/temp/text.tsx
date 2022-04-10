import { Text, TextProps } from 'react-native';
import withTheme from '../withTheme';
import { Theme } from '..';
import {  pickStyles } from '../../utils/object';

export interface ITextComponentProps extends TextProps {
  scheme?: keyof Theme['text']['schemes'];
  variant?: keyof Theme['text']['variants'];
}

const TextComponent = withTheme<ITextComponentProps>((props) => {

  const { children, theme, style, scheme, variant, ...rest } = props;

  const textStyles = pickStyles(theme?.text, scheme, variant);

  return (
    <Text {...rest} style={[textStyles, style]}>
      {children}
    </Text>
  );

});

export default TextComponent;