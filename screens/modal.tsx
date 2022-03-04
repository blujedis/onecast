import { StyleSheet } from 'react-native';
import View from '../components/elements/view';
import Text from '../components/elements/text';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} />
      <Text>This is a Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee'
  },
});

{/* Use a light status bar on iOS to account for the black space above the modal */ }
{/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */ }

{/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */ }
