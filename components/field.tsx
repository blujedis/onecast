import withTheme, { ThemedProps } from '../theme/withTheme';
import Text from './elments/text';
import View from './elments/view';

export interface IFieldComponentProps {
  strategy?: 'top' | 'right' | 'bottom' | 'left';
  label?: string;
  error?: string;
}

const FieldComponent = withTheme<IFieldComponentProps>((props) => {

  props = {
    strategy: 'top',
    ...props
  };

  const { children, label, strategy, error } = props as Required<ThemedProps<IFieldComponentProps>>;

  const errorComponent = !error ? null : <Text style={{ }}>{error}</Text>;

  if (!label)
    return (
      <View>{children}</View>
    );

  const labelComponent = <Text>label</Text>;


  if (['top', 'bottom'].includes(strategy)) {
    return (
      <View style={{ flexDirection: 'column'}}>
        {strategy !== 'top' ? null : labelComponent}
        {children}
        {strategy !== 'bottom' ? null : labelComponent}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {strategy !== 'left' ? null : labelComponent}
      {children}
      {strategy !== 'right' ? null : labelComponent}
    </View>
  );


});