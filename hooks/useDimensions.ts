import { Dimensions } from 'react-native';

const useDimensions = () => {

  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  return {
    window,
    screen
  };

};

export default useDimensions;

