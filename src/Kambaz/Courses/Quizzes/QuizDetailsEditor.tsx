import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import * as quizClient from './client';
import { useDispatch } from 'react-redux';
import { updateQuiz as updateQuizAction } from './reducer';
import { useNavigate, useParams } from 'react-router-dom';

export default function QuizDetailsEditor() {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const formatDateNew = (date: string | Date) => {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().slice(0, 16);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quizType, setQuizType] = useState('graded');
    const [points, setPoints] = useState(0);
    const [assignmentGroup, setAssignmentGroup] = useState('quizzes');
    const [shuffleAnswers, setShuffleAnswers] = useState(false);
    const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(false);
    const [timeLimit, setTimeLimit] = useState('');
    const [multipleAttempts, setMultipleAttempts] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [availableUntil, setAvailableUntil] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [attemptsAllowed, setAttemptsAllowed] = useState(1);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
    const [webcamRequired, setWebcamRequired] = useState(false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
    const [accessCode, setAccessCode] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!qid) return;
            try {
                const fetchedQuiz = await quizClient.getQuiz(qid);
                setQuiz(fetchedQuiz);
                setName(fetchedQuiz.name || '');
                setDescription(fetchedQuiz.description || '');
                setQuizType(fetchedQuiz.quizType || 'graded');
                setPoints(fetchedQuiz.points || 0);
                setAssignmentGroup(fetchedQuiz.assignmentGroup || 'quizzes');
                setShuffleAnswers(fetchedQuiz.shuffleAnswers || false);
                setIsTimeLimitEnabled(fetchedQuiz.isTimeLimitEnabled || false);
                setTimeLimit(fetchedQuiz.timeLimit || '');
                setMultipleAttempts(fetchedQuiz.multipleAttempts || false);
                setDueDate(formatDateNew(fetchedQuiz.dueDate) || '');
                setAvailableFrom(formatDateNew(fetchedQuiz.availableDate) || '');
                setAvailableUntil(formatDateNew(fetchedQuiz.untilDate) || '');
                setAttemptsAllowed(fetchedQuiz.attemptsAllowed || 1);
                setShowCorrectAnswers(fetchedQuiz.showCorrectAnswers || false);
                setOneQuestionAtATime(fetchedQuiz.oneQuestionAtATime ?? true);
                setWebcamRequired(fetchedQuiz.webcamRequired || false);
                setLockQuestionsAfterAnswering(fetchedQuiz.lockQuestionsAfterAnswering || false);
                setAccessCode(fetchedQuiz.accessCode || '');
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
                alert('Failed to load quiz');
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuiz();
    }, [qid]);

    const handleSave = async (publish: boolean = false) => {
        if (!quiz) return;
        setIsSaving(true);

        const quizToSave = {
            ...quiz,
            name,
            description,
            quizType,
            points,
            assignmentGroup,
            shuffleAnswers,
            isTimeLimitEnabled,
            timeLimit: isTimeLimitEnabled ? timeLimit : null,
            multipleAttempts,
            dueDate,
            availableDate: availableFrom,
            untilDate: availableUntil,
            published: publish ? true : quiz.published,
            attemptsAllowed: multipleAttempts ? attemptsAllowed : 1,
            showCorrectAnswers,
            oneQuestionAtATime,
            webcamRequired,
            lockQuestionsAfterAnswering,
            accessCode,
        };

        try {
            const updatedQuiz = await quizClient.updateQuiz(quizToSave);
            dispatch(updateQuizAction(updatedQuiz));
            if (publish) {
                navigate(`/Kambaz/Courses/${cid}/Quizzes`);
            } else {
                navigate(-1); // Go back to Quiz Details
            }
        } catch (error) {
            console.error('Failed to save quiz:', error);
            alert('Failed to save quiz');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    if (isLoading) {
        return <div>Loading quiz...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="p-4">
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter quiz title"
                />
            </Form.Group>
            <p className="text-muted">Quiz Instructions:</p>

            <div className="border p-3 mb-4" style={{ minHeight: '100px' }}>
                <div className="d-flex align-items-center mb-2">
                    <select className="form-select form-select-sm me-2" style={{ width: '80px' }}>
                        <option>12pt</option>
                    </select>
                    <select className="form-select form-select-sm me-2" style={{ width: '120px' }}>
                        <option>Paragraph</option>
                    </select>
                    <button className="btn btn-sm btn-outline-secondary me-1"><strong>B</strong></button>
                    <button className="btn btn-sm btn-outline-secondary me-1"><em>I</em></button>
                    <button className="btn btn-sm btn-outline-secondary me-1"><u>U</u></button>
                </div>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter quiz instructions here..."
                />
            </div>

            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Quiz Type</Form.Label>
                            <Form.Select
                                value={quizType}
                                onChange={(e) => setQuizType(e.target.value)}
                                className="mb-3"
                            >
                                <option value="graded">Graded Quiz</option>
                                <option value="practice">Practice Quiz</option>
                                <option value="graded-survey">Graded Survey</option>
                                <option value="ungraded-survey">Ungraded Survey</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Assignment Group</Form.Label>
                            <Form.Select
                                value={assignmentGroup}
                                onChange={(e) => setAssignmentGroup(e.target.value)}
                            >
                                <option value="quizzes">Quizzes</option>
                                <option value="exams">Exams</option>
                                <option value="assignments">Assignments</option>
                                <option value="project">Project</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Points</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            min="0"
                        />
                    </Col>
                </Form.Group>

                <Card className="mb-4">
                    <style>
                        {`
            .form-check-input:checked {
                background-color: #dc3545 !important;
                border-color: #dc3545 !important;
            }
        `}
                    </style>
                    <Card.Header>Options</Card.Header>
                    <Card.Body>
                        <Form.Check
                            type="checkbox"
                            label="Shuffle Answers"
                            checked={shuffleAnswers}
                            onChange={(e) => setShuffleAnswers(e.target.checked)}
                            className="mb-2 "
                        />
                        <div className="d-flex align-items-center mb-2">
                            <Form.Check
                                type="checkbox"
                                label="Time Limit"
                                checked={isTimeLimitEnabled}
                                onChange={(e) => setIsTimeLimitEnabled(e.target.checked)}
                                className="me-2"
                            />
                            {isTimeLimitEnabled && (
                                <>
                                    <Form.Control
                                        type="number"
                                        value={timeLimit}
                                        onChange={(e) => setTimeLimit(e.target.value)}
                                        style={{ width: '100px' }}
                                        className="me-2"
                                        min="1"
                                        placeholder="Minutes"
                                    />
                                    <span>Minutes</span>
                                </>
                            )}
                        </div>
                        <Form.Check
                            type="checkbox"
                            label="Allow Multiple Attempts"
                            checked={multipleAttempts}
                            onChange={(e) => setMultipleAttempts(e.target.checked)}
                        />
                        {multipleAttempts && (
                            <Form.Group className="mb-2 ms-4">
                                <Form.Label>Attempts Allowed:</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={attemptsAllowed}
                                    onChange={(e) => setAttemptsAllowed(Number(e.target.value))}
                                    style={{ width: '100px' }}
                                    min="1"
                                />
                            </Form.Group>
                        )}

                        <Form.Check
                            type="checkbox"
                            label="Show Correct Answers"
                            checked={showCorrectAnswers}
                            onChange={(e) => setShowCorrectAnswers(e.target.checked)}
                            className="mb-2"
                        />

                        <Form.Check
                            type="checkbox"
                            label="One Question at a Time"
                            checked={oneQuestionAtATime}
                            onChange={(e) => setOneQuestionAtATime(e.target.checked)}
                            className="mb-2"
                        />

                        <Form.Check
                            type="checkbox"
                            label="Webcam Required"
                            checked={webcamRequired}
                            onChange={(e) => setWebcamRequired(e.target.checked)}
                            className="mb-2"
                        />

                        <Form.Check
                            type="checkbox"
                            label="Lock Questions After Answering"
                            checked={lockQuestionsAfterAnswering}
                            onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
                            className="mb-2"
                        />

                        <Form.Group className="mb-2">
                            <Form.Label>Access Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                placeholder="Enter access code (optional)"
                                style={{ width: '200px' }}
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Header>Assign</Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Assign to</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    type="text"
                                    value="Everyone"
                                    readOnly
                                    style={{ width: '150px' }}
                                    className="me-2"
                                />
                                <Button variant="light" size="sm">✗</Button>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Due</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Available from</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={availableFrom}
                                        onChange={(e) => setAvailableFrom(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Until</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={availableUntil}
                                        onChange={(e) => setAvailableUntil(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <div className="d-flex justify-content-end gap-2">
                    <Button
                        variant="outline-secondary"
                        onClick={handleCancel}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleSave(false)}
                        disabled={isSaving}
                        className="text-white"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleSave(true)}
                        disabled={isSaving}
                        className="text-white"
                    >
                        {isSaving ? 'Publishing...' : 'Save & Publish'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}