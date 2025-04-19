import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestion } from '../questionTypes';

interface QuestionsState {
    questions: IQuestion[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: QuestionsState = {
    questions: [],
    status: 'idle',
    error: null
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
            state.questions = action.payload;
            state.status = 'succeeded';
        },
        addQuestion: (state, action: PayloadAction<IQuestion>) => {
            state.questions.push(action.payload);
        },
        updateQuestion: (state, action: PayloadAction<IQuestion>) => {
            const index = state.questions.findIndex(q => q._id === action.payload._id);
            if (index !== -1) {
                state.questions[index] = action.payload;
            }
        },
        deleteQuestion: (state, action: PayloadAction<string>) => {
            state.questions = state.questions.filter(q => q._id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload ? 'loading' : 'idle';
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'failed';
        }
    }
});

export const {
    setQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    setLoading,
    setError
} = questionsSlice.actions;

export default questionsSlice.reducer;