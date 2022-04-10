import { MainStackScreenProps } from '../../navigation/types';
import Page from '../../components/page';

const MainScreen = ({ navigation }: MainStackScreenProps<'Home'>) => {

  return (
    <Page>
      {/* <Icon name="cog-outline" size={32} /> */}
      {/* <Button
          onPress={() => console.log('toggle cog')}
          scheme="primary"
          rounded
          asIcon
        >
          <Icon name="cog-outline" size={32} />
        </Button> */}
    </Page>
  );

};

export default MainScreen;