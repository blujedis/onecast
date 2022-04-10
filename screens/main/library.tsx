import { MainStackScreenProps } from '../../navigation/types';
import { View } from 'react-native';
import Media from '../../components/media';

const LibraryScreen = ({ navigation, route }: MainStackScreenProps<'Library'>) => {

  const type = route.params.type;

  return (
    <View>
      <Media type={type} onSelected={(item, items, index) => {
        navigation.navigate('Carousel', { item, items, index });
      }} />
    </View>
  );
};

export default LibraryScreen;