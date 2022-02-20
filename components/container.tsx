import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export interface IContainerProps {
  position?: 'top' | 'center' | 'bottom';
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

const stylesheet = StyleSheet.create({
  base: {
    alignItems: 'center'
  }
});


const ContainerComponent: FC<IContainerProps> = (props) => {

  props = {
    position: 'top',
    align: 'left',
    width: '100%',
    ...props
  };

  const style = { ...stylesheet.base }

  return(
    <View>

    </View>
  );

};