import { useState, useEffect } from 'react';
import { Card, Button, Form, Alert, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQuizAttempt, getQuizQuestionAnswers, submitQuizAttempt, getQuiz } from './client';
import { IQuestion } from './questionTypes';

export interface QuizAnswer {
    questionId: string;
    answer: string | boolean;
    isCorrect?: boolean;
    correctAnswer?: string | boolean;
    pointsEarned?: number;
}

export interface QuizAnswerResult {
    isCorrect: boolean;
    correctAnswer: string | boolean;
    pointsEarned?: number;
}

export interface QuizResults {
    score: number;
    totalPossible: number;
    answers: Record<string, QuizAnswerResult>;
}

export default function QuizPreview() {
    const { cid } = useParams<{ cid: string }>();
    const { qid } = useParams<{ qid: string }>();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [results, setResults] = useState<QuizResults | null>(null);
    const [quizDetails, setQuizDetails] = useState<any>(null);
    const [, setAttemptsCount] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const loadedQuestions = await getQuizQuestionAnswers(qid!);
                setQuestions(loadedQuestions);
                const quizData = await getQuiz(qid!);
                setQuizDetails(quizData);

                if (currentUser) {
                    try {
                        const attempt = await getQuizAttempt(qid!, currentUser._id);
                        if (attempt) {
                            setResults({
                                score: attempt.score,
                                totalPossible: loadedQuestions.reduce((sum: number, q: IQuestion) => sum + q.points, 0),
                                answers: attempt.answers.reduce((acc: Record<string, QuizAnswerResult>, curr: any) => {
                                    acc[curr.questionId] = {
                                        isCorrect: curr.isCorrect || false,
                                        correctAnswer: curr.correctAnswer,
                                        pointsEarned: curr.pointsEarned
                                    };
                                    return acc;
                                }, {})
                            });

                            setUserAnswers(attempt.answers.map((a: QuizAnswer) => ({
                                questionId: a.questionId,
                                answer: a.answer
                            })));

                        }
                    } catch (err) {
                        console.log('No previous attempt found');
                    }
                }
            } catch (err) {
                setError('Failed to load quiz questions');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [qid, currentUser]);

    const handleAnswerChange = (questionId: string, answer: string | boolean) => {
        setUserAnswers(prev => {
            const existingIndex = prev.findIndex(a => a.questionId === questionId);
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = { questionId, answer };
                return updated;
            }
            return [...prev, { questionId, answer }];
        });
    };

    const handleSubmit = async () => {
        if (!currentUser) return;

        setIsSubmitting(true);
        try {
            const response = await submitQuizAttempt(
                qid!,
                currentUser._id,
                userAnswers,
                currentUser.role
            );
            setResults({
                score: response.score,
                totalPossible: questions.reduce((sum, q) => sum + q.points, 0),
                answers: response.answers.reduce((acc: Record<string, QuizAnswerResult>, curr: any) => {
                    acc[curr.questionId] = {
                        isCorrect: curr.isCorrect,
                        correctAnswer: curr.correctAnswer,
                        pointsEarned: curr.pointsEarned
                    };
                    return acc;
                }, {})
            });

            if (currentUser.role === "STUDENT") {
                setAttemptsCount(prev => prev + 1);
            }
        } catch (err) {
            if (currentUser?.role === "STUDENT") {
                setError('Maximum Number of Attempts Reached');
            }
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    function formatCorrectAnswer(answer: string | boolean | undefined, question: IQuestion): string {
        if (answer === undefined) {
            if (question.questionType === 'Multiple Choice') {
                return question.choices?.find(c => c.isCorrect)?.text || 'N/A';
            } else if (question.questionType === 'True/False') {
                return question.correctBoolean ? 'True' : 'False';
            } else if (question.questionType === 'Fill in the Blank') {
                return question.correctBlanks?.join(', ') || 'N/A';
            }
            return 'N/A';
        }
        if (typeof answer === 'boolean') return answer ? 'True' : 'False';
        return String(answer);
    }

    const renderQuestion = (question: IQuestion, index: number) => {
        const userAnswerObj = userAnswers.find(a => a.questionId === question._id);
        const userAnswer = userAnswerObj?.answer;
        const result = results?.answers[question._id!];

        return (
            <Card key={question._id} className="mb-3">
                <Card.Body>
                    <Card.Title>
                        Question {index + 1} ({question.points} pts)
                        {results && (
                            <Badge bg={result?.isCorrect ? 'success' : 'danger'} className="ms-2">
                                {result?.isCorrect ? '✓' : '✗'}
                            </Badge>
                        )}
                    </Card.Title>
                    <Card.Text>{question.question}</Card.Text>

                    {results && (
                        <Alert variant={result?.isCorrect ? 'success' : 'danger'} className="mb-3">
                            {result?.isCorrect ? 'Correct!' : 'Incorrect. '}
                            {!result?.isCorrect && `Correct answer: ${formatCorrectAnswer(result?.correctAnswer, question)}`}
                        </Alert>
                    )}

                    {question.questionType === 'Multiple Choice' && (
                        <ListGroup>
                            {question.choices?.map((choice, i) => (
                                <ListGroup.Item
                                    key={i}
                                    variant={
                                        results
                                            ? (choice.isCorrect
                                                ? 'success'
                                                : (String(userAnswer) === String(choice.text) && !result?.isCorrect
                                                    ? 'danger'
                                                    : undefined))
                                            : undefined
                                    }
                                >
                                    <Form.Check
                                        type="radio"
                                        id={`q${index}-c${i}`}
                                        label={choice.text}
                                        name={`q${index}`}
                                        checked={userAnswer === choice.text}
                                        onChange={() => handleAnswerChange(question._id!, choice.text)}
                                        disabled={!!results}
                                    />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    {question.questionType === 'True/False' && (
                        <div className="d-flex gap-3">
                            {[true, false].map((value) => (
                                <div key={value.toString()} className={
                                    results
                                        ? value === question.correctBoolean
                                            ? 'text-success fw-bold'
                                            : userAnswer === value && !result?.isCorrect
                                                ? 'text-danger'
                                                : ''
                                        : ''
                                }>
                                    <Form.Check
                                        type="radio"
                                        id={`q${index}-${value}`}
                                        label={value.toString()}
                                        name={`q${index}`}
                                        checked={userAnswer === value}
                                        onChange={() => handleAnswerChange(question._id!, value)}
                                        disabled={!!results}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {question.questionType === 'Fill in the Blank' && (
                        <Form.Control
                            type="text"
                            value={(userAnswer as string) || ''}
                            onChange={(e) => handleAnswerChange(question._id!, e.target.value)}
                            disabled={!!results}
                        />
                    )}
                </Card.Body>
            </Card>
        );
    };

    if (isLoading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quiz Preview</h2>
                {currentUser?.role === "FACULTY" && (
                    <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}>
                        <Button variant="primary">
                            Edit Quiz
                        </Button>
                    </Link>
                )}
            </div>

            {questions.map((question, index) => renderQuestion(question, index))}

            {!results ? (
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting || (results ? false : Object.keys(userAnswers).length !== questions.length)}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </Button>
            ) : (
                <div className="d-flex flex-column gap-2 mt-4">
                    <Alert variant="info">
                        Your score: {results.score} out of {results.totalPossible}
                    </Alert>

                    {currentUser?.role === "FACULTY" && (
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setResults(null);
                                setUserAnswers([]);
                            }}
                        >
                            Retake Quiz
                        </Button>
                    )}

                    {currentUser?.role === "STUDENT" && (
                        <>
                            {quizDetails?.multipleAttempts &&
                                (quizDetails?.attemptsAllowed === 0 ||
                                    (currentUser.attemptsCount || 0) < quizDetails.attemptsAllowed) ? (
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setResults(null);
                                        setUserAnswers([]);
                                    }}
                                >
                                    Retake Quiz
                                </Button>
                            ) : (
                                <Alert variant="warning" className="mb-0">
                                    Maximum attempts reached
                                </Alert>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}