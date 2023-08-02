import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Checkbox from 'expo-checkbox';
import { FC, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import CustomInput from '../../components/CustomInput';
import CheckboxWithLabel from '../../components/CheckboxWithLabel';
import CustomButton from '../../components/CustomButton';
import { useQuery } from 'react-query';
import { getCategories } from '../../api/categories';

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

  const handleCategoryChange = (value: string) => (checked: boolean) => {
    if (!checked) {
      setAreas(areas.filter((item) => item !== value))
    }

    const newAreas = [...areas, value]
    setAreas(newAreas)
  }

  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.text}>Title</Text>
        <CustomInput inputProps={{ value: title, onChangeText: handleTitleChange }} />
      </View>
      <View>
        <Text style={styles.text}>Areas</Text>
        <CheckboxWithLabel
          checked={!!areas.find((item) => item === 'movies')}
          onChange={handleCategoryChange('movies')}
        >
          Movies
        </CheckboxWithLabel>
        <CheckboxWithLabel
          checked={!!areas.find((item) => item === 'history')}
          onChange={handleCategoryChange('history')}
        >
          History
        </CheckboxWithLabel>
        <CheckboxWithLabel
          checked={!!areas.find((item) => item === 'music')}
          onChange={handleCategoryChange('music')}
        >
          Music
        </CheckboxWithLabel>
      </View>
      <CustomButton onPress={handleStart}>
        Start
      </CustomButton>
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
  }
});

export default CreateRoomScreen