import axios from 'axios';

interface PostBody {
  title: string;
  correct: number;
  answers: string[];
  categoryId: number;
}

export const getQuestions = async (areas?: string[], limit?: number): Promise<Question[]> => {
  console.log('areas',areas);
  if (limit || areas) {
    const response = await axios.get<Question[]>(`http://10.0.2.2:3002/question`, {
      params: {
        limit,
        areas
      }
    });
    return response.data;
  }

  const response = await axios.get<Question[]>("http://10.0.2.2:3002/question");
  return response.data;
};

export const deleteQuestion = async (id: string): Promise<void> => {
  const response = await axios.delete(`http://10.0.2.2:3002/question/${id}`);
  console.log('res', response)
}

export const createQuestion = async ({title, correct, answers, categoryId}: PostBody): Promise<Question> => {
  const response = await axios.post<Question>("http://10.0.2.2:3002/question", {
    title,
    correct,
    answers,
    categoryId,
  })
  return response.data
}
