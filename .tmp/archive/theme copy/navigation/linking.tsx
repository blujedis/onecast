import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { ExampleStackParamList } from './types';

const linking: LinkingOptions<ExampleStackParamList> = {
  prefixes: [Linking.createURL('/examples')],
  config: {
    screens: {
      Home: {
        screens: {
          Layout: 'layout',
          Button: 'button',
          Form: 'form',
          Image: 'image',
          Typography: 'typography',
        }
      }
    },
  },
};

export default linking;
