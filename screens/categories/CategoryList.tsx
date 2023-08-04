import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Text, FlatList, ActivityIndicator } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import IconButton from '../../components/IconButton';
import { useQuery } from 'react-query';
import { Button, Divider, Input } from '@rneui/themed';
import { createCategory, deleteCategory, getCategories } from '../../api/categories';


interface Props {

}

const CategoryListScreen: FC<Props> = ({ }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryText, setCategoryText] = useState('');

  const { isLoading, data } = useQuery(["getCategories"], async () => getCategories());

  const onChangeNewCategory = (value: string) => {
    setCategoryText(value)
  }

  const handleCreate = () => {
    createCategory({
      name: categoryText
    })
  }

  const handleDelete = (value: number) => {
    deleteCategory(value)
  }

  useEffect(() => {
    if (!data) return;
    setCategories(data.map((item) => ({
      id: item.id,
      name: item.name
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
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(category) => (
            <View>
              <View style={styles.listItem}>
                <Text>{category.item.name}</Text>
                <IconButton size={16} color='red' icon='trash' onPress={() => handleDelete(category.item.id)} />
              </View>
              <Divider />
            </View>
          )}
        />
        <View style={styles.createContainer}>
          <Input containerStyle={styles.inputField} label="New Category" onChangeText={onChangeNewCategory} value={categoryText} />
          <Button radius="md" onPress={handleCreate} title="Create" />
        </View>
      </View>
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
  },
  createContainer: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between'
  },
  inputField: {
    maxWidth: 200
  }
});

export default CategoryListScreen
