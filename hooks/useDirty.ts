import { useEffect, useState } from 'react';
import { useNavigation, NavigationAction, NavigationState } from '@react-navigation/core';
import { Alert, AlertButton } from 'react-native';

export type NavAction = NavigationAction | ((state: NavigationState) => NavigationAction);

export interface IUseDirtyProps {
  title?: string;
  msg?: string;
}

const defaults = {
  title: 'Discard Changes?',
  msg: `You have unsaved changes. Are you sure you want to leave?`
};

export const useDirty = (props: IUseDirtyProps) => {

  props = {
    ...defaults,
    ...props
  };

  const { title, msg } = props as Required<IUseDirtyProps>;

  const [isDirty, setDirty] = useState(false)
  const navigation = useNavigation();

  const show = (action: NavAction) => {
    const buttons = [
      { text: 'Cancel', style: 'cancel', onPress: () => { } },
      {
        text: 'Discard Changes',
        style: 'destructive',
        onPress: () => navigation.dispatch(action),
      },
    ] as AlertButton[];
    Alert.alert(title, msg, buttons);
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (!isDirty)// nothing to do.
        return;
      e.preventDefault(); // prevent navigating.
      show(e.data.action); // Show the alert.
    });
  }, [navigation, isDirty]);

  return {
    isDirty,
    setDirty,
    show,
    navigation
  };

};

