import axios from 'axios';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>("http://10.0.2.2:3002/category");
  return response.data;
};
