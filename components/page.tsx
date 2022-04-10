import { FC } from 'react';
import { View, ViewStyle } from 'react-native';

export interface IPageComponentProps extends ViewStyle { }

const PageComponent: FC<IPageComponentProps> = ((props) => {

  props = {
    flex: 1,
    justifyContent: 'flex-start',
    ...props
  };

  const { children, ...rest } = props;

  const boxStyles = {
    ...rest
  };

  return (
    <View {...boxStyles}>
      {children}
    </View>
  );

});

export default PageComponent;