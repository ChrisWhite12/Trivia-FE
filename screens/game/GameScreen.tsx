import { FC, useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { getQuestions } from '../../api/questions';
import { useQuery } from 'react-query';

interface Props {

}

const GameScreen: FC<Props> = ({ }) => {
  const { isLoading, data } = useQuery(["getQuestions"], async () => getQuestions());
  const [questionNumber, setQuestionNumber] = useState(0);
  const [playerStats, setPlayerStats] = useState([]);

  // TODO - load 10 questions
  // cycle through, getting players answers
  // increment question, when all answered or time limit
  // once 10 end game screen

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color="white" />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text>Game Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.background
  }
});
export default GameScreen