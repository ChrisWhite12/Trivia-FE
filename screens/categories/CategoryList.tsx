import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Text, FlatList, ActivityIndicator } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import IconButton from '../../components/IconButton';
import { useQuery } from 'react-query';
import { Button, Divider, Input, LinearProgress } from '@rneui/themed';
import { createCategory, deleteCategory, getCategories } from '../../api/categories';


interface Props {

}

const CategoryListScreen: FC<Props> = ({ }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryText, setCategoryText] = useState('');
  const [dataLoading, setDataLoading] = useState(false)

  const { isLoading, data, refetch } = useQuery(["getCategories"], async () => getCategories());

  const onChangeNewCategory = (value: string) => {
    setCategoryText(value)
  }

  const handleCreate = async () => {
    setDataLoading(true)
    await createCategory({
      name: categoryText
    })
    setCategoryText('')
    setDataLoading(false)
    refetch()
  }

  const handleDelete = async (value: number) => {
    setDataLoading(true)
    await deleteCategory(value)
    setDataLoading(false)
    refetch()
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
          <Input
            containerStyle={styles.inputFieldContainer}
            inputStyle={styles.inputField}
            label="New Category"
            onChangeText={onChangeNewCategory}
            value={categoryText}
          />
          <Button radius="md" onPress={handleCreate} title="Create" />
        </View>
        <View style={styles.loadingContainer}>
          {dataLoading
            && <LinearProgress
              style={{ marginVertical: 10 }}
              value={dataLoading ? 1 : 0}
              color='red'
            />
          }
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
    paddingVertical: 100,
    paddingHorizontal: 20,
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
    color: 'white'
  },
  inputFieldContainer: {
    maxWidth: 200
  },
  loadingContainer: {
    padding: 10
  }
});

export default CategoryListScreen
