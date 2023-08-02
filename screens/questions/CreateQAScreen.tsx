import { FC, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import CustomInput from '../../components/CustomInput';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {

}

const CreateQAScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const [category, setCategory] = useState('movies');
  const [answers, setAnswers] = useState({
    a: '',
    b: '',
    c: '',
    d: ''
  })
  const [question, setQuestion] = useState('')

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  }

  const handleChange = (label: string) => (value: string) => {
    setAnswers({...answers, [label]: value})
  }

  const handleCreate = () => {
    const QA = {
      question,
      category,
      answers
    }
    console.log('creating QA', QA)
    // TODO - connect to backend, validation
    navigate('QuestionList')
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Question</Text>
      <CustomInput inputProps={{ value: question, onChangeText: handleQuestionChange}} />

      <Text style={styles.text}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={handleCategoryChange}
        style={styles.picker}
        dropdownIconColor="white"
      >
        <Picker.Item label='Movies' value='movies' />
        <Picker.Item label='History' value='history' />
        <Picker.Item label='Music' value='music' />
      </Picker>

      <View>
        <CustomInput
          label='A'
          inputProps={{
            value: answers.a,
            onChangeText: handleChange('a')
          }}
        />
        <CustomInput
          label='B'
          inputProps={{
            value: answers.b,
            onChangeText: handleChange('b')
          }}
        />
        <CustomInput
          label='C'
          inputProps={{
            value: answers.c,
            onChangeText: handleChange('c')
          }}
        />
        <CustomInput
          label='D'
          inputProps={{
            value: answers.d,
            onChangeText: handleChange('d')
          }}
        />
      </View>
      <CustomButton onPress={handleCreate}>Create</CustomButton>
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
  }
});
export default CreateQAScreen