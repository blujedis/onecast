/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useTheme } from '../hooks/useTheme';
import { MainStackParamList, RootStackParamList, RootStackScreenProps } from './types';
import { ThemeName } from '../theme';

import MainScreen from '../screens/main';
import ModalScreen from '../screens/modal';
import NotFoundScreen from '../screens/404';
import linking from './linking';

const RootStack = createNativeStackNavigator<MainStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName='Main'
      screenOptions={{}}
    >
      <RootStack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }: RootStackScreenProps<'Main'>) => ({
          // title: 'Main'
        })}
      />
    </RootStack.Navigator>
  )
}


/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={RootStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function Navigation({ theme, mode }: { theme?: ThemeName, mode?: 'light' | 'dark' }) {

  const activeTheme = useTheme(theme, mode);

  const navTheme = {
    dark: activeTheme.dark,
    colors: activeTheme.nav
  };

  return (
    <NavigationContainer
      linking={linking}
      theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );

}