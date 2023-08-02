import axios from 'axios';

export const getQuestions = async (): Promise<Question[]> => {
  const response = await axios.get<Question[]>("http://localhost:3000/question");
  return response.data;
};
