import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Theme } from '../types';
import { ExampleStackParamList} from './types';

import HomeScreen from '../screens/index';
import LayoutScreen from '../screens/index';
import ButtonScreen from '../screens/index';
import FormScreen from '../screens/index';
import ImageScreen from '../screens/index';
import TypographyScreen from '../screens/index';

export const ExampleStack = createNativeStackNavigator<ExampleStackParamList>();

export function ExampleStackNavigator() {

  const theme: Theme = {} as any; //  useTheme();

  return (
    <ExampleStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: theme.dark ? theme.colors.white : theme.colors.slate700
      }}
    >
      <ExampleStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Onecast', headerShown: false }}
      />

      <ExampleStack.Screen
        name="Layout"
        component={LayoutScreen}
      />


      <ExampleStack.Screen
        name="Button"
        component={ButtonScreen}
      />

      <ExampleStack.Screen
        name="Form"
        component={FormScreen}
      />


      <ExampleStack.Screen
        name="Image"
        component={ImageScreen}
      />

      <ExampleStack.Screen
        name="Typography"
        component={TypographyScreen}
      />

    </ExampleStack.Navigator>

  );

}

export { default as exampleLinking } from './linking';