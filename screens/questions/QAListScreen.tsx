import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Text, FlatList, ActivityIndicator } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import CustomButton from '../../components/CustomButton';
import IconButton from '../../components/IconButton';
import { useQuery } from 'react-query';
import { getQuestions } from '../../api/questions';

interface QuestionItem {
  id: string,
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

  const handleDelete = (index: string) => {
    // TODO delete questions from backend
    setQuestions(questions.filter((item) => item.id !== index))
  }

  // TODO load questions from backend

  useEffect(() => {
    if (!data) return;
    setQuestions(data.map((item) => ({
      id: item.id.toString(),
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
export default QAListScreen