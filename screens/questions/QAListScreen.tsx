import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Text, FlatList, ActivityIndicator } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import IconButton from '../../components/IconButton';
import { useQuery } from 'react-query';
import { deleteQuestion, getQuestions } from '../../api/questions';
import { Button, Divider } from '@rneui/themed';
import { mockQuestions } from './mockQuestions';

interface QuestionItem {
  id: number,
  title: string,
}

interface Props {

}

const QAListScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()
  const [questions, setQuestions] = useState<QuestionItem[]>([])

  const { isLoading, data } = useQuery(["getQuestions"], async () => getQuestions());

  const handleAdd = () => {
    navigate('QuestionCreate')
  }

  const handleDelete = (index: number) => {
    deleteQuestion(index.toString())
    setQuestions(questions.filter((item) => item.id !== index))
  }

  useEffect(() => {
    if (!data) return;
    setQuestions(data.map((item) => ({
      id: item.id,
      title: item.title
    })))
  }, [isLoading, data]);

  if (isLoading) return (
    <View style={styles.screen}>
      <ActivityIndicator color="white" />
    </View>
  )

  return (
    <View style={styles.screen}>
      <View>
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(question) => (
            <View>
              <View style={styles.listItem}>
                <Text>{question.item.title}</Text>
                <IconButton size={16} color='red' icon='trash' onPress={() => handleDelete(question.item.id)} />
              </View>
              <Divider />
            </View>
          )}
        />
      </View>

      <Button title={'Add'} onPress={handleAdd} style={{ margin: 5 }} radius="md" />
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
    backgroundColor: '#CCCCFF',
    padding: 5,
    margin: 5,
    minWidth: 200,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
export default QAListScreen