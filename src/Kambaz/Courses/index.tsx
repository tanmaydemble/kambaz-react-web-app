import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizQuestionsEditor from "./Quizzes/QuizQuestionsEditor";
export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const fourthSegment = pathSegments[4];
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {fourthSegment}</h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="Quizzes" element={<Quizzes />} />
                    <Route path="Quizzes/:qid" element={<QuizDetails />} />
                    <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
                    <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
                    <Route path="/Kambaz/Courses/:cid/Quizzes/:qid/edit"
                        element={<QuizQuestionsEditor />} />
                    <Route path="People" element={<PeopleTable />} />
                </Routes>
            </div>
        </div>
    );
}
