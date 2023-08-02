import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/CustomButton';

interface Props {

}

const SigninScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.screen}>
      <CustomButton onPress={() => navigate('MainScreen')}>
        Sign In
      </CustomButton>
    </View>
  );
};

// simple button
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