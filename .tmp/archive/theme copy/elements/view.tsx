import { FC } from 'react';
import { View, ViewProps } from 'react-native';

export interface IViewComponentProps extends ViewProps {
  
}

export default function () {

  const ViewComponent: FC<IViewComponentProps> = (props) => {

    const { children, ...rest } = props;

    return (
      <View {...rest} >
        {children}
      </View>
    );

  };

  return ViewComponent;

}

