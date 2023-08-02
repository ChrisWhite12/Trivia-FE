import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import CustomButton from '../components/CustomButton';
import { Button } from '@rneui/themed';

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
      <View style={styles.buttonContainer}>
        <Button radius="md" title={'Join Game'} onPress={handleJoinGame} />
        <Button radius="md" title={'Create Game'} onPress={handleCreateGame} />
        <Button radius="md" title={'View Questions'} onPress={handleViewQuestions} />
      </View>
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
  buttonContainer: {
    gap: 10
  }
});
export default MainScreen