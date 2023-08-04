import axios from 'axios';

interface PostBody {
  title: string;
  correct: number;
  answers: string[];
  categoryId: number;
}

export const getQuestions = async (areas?: string[], limit?: number) => {
  // if (limit || areas) {
  //   const response = await axios.get<Question[]>(`http://10.0.2.2:3002/question`, {
  //     params: {
  //       limit,
  //       areas
  //     }
  //   });
  //   return response.data;
  // }
  console.log('getting questions');

  const response = await axios.get<Question[]>("http://10.0.2.2:3002/question");
  return response.data;
};

export const deleteQuestion = async (id: string) => {
  const response = await axios.delete(`http://10.0.2.2:3002/question/${id}`);
  return response.data
}

export const createQuestion = async ({title, correct, answers, categoryId}: PostBody) => {
  const response = await axios.post<Question>("http://10.0.2.2:3002/question", {
    title,
    correct,
    answers,
    categoryId,
  })
  return response.data
}

export const getQuestion = async (id: string) => {
  const response = await axios.get<Question>(`http://10.0.2.2:3002/question/${id}`)
  return response.data
}

export const updateQuestion = async (id: string, body: PostBody) => {
  const response = await axios.put<Question>(`http://10.0.2.2:3002/question/${id}`, body)
  return response.data;
}
