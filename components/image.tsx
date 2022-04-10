import { FC } from 'react';
import { Image, TouchableHighlight, ImageProps, TouchableHighlightProps } from 'react-native';
// import { PinchGestureHandler } from 'react-native-gesture-handler';


export interface IImageComponentProps extends ImageProps {
  touchable?: TouchableHighlightProps;
  onPress?: TouchableHighlightProps['onPress'];
  onPressIn?: TouchableHighlightProps['onPressIn'];
  onPressOut?: TouchableHighlightProps['onPressOut'];
  onLongPress?: TouchableHighlightProps['onLongPress'];
  onMagicTap?: TouchableHighlightProps['onMagicTap'];
}

const ImageComponent: FC<IImageComponentProps> = ((props) => {

  const { touchable, onPress, onPressIn, onPressOut, onLongPress, onMagicTap, ...rest } = props;

  const touchableProps = {
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    onMagicTap,
    ...touchable,
  };

  const image = <Image {...rest}   />;

  if (!Object.keys(touchableProps).length)
    return <>{image}</>;

  return (
    <TouchableHighlight { ...touchableProps }>
      {image}
    </TouchableHighlight>
  );

});

export default ImageComponent;