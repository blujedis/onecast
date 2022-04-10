import withTheme from '../withTheme';
import { TextInput, TextInputProps } from 'react-native';
import { Theme } from '..';
import { pickStyles } from '../../utils/object';

export interface IInputComponentProps extends TextInputProps {
  scheme?: keyof Theme['input']['schemes'];
  variant?: keyof Theme['input']['variants'];
}

const InputComponent = withTheme<IInputComponentProps>((props) => {
  props = {
    ...props
  };
  const { theme, scheme, variant, style, ...rest } = props;

  const inputStyles = pickStyles(theme?.input, scheme, variant);

  return (
    <TextInput {...rest} style={[inputStyles, style]} />
  );
});

export default InputComponent;