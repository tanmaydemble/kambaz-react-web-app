import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import enrollments from '../../Database/enrollments.json';
import { v4 as uuidv4 } from "uuid";

const initialState = {
    enrollments: enrollments
};

const enrollmentsSlice = createSlice({
    name: 'enrollments',
    initialState,
    reducers: {
        addEnrollment: (state, action) => {
            const newEnrollment = {
                _id: String(state.enrollments.length + 1),
                user: action.payload.userId,
                course: action.payload.courseId
            };
            state.enrollments.push(newEnrollment);
            console.log([...state.enrollments]);
        },
        enrollInCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
            state.enrollments.push({
                _id: uuidv4(),
                ...action.payload,
            });
        },
        unenrollFromCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
            state.enrollments = state.enrollments.filter(
                enrollment => !(
                    enrollment.user === action.payload.user &&
                    enrollment.course === action.payload.course
                )
            );
        }
    }
});

export const { addEnrollment, enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
