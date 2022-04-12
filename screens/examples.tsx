import { RootStackScreenProps } from '../navigation/types';
import Page from '../components/page';

import { Block, Button, Text } from 'galio-framework';

const ExampleScreen = ({ navigation }: RootStackScreenProps<'Examples'>) => {

  // const theme = useTheme();
  // const storedTheme = useStoredTheme();

  const changeTheme = (value: boolean) => {
    // const nextMode = theme.mode === 'light' && value ? 'dark' : 'light';
    // const nextTheme = getTheme(themes, 'default', nextMode);
    // theme.replace(nextTheme);
    // storedTheme.set({ name: 'default', mode: nextMode });
  };

  return (
    <Page>
      <Block fluid>
        <Text h6>hello</Text>
        <Button>Click</Button>
      </Block>
      {/* <Switch onValueChange={changeTheme} value={theme.current.dark}/> */}
    </Page>
  );

};

export default ExampleScreen;