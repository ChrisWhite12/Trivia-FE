import { FC } from 'react'
import { View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Text, TextInputProps } from 'react-native'

interface Props {
  label?: string;
  inputProps: TextInputProps;
}

const CustomInput: FC<Props> = ({ label, inputProps }) => {

  return (
    <View style={styles.answerContainer}>
      {label && <Text style={styles.text}>{label}</Text>}
      <TextInput style={styles.textInput} {...inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCDD',
    minWidth: 200,
    margin: 5,
    color: 'white'
  },
  answerContainer: {
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center',
    padding: 5,
    color: 'white'
  }
});
export default CustomInput