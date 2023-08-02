import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/CustomButton';

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
      <View>
        <CustomButton onPress={handleJoinGame}>
          Join Game
        </CustomButton>       
        <CustomButton onPress={handleCreateGame}>
          Create Game
        </CustomButton>
        <CustomButton onPress={handleViewQuestions}>
          View Questions
        </CustomButton>
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
    backgroundColor: GlobalStyles.background
  },
  buttonContainer: {
    padding: 10,
  }
});
export default MainScreen