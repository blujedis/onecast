import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ExampleStackParamList = {
  Home: undefined;
  Layout: undefined;
  Button: undefined;
  Form: undefined;
  Image: undefined;
  Typography: undefined;
}

export type ExampleStackScreenProps<Screen extends keyof ExampleStackParamList> = NativeStackScreenProps<ExampleStackParamList, Screen>;
