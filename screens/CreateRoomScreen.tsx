import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Checkbox from 'expo-checkbox';
import { FC } from 'react'
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native'

interface Props {

}

const CreateRoomScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()

  const handleStart = () => {
    navigate('GameScreen');
  }

  return (
    <View style={styles.screen}>
      <View>
        <Text>Title</Text>
        <TextInput></TextInput>
      </View>
      <View>
        <Text>Areas</Text>
        <View style={styles.categoryContainer}>
          <Checkbox />
          <Text>Movies</Text>
        </View>
        <View style={styles.categoryContainer}>
          <Checkbox />
          <Text>History</Text>
        </View>
        <View style={styles.categoryContainer}>
          <Checkbox />
          <Text>Music</Text>
        </View>
      </View>
      <Pressable onPress={handleStart}>
        <Text>Start</Text>
      </Pressable>
    </View>
  );
};

// create trivia - title, select areas

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row'
  }
});
export default CreateRoomScreen