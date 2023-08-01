import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'

interface Props {

}

const MainScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()

  const handleJoinGame = () => {
    navigate('JoinGame')
  }

  const handleCreateGame = () => {
    navigate('CreateGame')
  }

  const handleViewQuestions = () => {
    navigate('QuestionList')
  }

  return (
    <View style={styles.screen}>
      <Text>Main Screen</Text>
      <View>
        <View>
          <Pressable onPress={handleJoinGame}>
            <Text>Join Game</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={handleCreateGame}>
            <Text>Create Game</Text>
          </Pressable>
        </View>

        <View>
          <Pressable onPress={handleViewQuestions}>
            <Text>View Questions</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// create and join cards

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
  }
});
export default MainScreen