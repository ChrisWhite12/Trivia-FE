import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, Pressable } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { getQuestions } from '../../api/questions';
import { useQuery } from 'react-query';
import CustomButton from '../../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { mockQuestions } from '../questions/mockQuestions';
import { Button } from '@rneui/themed';

interface Props {

}

const GameScreen: FC<Props> = ({ }) => {
  const { isLoading, data } = useQuery(["getQuestions"], async () => getQuestions());
  const [questionNumber, setQuestionNumber] = useState(0);
  const [playerStats, setPlayerStats] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(mockQuestions[0]);
  const [gameOver, setGameOver] = useState(false);
  const [answerSelected, setAnswerSelected] = useState<number | undefined>();
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  // TODO - load 10 questions
  // cycle through, getting players answers
  // increment question, when all answered or time limit
  // once 10 end game screen

  const handleNext = () => {
    console.log('questionNumber', questionNumber, mockQuestions.length);
    if (questionNumber + 1 === mockQuestions.length) {
      setGameOver(true);
      return;
    }

    setQuestionNumber(questionNumber + 1)
  }

  const handleExit = () => {
    navigate('MainScreen')
  }

  const handlePressAnswer = (value: number) => {
    console.log('value', value);
    setAnswerSelected(value)
  }

  useEffect(() => {
    console.log('questionNumber', questionNumber);
    setSelectedQuestion(mockQuestions[questionNumber])
  }, [questionNumber]);

  useEffect(() => {
    console.log('gameOver', gameOver);
  }, [gameOver]);

  if (isLoading) {
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
        <Text style={{ color: "white" }}>Q: {mockQuestions[questionNumber].title}</Text>
        {mockQuestions[questionNumber].answers.map((item, i) => (
          <View key={i} style={[styles.listItem, i === answerSelected && styles.selected]}>
            <Pressable style={{ flex: 1 }} onPress={() => handlePressAnswer(i)}>
              <Text>{i + 1} - {item}</Text>
            </Pressable>
          </View>
        ))}
      </View>
      <CustomButton onPress={handleNext}>
        Next
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