import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { Button, Input } from '@rneui/themed';

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
      <Input label="Code" value={code} onChangeText={handleCodeChange} />
      <Button title={'Enter'} onPress={handleEnter} radius="md" />
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