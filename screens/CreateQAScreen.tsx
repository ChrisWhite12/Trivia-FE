import { FC } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'

interface Props {

}

const CreateQAScreen: FC<Props> = ({}) => {
  
  return (
    <View style={styles.screen}>
      <Text>Question</Text>
      <TextInput />

      <Text>Category</Text>
      <TextInput />

      <View>
        <View style={styles.answerContainer}>
          <Text>A</Text>
          <TextInput />
        </View>

        <View style={styles.answerContainer}>
          <Text>B</Text>
          <TextInput />
        </View>

        <View style={styles.answerContainer}>
          <Text>C</Text>
          <TextInput />
        </View>

        <View style={styles.answerContainer}>
          <Text>D</Text>
          <TextInput />
        </View>
      </View>
    </View>
  );
};

// Create QA with description, subject area, period

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerContainer: {
    flexDirection: 'row'
  }
});
export default CreateQAScreen