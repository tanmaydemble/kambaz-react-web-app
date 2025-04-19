import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, addQuiz, updateQuiz, deleteQuiz } from "./reducer";
import { useEffect } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { GoTriangleDown } from "react-icons/go";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { IQuiz } from "./quizTypes";

export default function Quizzes() {
    const { cid } = useParams();
    if (!cid) {
        return (
            <div className="alert alert-danger">
                Error: Course ID is missing from the URL
            </div>
        );
    }
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };

    useEffect(() => {
        fetchQuizzes();
    }, [cid]);


    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    const handleAddQuiz = async () => {
        try {
            const newQuiz = {
                name: "Unnamed Quiz",
                course: cid,
                description: "",
                points: 0,
                numQuestions: 0,
                availableDate: new Date(),
                untilDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                published: false,
                quizType: "Graded Quiz",
                assignmentGroup: "Quizzes"
            };

            const createdQuiz = await coursesClient.createQuizForCourse(cid, newQuiz);

            dispatch(addQuiz(createdQuiz));

            navigate(`/Kambaz/Courses/${cid}/Quizzes/${createdQuiz._id}`);

        } catch (error) {
            console.error("Failed to create quiz:", error);
        }
    };
    const handlePublishToggle = async (quizId: string, currentStatus: boolean) => {
        if (!isFaculty) return;

        try {
            const quizToUpdate = quizzes.find((q: any) => q._id === quizId);
            if (!quizToUpdate) return;

            const updatedQuiz = {
                ...quizToUpdate,
                published: !currentStatus
            };

            const response = await quizzesClient.updateQuiz(updatedQuiz);

            dispatch(updateQuiz(response));
        } catch (error) {
            console.error("Failed to update quiz:", error);
        }
    };

    const handleDeleteQuiz = async (quizId: string) => {
        if (!isFaculty) return;
        try {
            await quizzesClient.deleteQuiz(quizId);
            dispatch(deleteQuiz(quizId));
        } catch (error) {
            console.error("Failed to delete quiz:", error);
        }
    };
    const handleEditQuiz = (quizId: string) => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
    };

    const getQuizStatus = (quiz: IQuiz) => {
        const now = new Date();
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);

        if (now > untilDate) {
            return "Closed";
        } else if (now >= availableDate) {
            return "Available";
        } else {
            return `Not available until ${availableDate.toLocaleDateString()} at ${availableDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
    };

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return `Due ${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div id="wd-quizzes">
            <div className="d-flex justify-content-between align-items-center">
                <InputGroup className="w-50 me-4 rounded-0">
                    <InputGroup.Text className="rounded-0"><CiSearch /></InputGroup.Text>
                    <FormControl placeholder="Search..." className="rounded-0" />
                </InputGroup>
                {isFaculty && (
                    <div className="d-flex align-items-center">
                        <button
                            onClick={handleAddQuiz}
                            className="btn btn-danger rounded-0"
                        >
                            + Quiz
                        </button>
                    </div>
                )}
            </div>

            <br /><br />

            <ul id="wd-assignments" className="list-group rounded-0 w-100">
                <li className="wd-module list-group-item p-0 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary rounded-0">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineQuiz className="me-2" color="green" />
                        <GoTriangleDown className="me-2" />
                        QUIZZES
                    </div>
                </li>
            </ul>

            {quizzes.length === 0 ? (
                <p className="wd-lesson list-group-item p-3 ps-1 bg-transparent rounded-0">
                    No quizzes yet. {isFaculty && "Click \"+ Quiz\" to add one."}
                </p>
            ) : (
                <ul className="list-group rounded-0">
                    {quizzes.map((quiz: IQuiz) => {
                        const status = getQuizStatus(quiz);
                        const dueDateText = formatDate(quiz.dueDate);

                        return (
                            <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1 border-start-0 rounded-0 border">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center">
                                            <Link
                                                to={isFaculty || quiz.published ? `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}` : "#"}
                                                className={`text-dark fw-bold me-2 text-decoration-none ${(!quiz.published && !isFaculty) ? 'text-muted pe-none' : ''}`}
                                                onClick={(e) => {
                                                    if (!quiz.published && !isFaculty) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                {quiz.name}
                                                {!quiz.published && !isFaculty && ' (Unavailable)'}
                                            </Link>
                                        </div>
                                        <div className="text-muted small d-flex align-items-center flex-wrap">
                                            <span className="me-2">{status}</span>
                                            <span className="me-2">|</span>
                                            <span className="me-2">{dueDateText}</span>
                                            <span className="me-2">|</span>
                                            <span className="me-2">{quiz.points} pts</span>
                                            <span className="me-2">|</span>
                                            <span className="me-2">{quiz.numQuestions} Questions</span>
                                            {!isFaculty && quiz.score !== undefined && (
                                                <>
                                                    <span className="me-2">|</span>
                                                    <span className="me-2">Score: {quiz.score}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-link p-0 me-2 no-underline"
                                            onClick={() => handlePublishToggle(quiz._id, quiz.published)}
                                            title={quiz.published ? "Unpublish" : "Publish"}
                                            disabled={!isFaculty}
                                        >
                                            {quiz.published ? "✅" : "🚫"}
                                        </button>
                                        {isFaculty && (
                                            <div className="dropdown">
                                                <button className="btn rounded-0" type="button" data-bs-toggle="dropdown">
                                                    <IoEllipsisVertical className="fs-4" />
                                                </button>
                                                <ul className="dropdown-menu rounded-0">
                                                    <li><button className="dropdown-item" onClick={() => handleEditQuiz(quiz._id)}>Edit</button></li>
                                                    <li><button className="dropdown-item"
                                                        onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button></li>
                                                    <li><button className="dropdown-item"
                                                        onClick={() => handlePublishToggle(quiz._id, quiz.published)}>
                                                        {quiz.published ? "Unpublish" : "Publish"}
                                                    </button></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}