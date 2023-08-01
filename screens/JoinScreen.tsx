import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native'

interface Props {

}

const JoinScreen: FC<Props> = ({}) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()

  const handleEnter = () => {
    navigate('GameScreen');
  }
  
  return (
    <View style={styles.screen}>
      <TextInput />
      <Pressable onPress={handleEnter}>
        <Text>Enter</Text>
      </Pressable>
    </View>
  );
};

// simple text field for pass

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}
});
export default JoinScreen