import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

interface Props {

}

const JoinScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()
  const [code, setCode] = useState('');

  const handleEnter = () => {
    // TODO Connect to backend, validate code, join room
    console.log('code',code);
    navigate('GameScreen');
  }

  const handleCodeChange = (value: string) => {
    setCode(value)
  }

  return (
    <View style={styles.screen}>
      <CustomInput inputProps={{ value: code, onChangeText: handleCodeChange }} />
      <CustomButton onPress={handleEnter}>
        Enter
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.background
  },
});
export default JoinScreen