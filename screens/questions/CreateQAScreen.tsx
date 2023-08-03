import { FC, useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, CheckBox, Input } from '@rneui/themed';
import { createQuestion } from '../../api/questions';
import { useQuery } from 'react-query';
import { getCategories } from '../../api/categories';

interface Props {

}

const CreateQAScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { isLoading, data: defaultCategories } = useQuery(["getCategories"], async () => getCategories());
  const [category, setCategory] = useState('movies');
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

  const handleCreate = () => {
    const newAnswers = Object.values(answers)
    const categoryId = defaultCategories?.find((item) => item.name === category)?.id ?? 0
    console.log('newAnswers, categoryId',newAnswers, categoryId);

    const response = createQuestion({
      title: question,
      correct,
      answers: newAnswers,
      categoryId,
    })

    console.log('response',response);
    // TODO - connect to backend, validation
    navigate('QuestionList')
  }

  // TODO - get picker items from API
  // TODO - get correct answer
  // rneui checkbox has background

  if (isLoading) return (
    <View style={styles.screen}>
      <ActivityIndicator color="white" />
    </View>
  )

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
            {defaultCategories?.map((item) => (
              <Picker.Item label={item.name} value={item.name} />
            ))}
            <Picker.Item label='Movies' value='movies' />
            <Picker.Item label='History' value='history' />
            <Picker.Item label='Music' value='music' />
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
        <Button title={'Create'} onPress={handleCreate} radius={'md'} />
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
export default CreateQAScreen