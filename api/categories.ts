import axios from 'axios';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>("http://localhost:3000/category");
  return response.data;
};
