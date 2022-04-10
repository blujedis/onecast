import { useState, FC } from 'react';
import { Switch, SwitchProps } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

const SwitchComponent: FC<SwitchProps> = (props) => {

  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  console.log(props.color);

  return (
    <View style={styles.view}>
      <Switch
        value={checked}
        onValueChange={(value) => setChecked(value)}
        color={props.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default SwitchComponent;