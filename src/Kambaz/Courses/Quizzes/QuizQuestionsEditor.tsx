import { useEffect } from 'react';
import { Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import QuestionList from './QuestionList';
import { IQuestion } from './questionTypes';
import { useParams } from 'react-router-dom';
import { getQuestionsForQuiz, addQuestionToQuiz } from './client';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, addQuestion, setLoading, setError } from './Questions/reducer';

export default function QuizQuestionsEditor() {
    const { qid } = useParams<{
        cid: string;
        qid: string
    }>();
    const dispatch = useDispatch();
    const { questions, status, error } = useSelector((state: any) => state.questionsReducer);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!qid) return;
            dispatch(setLoading(true));
            try {
                const fetchedQuestions = await getQuestionsForQuiz(qid);
                dispatch(setQuestions(fetchedQuestions));
            } catch (err) {
                dispatch(setError(err instanceof Error ? err.message : 'Failed to load questions'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchQuestions();
    }, [qid, dispatch]);

    const addNewQuestion = async () => {
        if (!qid) return;

        const newQuestion: IQuestion = {
            qid: qid,
            questionType: 'Multiple Choice',
            title: `Question ${questions.length + 1}`,
            points: 1,
            question: 'Enter your question here',
            choices: [
                { text: 'Option 1', isCorrect: true },
                { text: 'Option 2', isCorrect: false },
                { text: 'Option 3', isCorrect: false },
                { text: 'Option 4', isCorrect: false }
            ],
            correctBoolean: undefined,
            correctBlanks: undefined
        };

        try {
            const createdQuestion = await addQuestionToQuiz(qid, newQuestion);
            dispatch(addQuestion(createdQuestion));
        } catch (err) {
            setError('Failed to create new question');
            console.error(err);
        }
    };

    const totalPoints = questions.reduce((sum: number, q: any) => sum + q.points, 0);

    if (!qid) {
        return <Alert variant="danger">Error: Quiz ID is missing</Alert>;
    }

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center mt-4">
                <Spinner animation="border" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-between align-items-center mb-4">
                <Col>
                    <h2>Questions</h2>
                </Col>
                <Col xs="auto">
                    <div className="d-flex align-items-center">
                        <span className="me-3">Total Points: {totalPoints}</span>
                        <Button variant="primary" onClick={addNewQuestion}>
                            New Question
                        </Button>
                    </div>
                </Col>
            </Row>

            <QuestionList questions={questions} />
        </Container>
    );
}