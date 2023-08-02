import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import { Button } from '@rneui/themed';

interface Props {

}

const SigninScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.screen}>
      <Button title="Sign In" radius="md" onPress={() => navigate('MainScreen')} />
    </View>
  );
};
// oauth later

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.background
  },
  buttonContainer: {
    padding: 20,
  }
});
export default SigninScreen