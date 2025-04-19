import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assignments: []
}

const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment = {
                _id: assignment._id,
                title: assignment.title,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                dueDate: assignment.dueDate,
                availableFrom: assignment.availableFrom,
                availableUntil: assignment.availableUntil
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: { _id: string }) => a._id !== assignmentId
            ) as any;
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: { _id: string }) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;