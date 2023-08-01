import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'

interface Props {

}

const QAListScreen: FC<Props> = ({}) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()

  const handleAdd = () => {
    navigate('QuestionCreate')
  }

  const handleView = () => {
    navigate('QuestionDetail')
  }
  
  return (
    <View style={styles.screen}>
     <Pressable onPress={handleAdd}>
      <Text>ADD</Text>
     </Pressable>
     <View>
      <Pressable onPress={handleView}>
        <Text>Item 1</Text>
      </Pressable>
     </View>
    </View>
  );
};
// has list of questions
// button to create QA

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}
});
export default QAListScreen