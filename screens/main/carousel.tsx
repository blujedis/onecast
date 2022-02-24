import { StyleSheet } from 'react-native';
import View from '../../components/elments/view';
import Image from '../../components/elments/image';
import { RootStackScreenProps } from '../../navigation/types';
import PagerView from 'react-native-pager-view';
import Container from '../../components/elments/container';
import useDimensions from '../../hooks/useDimensions';
import { Asset } from '../../components/media';

const stylesheet = StyleSheet.create({
  pager: {
    width: '100%',
    height: '100%',
  }
});

const CarouselScreen = ({ route }: RootStackScreenProps<'Carousel'>) => {

  const items = route.params.items as Asset[];
  const index = route.params.index as number;

  const { screen } = useDimensions();
  const height = Math.floor(screen.width / 1.5);

  const getItems = () => {
    return items?.map((item) => {
      return (
        <View key={item.id}>
          {/* <Text>
            Height: {item.height} Width: {item.width}
          </Text> */}
          <Image
            onPress={() => {
              console.log('cast image');
            }}
            source={{ uri: item.uri }}
            style={{
              resizeMode: 'cover',
              width: screen.width,
              height
            }}
          />

        </View>
      );
    });

  };

  return (
    <Container valign="center">
      <View height={height}>
        <PagerView style={stylesheet.pager} initialPage={index}>
          {getItems()}
        </PagerView>
      </View>
    </Container>
  );

};

export default CarouselScreen;