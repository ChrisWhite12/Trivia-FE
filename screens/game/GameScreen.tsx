import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, Pressable } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { getQuestions } from '../../api/questions';
import { useQuery } from 'react-query';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';

interface Props {
  route: RouteProp<any,any>
}

const GameScreen: FC<Props> = ({ route }) => {
  const { isLoading, data: ApiQuestions } = useQuery(["getQuestion"], async () => getQuestions(route.params?.areas, 3));
  const [questionNumber, setQuestionNumber] = useState(0);
  const [playerStats, setPlayerStats] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(ApiQuestions?.[0]);
  const [gameOver, setGameOver] = useState(false);
  const [answerSelected, setAnswerSelected] = useState<number | undefined>();
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const handleNext = () => {
    if (!ApiQuestions?.length) return;
    if (questionNumber + 1 === ApiQuestions.length) {
      setGameOver(true);
      return;
    }
    setAnswerSelected(undefined)
    setQuestionNumber(questionNumber + 1)
  }

  const handleExit = () => {
    navigate('MainScreen')
  }

  const handlePressAnswer = (value: number) => {
    setAnswerSelected(value)
  }

  useEffect(() => {
    setSelectedQuestion(ApiQuestions?.[questionNumber])
  }, [questionNumber]);

  if (isLoading || !selectedQuestion) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color="white" />
      </View>
    )
  }

  if (gameOver) {
    return (
      <View style={styles.screen}>
        <View style={styles.summaryContainer}>
          <Text style={styles.text}>Game Over</Text>
          <Text style={styles.text}>Score: </Text>
        </View>
        <Button title={'Exit'} onPress={handleExit} radius={'md'} />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={{ color: "white" }}>Game Screen</Text>
      <View>
        <Text style={{ color: "white" }}>Q: {selectedQuestion.title}</Text>
        {selectedQuestion.answers.map((item, i) => (
          <View key={i} style={[styles.listItem, i === answerSelected && styles.selected]}>
            <Pressable style={{ flex: 1 }} onPress={() => handlePressAnswer(i)}>
              <Text>{i + 1} - {item}</Text>
            </Pressable>
          </View>
        ))}
      </View>
      <Button title={'Next'} onPress={handleNext} radius={'md'} />
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
  listItem: {
    backgroundColor: '#CCCCFF',
    padding: 5,
    margin: 5,
    minWidth: 200,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selected: {
    borderColor: 'red',
    borderWidth: 2
  },
  text: {
    color: 'white'
  },
  summaryContainer: {
    gap: 10,
    padding: 5,
    margin: 20
  }
});
export default GameScreen