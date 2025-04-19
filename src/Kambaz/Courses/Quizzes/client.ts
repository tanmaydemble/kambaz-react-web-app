import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// export const REMOTE_SERVER = "http://localhost:4000";
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
export interface QuizAnswer {
    questionId: string;
    answer: string | boolean;
}
export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};
export const getQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return data;
}
export const getQuestionsForQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return data;
}
export const addQuestionToQuiz = async (quizId: string, question: any) => {
    const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return data;
}
export const updateQuizQuestion = async (quizId: string, questionId: string, question: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/questions/${questionId}`, question);
    return data;
}
export const deleteQuizQuestion = async (quizId: string, questionId: string) => {
    const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return data;
}

export const getQuizQuestionAnswers = async (quizId: string) => {
    const response = await fetch(`${QUIZZES_API}/${quizId}/questionAnswers`);
    if (!response.ok) {
        throw new Error('Failed to fetch quiz questions and answers');
    }
    return response.json();
};

export const submitQuizAttempt = async (quizId: string, userId: string, answers: QuizAnswer[], userRole: string) => {
    const response = await fetch(`${QUIZZES_API}/${quizId}/attempt`, {
        method: 'POST',
        body: JSON.stringify({ userId, answers, userRole }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to submit quiz attempt');
    }
    return response.json();
};

export const getQuizAttempt = async (quizId: string, userId: string) => {
    const response = await fetch(`${QUIZZES_API}/${quizId}/attempt?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch quiz attempt');
    }
    return response.json();
};