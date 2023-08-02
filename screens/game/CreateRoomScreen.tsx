import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { useQuery } from 'react-query';
import { getCategories } from '../../api/categories';
import { Button, CheckBox, Input } from '@rneui/themed';

interface Props {

}

const CreateRoomScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const [title, setTitle] = useState('')
  const [areas, setAreas] = useState<string[]>([])

  const { isLoading, data } = useQuery(["getCategories"], async () => getCategories());

  const handleStart = () => {
    console.log('title, areas', title, areas);
    // TODO get info from backend, start game
    navigate('GameScreen');
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
  }

  const handleCategoryChange = (value: string) => () => {
    if (!!areas.find((item) => item === value)) {
      setAreas(areas.filter((item) => item !== value))
    }

    const newAreas = [...areas, value]
    setAreas(newAreas)
  }

  return (
    <View style={styles.screen}>
      <Input 
      label="Title" 
      value={title} 
      onChangeText={handleTitleChange} 
      style={styles.input}
      containerStyle={styles.inputContainer}
      />
      <View>
        <Text style={styles.text}>Areas</Text>
        <CheckBox
          checked={!!areas.find((item) => item === 'movies')}
          onPress={handleCategoryChange('movies')}
          title={"Movies"}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkbox}
        />
        <CheckBox
          checked={!!areas.find((item) => item === 'history')}
          onPress={handleCategoryChange('history')}
          title={"History"}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkbox}
        />
        <CheckBox
          checked={!!areas.find((item) => item === 'music')}
          onPress={handleCategoryChange('music')}
          title={"Music"}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkbox}
        />
      </View>
      <Button onPress={handleStart} title={'Start'} radius="md" />
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
  categoryContainer: {
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center',
    padding: 5,
    color: 'white'
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
  },
  checkbox: {
    color: 'white'
  },
  inputContainer: {
    maxWidth: 200
  },
  input: {
    color: 'white'
  }
});

export default CreateRoomScreen