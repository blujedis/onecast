/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import {  NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as MediaLibrary from 'expo-media-library';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Examples: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

export type MainStackParamList = {
  Home: undefined;
  Library: { type: 'photo' | 'video' };
  Carousel: { item?: MediaLibrary.Asset, items?: MediaLibrary.Asset[], index?: number };
}

export type MainStackScreenProps<Screen extends keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, Screen>;
