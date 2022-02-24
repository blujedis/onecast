import { Text, TextProps } from 'react-native';
import withTheme from '../../theme/withTheme';

export interface ITextComponentProps extends TextProps { }

const TextComponent = withTheme<ITextComponentProps>((props) => {
  const { children, theme, style, ...rest } = props;
  return (
    <Text {...rest} style={[props.style, { color: theme?.colors.text }, style]}>
      {children}
    </Text>
  );
});

export default TextComponent;