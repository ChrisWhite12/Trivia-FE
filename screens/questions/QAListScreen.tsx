import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useState } from 'react'
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import CustomButton from '../../components/CustomButton';
import IconButton from '../../components/IconButton';

interface Props {

}

const QAListScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()
  const [questions, setQuestions] = useState([
    {
      id: '1',
      title: 'Question1'
    },
    {
      id: '2',
      title: 'Question2'
    },
    {
      id: '3',
      title: 'Question3'
    }
  ])

  const handleAdd = () => {
    navigate('QuestionCreate')
  }

  const handleDelete = (index: string) => {
    setQuestions(questions.filter((item) => item.id !== index))
  }

  // TODO load questions from backend
  // TODO question detail screen / edit ??

  return (
    <View style={styles.screen}>
      <View>
        <FlatList
          data={questions}
          renderItem={(question) => (
            <View style={styles.listItem}>
              <Text>{question.item.title}</Text>
              <IconButton size={16} color='red' icon='trash' onPress={() => handleDelete(question.item.id)} />
            </View>
          )}
        />
      </View>
      <CustomButton onPress={handleAdd}>
        ADD
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.background,
    paddingVertical: 100
  },
  listItem: {
    backgroundColor: '#99CC55',
    padding: 5,
    margin: 5,
    minWidth: 200,
    borderRadius: 5,
    flexDirection:'row',
    justifyContent: 'space-between'
  }
});
export default QAListScreen