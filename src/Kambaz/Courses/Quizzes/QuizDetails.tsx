import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as quizClient from './client';
import { Link, useParams } from 'react-router-dom';

export default function QuizDetails() {
    const { qid, cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!qid) {
            setError("No Quiz ID provided");
            setLoading(false);
            return;
        }

        const fetchQuiz = async () => {
            try {
                const quizData = await quizClient.getQuiz(qid);
                setQuiz(quizData);
            } catch (err) {
                console.error("Failed to fetch quiz:", err);
                setError("Failed to load quiz data");
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [qid]);

    if (!qid) {
        return <div className="alert alert-danger">Error: Quiz ID is missing</div>;
    }

    if (loading) {
        return <div>Loading quiz...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!quiz) {
        return <div className="alert alert-danger">Quiz not found</div>;
    }

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).replace(',', ' at');
    };

    return (
        <div className="container mt-3">
            <h2 className="mb-3 fw-normal">{quiz.name}</h2>

            {isFaculty ? (
                <div className="mb-4">
                    <div className="d-flex gap-2 mb-4">
                        <Link
                            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`}
                            className="btn btn-secondary btn-sm"
                        >
                            Preview
                        </Link>
                        {isFaculty && (
                            <Link
                                to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}
                                className="btn btn-secondary btn-sm"
                            >
                                Edit
                            </Link>
                        )}
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Quiz Type</strong></div>
                        <div>{quiz.quizType}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Points</strong></div>
                        <div>{quiz.points}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Assignment Group</strong></div>
                        <div>{quiz.assignmentGroup}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Shuffle Answers</strong></div>
                        <div>{quiz.shuffleAnswers ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Time Limit</strong></div>
                        {/* <div>{quiz.timeLimit} Minutes</div> */}
                        <div>{quiz.isTimeLimitEnabled ? `${quiz.timeLimit} Minutes` : 'No time limit'}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Multiple Attempts</strong></div>
                        <div>
                            {quiz.multipleAttempts
                                ? `Yes (${quiz.attemptsAllowed} attempts allowed)`
                                : 'No'}
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>View Responses</strong></div>
                        <div>Always</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Show Correct Answers</strong></div>
                        <div>{quiz.showCorrectAnswers ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>One Question at a Time</strong></div>
                        <div>{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Require Respondant LockDown</strong></div>
                        <div>No</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Required to View Quiz Results</strong></div>
                        <div>No</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Webcam Required</strong></div>
                        <div>{quiz.webcamRequired ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Lock Questions After Answering</strong></div>
                        <div>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-muted me-3" style={{ width: '200px' }}><strong>Access Code</strong></div>
                        <div>{quiz.accessCode || 'None'}</div>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <Link
                        to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`}
                        className="btn btn-danger"
                    >
                        Start Quiz
                    </Link>
                </div>
            )}

            <Table bordered className="mt-4" style={{ maxWidth: '800px' }}>
                <thead>
                    <tr>
                        <th className="bg-light">Due</th>
                        <th className="bg-light">For</th>
                        <th className="bg-light">Available from</th>
                        <th className="bg-light">Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formatDate(quiz.dueDate)}</td>
                        <td>Everyone</td>
                        <td>{formatDate(quiz.availableDate)}</td>
                        <td>{formatDate(quiz.untilDate)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}