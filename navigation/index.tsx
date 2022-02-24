/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList, RootStackParamList, RootStackScreenProps } from './types';
import { useTheme, useThemeContext } from '../providers/context';

import MainScreen from '../screens/main';
import LibraryScreen from '../screens/main/library';
import CarouselScreen from '../screens/main/carousel';
import ModalScreen from '../screens/modal';
import NotFoundScreen from '../screens/404';
import linking from './linking';

const RootStack = createNativeStackNavigator<MainStackParamList>();

function RootStackNavigator() {

  const theme = useTheme();

  return (
    <RootStack.Navigator
      initialRouteName='Main'
      screenOptions={{
        headerTintColor: theme.dark ? theme.colors.white : theme.colors.slate700
      }}
    >
      <RootStack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: 'Onecast' }}
      />
      <RootStack.Screen
        name="Library"
        component={LibraryScreen}
      />
      {/* <RootStack.Group screenOptions={{ presentation: 'fullScreenModal' }}> */}
      <RootStack.Screen name="Carousel" component={CarouselScreen} />
      {/* </RootStack.Group> */}
    </RootStack.Navigator>
  );

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

export default function Navigation() {

  const theme = useTheme();
  const barStyle = theme.mode === 'dark' ? 'light' : 'dark';

  return (
    <NavigationContainer
      linking={linking}
      theme={theme}>
      <StatusBar style={barStyle} />
      <RootNavigator />
    </NavigationContainer>
  );

}