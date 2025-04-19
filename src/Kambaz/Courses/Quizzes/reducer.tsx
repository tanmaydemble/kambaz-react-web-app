import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuiz } from './quizTypes';
const initialState = {
    quizzes: [] as IQuiz[],
}

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action: PayloadAction<IQuiz>) => {
            state.quizzes.push(action.payload);
        },
        updateQuiz: (state, action) => {
            const index = state.quizzes.findIndex(q => q._id === action.payload._id);
            if (index !== -1) {
                state.quizzes[index] = action.payload;
            }
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(q => q._id !== action.payload);
        }
    }
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;