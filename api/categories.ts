import axios from 'axios';

interface PostBody {
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>("http://10.0.2.2:3002/category");
  return response.data;
};

export const createCategory = async ({name}: PostBody) => {
  const response = await axios.post<Category[]>("http://10.0.2.2:3002/category", { name });
  return response.data
}

export const deleteCategory = async (id: number) => {
  const response = await axios.delete<Category[]>(`http://10.0.2.2:3002/category/${id}`);
  return response.data
}

