/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList, RootStackParamList } from './types';
import { useTheme } from '../providers/context';

import MainScreen from '../screens/main';
import LibraryScreen from '../screens/main/library';
import CarouselScreen from '../screens/main/carousel';
import ModalScreen from '../screens/modal';
import ExamplesScreen from '../screens/examples';
import NotFoundScreen from '../screens/404';

import linking from './linking';

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainStackNavigator() {

  const theme = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: theme.dark ? theme.colors.white : theme.colors.slate700
      }}
    >
      <MainStack.Screen
        name="Home"
        component={MainScreen}
        options={{ title: 'Onecast', headerShown: false }}
      />
      <MainStack.Screen
        name="Library"
        component={LibraryScreen}
      />
      {/* <RootStack.Group screenOptions={{ presentation: 'fullScreenModal' }}> */}
      <MainStack.Screen name="Carousel" component={CarouselScreen} />
      {/* </RootStack.Group> */}
    </MainStack.Navigator>
  );

}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <RootStack.Navigator
      initialRouteName='Examples'
    >
      <RootStack.Screen name="Main" component={MainStackNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="Examples" component={ExamplesScreen} options={{ title: 'Examples' }} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="Modal" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );

}

export default function Navigation() {
  const theme = useTheme();
  const barStyle = theme.mode === 'dark' ? 'light' : 'dark';
  return (
    <NavigationContainer
      linking={linking}
      theme={theme}
    >
      <StatusBar style={barStyle} />
      <RootNavigator />
    </NavigationContainer>
  );
}