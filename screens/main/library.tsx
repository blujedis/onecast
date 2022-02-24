import { RootStackScreenProps } from '../../navigation/types';
import Container from '../../components/elments/container';
import MediaComponent from '../../components/media';

const LibraryScreen = ({ navigation }: RootStackScreenProps<'Main'>) => {

  return (
    <Container>
      <MediaComponent onSelected={(item, items, index) => {
        navigation.navigate('Carousel', { item, items, index });
      }} />
    </Container>
  );

};

export default LibraryScreen;