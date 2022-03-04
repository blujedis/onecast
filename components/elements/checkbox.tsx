import Checkbox, { CheckboxProps } from 'expo-checkbox';
import withTheme from '../../theme/withTheme';

export interface ICheckboxComponentProps extends CheckboxProps { }

const CheckboxComponent = withTheme((props) => {
  props = {
    ...props
  };
  const { theme, style, ...rest } = props;

  return (
    <Checkbox {...rest} style={[{ alignSelf: 'center'}, style ]} />
  );
  
});

export default CheckboxComponent