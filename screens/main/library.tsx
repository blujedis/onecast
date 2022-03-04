import { MainStackScreenProps } from '../../navigation/types';
import Box from '../../components/elements/box';
import Media from '../../components/media';

const LibraryScreen = ({ navigation, route }: MainStackScreenProps<'Library'>) => {

  const type = route.params.type;

  return (
    <Box>
      <Media type={type} onSelected={(item, items, index) => {
        navigation.navigate('Carousel', { item, items, index });
      }} />
    </Box>
  );
};

export default LibraryScreen;