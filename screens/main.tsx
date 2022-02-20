import { StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#eee'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

const MainScreen = ({ navigation }: RootStackScreenProps<'Main'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main</Text>
      <View style={styles.separator} />
      <Text style={{ color: '#eee' }}>Main Content</Text>
    </View>
  );
};

export default MainScreen;


