import { StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
import Box from '../components/elements/box';
import Text from '../components/elements/text';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {

  const msg = 'This screen doesn\'t exist.';

  return (
    <Box {...styles.container}>
      <Text style={styles.title}>{msg}</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
