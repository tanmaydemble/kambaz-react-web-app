import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import enrollmentsReducer from "./Courses/Enrollments/reducer"
import assignmentsReducer from "./Courses/Assignments/reducer"
import quizzesReducer from "./Courses/Quizzes/reducer"
import questionsReducer from "./Courses/Quizzes/Questions/reducer"
const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        enrollments: enrollmentsReducer,
        assignmentsReducer,
        quizzesReducer,
        questionsReducer
    },
});
export default store;