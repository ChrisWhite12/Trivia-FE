import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, CheckBox, Input } from '@rneui/themed';
import { createQuestion, getQuestion, updateQuestion } from '../../api/questions';
import { useQuery } from 'react-query';
import { getCategories } from '../../api/categories';

interface Props {
  route: RouteProp<any, any>
}

const EditQAScreen: FC<Props> = ({ route }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const questionId = route.params?.id;
  const { isLoading, data: defaultCategories } = useQuery(["getCategories"], async () => getCategories());
  const { isLoading: isLoadingQuestion, data: defaultQuestion, refetch } = useQuery(["getQuestion"], async () => getQuestion(route.params?.id));

  const [category, setCategory] = useState<string>('');
  const [answers, setAnswers] = useState({
    a: '',
    b: '',
    c: '',
    d: ''
  })
  const [question, setQuestion] = useState('')
  const [correct, setCorrect] = useState<number>(0);

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  }

  const handleChange = (label: string) => (value: string) => {
    setAnswers({ ...answers, [label]: value })
  }

  const handleCorrectChange = (value: number) => () => {
    setCorrect(value)
  }

  const handleUpdate = () => {
    const newAnswers = Object.values(answers)
    const categoryId = defaultCategories?.find((item) => item.name === category)?.id ?? 0
    
    if (!question) return;

    updateQuestion(
      route.params?.id,
      {
        title: question,
        correct,
        answers: newAnswers as string[],
        categoryId,
      }
    )
    navigate('QuestionList');
  }

  useEffect(() => {
    if (!defaultQuestion || !defaultCategories) return;
    setAnswers({
      a: defaultQuestion.answers[0],
      b: defaultQuestion.answers[1],
      c: defaultQuestion.answers[2],
      d: defaultQuestion.answers[3]
    })
    setQuestion(defaultQuestion.title)
    setCorrect(defaultQuestion.correct)
    setCategory(defaultQuestion.category?.name ?? defaultCategories[0].name)
  }, [defaultQuestion]);

  useEffect(() => {
    refetch();
  }, [questionId]);

  if (isLoading || isLoadingQuestion || !defaultCategories || !defaultQuestion) return (
    <View style={styles.screen}>
      <ActivityIndicator color="white" />
    </View>
  )

  // TODO - fix weird keyboard issue, when selecting question
  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <View>
          <Input label="Question" value={question} onChangeText={handleQuestionChange} style={{ color: 'white' }} />
        </View>

        <View>
          <Text style={styles.text}>Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={handleCategoryChange}
            style={styles.picker}
            dropdownIconColor="white"
          >
            {defaultCategories.map((item, i) => (
              <Picker.Item key={i} label={item.name} value={item.name} />
            ))}
          </Picker>
        </View>

        <View>
          <View style={styles.flexContainer}>
            <Input label="1" value={answers.a} onChangeText={handleChange('a')} style={styles.answerFields} />
            <CheckBox checked={correct === 0} onPress={handleCorrectChange(0)} containerStyle={styles.checkboxContainer} />
          </View>
          <View style={styles.flexContainer}>
            <Input label="2" value={answers.b} onChangeText={handleChange('b')} style={styles.answerFields} />
            <CheckBox checked={correct === 1} onPress={handleCorrectChange(1)} containerStyle={styles.checkboxContainer} />
          </View>
          <View style={styles.flexContainer}>
            <Input label="3" value={answers.c} onChangeText={handleChange('c')} style={styles.answerFields} />
            <CheckBox checked={correct === 2} onPress={handleCorrectChange(2)} containerStyle={styles.checkboxContainer} />
          </View>
          <View style={styles.flexContainer}>
            <Input label="4" value={answers.d} onChangeText={handleChange('d')} style={styles.answerFields} />
            <CheckBox checked={correct === 3} onPress={handleCorrectChange(3)} containerStyle={styles.checkboxContainer} />
          </View>
        </View>
        <Button title={'Create'} onPress={handleUpdate} radius={'md'} />
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
  answerContainer: {
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    padding: 5
  },
  picker: {
    width: 200,
    border: '1px solid black',
    borderRadius: 5,
    margin: 5,
    color: 'white'
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 250
  },
  formContainer: {
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignContent: 'center'
  },
  answerFields: {
    color: 'white',
  },
  checkboxContainer: {
    backgroundColor: 'transparent'
  }
});

export default EditQAScreen