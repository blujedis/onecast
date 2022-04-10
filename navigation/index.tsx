/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList, RootStackParamList } from './types';
import { useTheme } from '../providers/theme';

import MainScreen from '../screens/main';
import LibraryScreen from '../screens/main/library';
import CarouselScreen from '../screens/main/carousel';
import ModalScreen from '../screens/modal';
import ExamplesScreen from '../screens/examples';
import NotFoundScreen from '../screens/404';

import linking from './linking';
import { IStoredTheme } from '../hooks/useStoredTheme';

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainStackNavigator() {

  // const themer = useTheme();
  // const isDark = themer.mode === 'dark';
  // const theme = themer.theme;

  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        // headerTintColor: isDark ? theme.colors.white : theme.colors.black
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

  const { current } = useTheme();
  const barStyle = current.dark ? 'light' : 'dark';

  const navTheme = {
    dark: current.dark,
    colors: {
      ...current.colors,
      primary: current.COLORS.PRIMARY,
      text: '#fff'
    }
  };

  return (
    <NavigationContainer
      linking={linking}
      theme={navTheme}
    >
      <StatusBar style={barStyle} />
      <RootNavigator />
    </NavigationContainer>
  );

}