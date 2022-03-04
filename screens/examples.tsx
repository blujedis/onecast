import { RootStackScreenProps } from '../navigation/types';
import Box from '../components/elements/box';
import Text from '../components/elements/text';
import Page from '../components/page';
import Button from '../components/elements/button';
import { useContext } from '../providers/context';

const ExampleScreen = ({ navigation }: RootStackScreenProps<'Examples'>) => {

  const ctx = useContext();
  const getMode = ctx.theme.dark ? 'light' : 'dark'

  return (
    <Page>
      <Box flex={1} justifyContent="space-around" >
        <Button
          onPress={() => ctx.setTheme('default', getMode)}>
          toggle
        </Button>
        <Button scheme="primary" rounded>toggle</Button>
        <Button scheme="secondary">toggle</Button>
        <Button scheme="danger" variant="underlined">toggle</Button>
        <Button scheme="warning">toggle</Button>

        <Button scheme="success" variant="link">link</Button>
        <Button scheme="info" variant="outlined">
          <Text scheme="info">
            some text
          </Text>
        </Button>
      </Box>
      {/* <Box flex={1} flexDirection="column" justifyContent="space-around">
        <Button native variant="primary" onPress={() => console.log('test')}>
          Primary
        </Button>
        <Button native onPress={() => console.log('test')}>
          Default
        </Button>
        <Button native variant="danger" onPress={() => console.log('test')}>
          Error
        </Button>
        <Button native variant="warning" onPress={() => console.log('test')}>
          Warning
        </Button>
        <Button native variant="success" onPress={() => console.log('test')}>
          Error
        </Button>
        <Button native variant="info" onPress={() => console.log('test')}>
          Error
        </Button>
        <Button native variant="secondary" onPress={() => console.log('test')}>
          Error
        </Button>
      </Box> */}
    </Page>
  );

};

export default ExampleScreen;