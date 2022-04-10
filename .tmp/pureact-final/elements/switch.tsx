import { useState } from 'react';
import { Switch as ReactSwitch, SwitchChangeEvent, SwitchProps as ReactSwitchProps } from 'react-native';
import { withPureact } from '../withPureact';
import { noop } from '../utils';
import { ThemeNormalized } from 'pureact/types';

export interface ISwitchProps extends ReactSwitchProps {}

const SwitchComponent = (props: ISwitchProps) => {

  type Props = ISwitchProps & { theme: ThemeNormalized };
  const { theme, ...clean } = props as Props;

  const defaults = {
    disabled: false,
    value: false,
    trackColor: {
      false: theme.colors.muted,
      true: theme.colors.primary
    },
    ios_backgroundColor:  theme.colors.muted,
    ...clean
  };

  const { 
    disabled, value, onChange, trackColor,
    ios_backgroundColor, onValueChange, ...rest 
  } = defaults as Required<Props>;

  const [active, setActive] = useState(value);

  const onValueChangeHandler = () => {
    const newValue = !active;
    setActive(newValue);
    if (onValueChange)
      onValueChange(newValue);
  };
  const onChangeHandler = (e: SwitchChangeEvent) => { (onChange || noop)(e) };

  return (
    <ReactSwitch
      value={active}
      trackColor={{ ...trackColor }}
      ios_backgroundColor={ios_backgroundColor}
      onChange={onChangeHandler}
      onValueChange={onValueChangeHandler}
      {...rest}
    />
  )

};


export const Switch = withPureact(SwitchComponent);