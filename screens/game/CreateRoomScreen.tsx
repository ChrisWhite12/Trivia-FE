import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, useEffect, useState } from 'react'
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
    // TODO get info from backend, start game, create room
    navigate('GameScreen', { areas });
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
  }

  const handleCategoryChange = (value: string) => () => {
    if (!!areas.find((item) => item === value)) {
      setAreas(areas.filter((item) => {
        return item !== value
      }))
      return;
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
        {data?.map((category) => (
          <CheckBox
            key={category.id}
            checked={!!areas.find((item) => item === category.name)}
            onPress={handleCategoryChange(category.name)}
            title={category.name}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkbox}
          />
        ))}
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