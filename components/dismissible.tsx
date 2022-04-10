
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export const Dismissible = ({ children }: { children: any }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => { Keyboard.dismiss() }}
    >
      {children}
    </TouchableWithoutFeedback>
  )
};