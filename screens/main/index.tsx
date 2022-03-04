import { MainStackScreenProps } from '../../navigation/types';
import Box from '../../components/elements/box';
import Text from '../../components/elements/text';
import Page from '../../components/page';
import Button from '../../components/elements/button';
import Icon from '../../components/icons';
import { useContext } from '../../providers/context';

const MainScreen = ({ navigation }: MainStackScreenProps<'Home'>) => {

  const ctx = useContext();

  return (
    <Page>
      <Box flexDirection="row">
        <Icon name="cog-outline" size={32} />
        <Button
          onPress={() => ctx.theme.dark ? ctx.setThemeMode('light') : ctx.setThemeMode('dark')}
          scheme="primary"
          rounded
          asIcon
        >
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
          <Icon name="cog-outline" size={32} />
          {/* <Text>
              Hello
            </Text> */}
          {/* </View> */}

        </Button>
      </Box>
      <Box flex={1} flexDirection="column" justifyContent="space-around">
        <Text>Two</Text>
      </Box>
      <Box >
        <Text>
          <Button native onPress={() => navigation.navigate('Examples')}>Examples</Button>
        </Text>
      </Box>
    </Page>
  );

};

export default MainScreen;