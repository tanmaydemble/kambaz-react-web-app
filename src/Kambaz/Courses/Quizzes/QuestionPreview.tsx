import { useState } from 'react';
import { Card, Button, ListGroup, Badge, Form, Modal, Alert, InputGroup, FormCheck } from 'react-bootstrap';
import { IQuestion } from './questionTypes';
import { updateQuizQuestion, deleteQuizQuestion } from './client';
import { useDispatch } from 'react-redux';
import { deleteQuestion, updateQuestion } from './Questions/reducer';
import { useParams } from 'react-router';

export default function QuestionPreview({ question }: { question: IQuestion }) {
    const qid = useParams<{ cid: string; qid: string }>().qid;
    if (!qid) return <Alert variant="danger">Quiz ID not found</Alert>;
    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState<IQuestion>({ ...question });
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = async () => {
        try {
            if (!question._id) return;
            const updatedQuestion = await updateQuizQuestion(qid, question._id, editedQuestion);
            dispatch(updateQuestion(updatedQuestion));
            setShowEditModal(false);
        } catch (err) {
            console.error('Failed to update question:', err);
        }
    };

    const handleDelete = async () => {
        if (!question._id) return;
        setIsDeleting(true);
        try {
            await deleteQuizQuestion(qid, question._id);
            dispatch(deleteQuestion(question._id));
        } catch (err) {
            console.error('Failed to delete question:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAddChoice = () => {
        setEditedQuestion({
            ...editedQuestion,
            choices: [...(editedQuestion.choices || []), { text: '', isCorrect: false }]
        });
    };

    const handleRemoveChoice = (index: number) => {
        const newChoices = [...(editedQuestion.choices || [])];
        newChoices.splice(index, 1);
        setEditedQuestion({
            ...editedQuestion,
            choices: newChoices
        });
    };

    const handleChoiceChange = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
        const newChoices = [...(editedQuestion.choices || [])];
        newChoices[index] = {
            ...newChoices[index],
            [field]: value
        };
        setEditedQuestion({
            ...editedQuestion,
            choices: newChoices
        });
    };

    const handleAddBlank = () => {
        setEditedQuestion({
            ...editedQuestion,
            correctBlanks: [...(editedQuestion.correctBlanks || []), '']
        });
    };

    const handleRemoveBlank = (index: number) => {
        const newBlanks = [...(editedQuestion.correctBlanks || [])];
        newBlanks.splice(index, 1);
        setEditedQuestion({
            ...editedQuestion,
            correctBlanks: newBlanks
        });
    };

    const handleBlankChange = (index: number, value: string) => {
        const newBlanks = [...(editedQuestion.correctBlanks || [])];
        newBlanks[index] = value;
        setEditedQuestion({
            ...editedQuestion,
            correctBlanks: newBlanks
        });
    };

    const renderQuestionContent = () => {
        switch (question.questionType) {
            case 'Multiple Choice':
                return (
                    <div>
                        <Card.Text className="mb-3">{question.question}</Card.Text>
                        <ListGroup>
                            {question.choices?.map((choice, index) => (
                                <ListGroup.Item
                                    key={index}
                                    variant={choice.isCorrect ? 'success' : undefined}
                                    className={choice.isCorrect ? 'fw-bold' : ''}
                                >
                                    {choice.text}
                                    {choice.isCorrect && (
                                        <Badge bg="light" text="success" className="ms-2">
                                            Correct
                                        </Badge>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                );

            case 'True/False':
                return (
                    <div>
                        <Card.Text className="mb-3">{question.question}</Card.Text>
                        <ListGroup horizontal className="mt-2">
                            <ListGroup.Item
                                variant={question.correctBoolean === true ? 'success' : undefined}
                                className={question.correctBoolean === true ? 'fw-bold' : ''}
                            >
                                True
                                {question.correctBoolean === true && (
                                    <Badge bg="light" text="success" className="ms-2">
                                        Correct
                                    </Badge>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item
                                variant={question.correctBoolean === false ? 'success' : undefined}
                                className={question.correctBoolean === false ? 'fw-bold' : ''}
                            >
                                False
                                {question.correctBoolean === false && (
                                    <Badge bg="light" text="success" className="ms-2">
                                        Correct
                                    </Badge>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                );

            case 'Fill in the Blank':
                return (
                    <div>
                        <Card.Text className="mb-3">{question.question}</Card.Text>
                        <div className="mt-3">
                            <h6>Correct Answers:</h6>
                            <ListGroup>
                                {question.correctBlanks?.map((blank, index) => (
                                    <ListGroup.Item key={index} className="fst-italic">
                                        "{blank}"
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                );

            default:
                return <Card.Text>{question.question}</Card.Text>;
        }
    };

    const renderEditForm = () => {
        switch (editedQuestion.questionType) {
            case 'Multiple Choice':
                return (
                    <Form.Group className="mb-3">
                        <Form.Label>Choices</Form.Label>
                        {editedQuestion.choices?.map((choice, index) => (
                            <InputGroup key={index} className="mb-2">
                                <Form.Check
                                    type="radio"
                                    name="correctChoice"
                                    checked={choice.isCorrect}
                                    onChange={(e) => handleChoiceChange(index, 'isCorrect', e.target.checked)}
                                />
                                <Form.Control
                                    type="text"
                                    value={choice.text}
                                    onChange={(e) => handleChoiceChange(index, 'text', e.target.value)}
                                    placeholder="Enter choice text"
                                />
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleRemoveChoice(index)}
                                >
                                    Remove
                                </Button>
                            </InputGroup>
                        ))}
                        <Button variant="outline-secondary" onClick={handleAddChoice}>
                            Add Choice
                        </Button>
                    </Form.Group>
                );

            case 'True/False':
                return (
                    <Form.Group className="mb-3">
                        <Form.Label>Correct Answer</Form.Label>
                        <div>
                            <FormCheck
                                type="radio"
                                label="True"
                                name="correctBoolean"
                                checked={editedQuestion.correctBoolean === true}
                                onChange={() => setEditedQuestion({ ...editedQuestion, correctBoolean: true })}
                            />
                            <FormCheck
                                type="radio"
                                label="False"
                                name="correctBoolean"
                                checked={editedQuestion.correctBoolean === false}
                                onChange={() => setEditedQuestion({ ...editedQuestion, correctBoolean: false })}
                            />
                        </div>
                    </Form.Group>
                );

            case 'Fill in the Blank':
                return (
                    <Form.Group className="mb-3">
                        <Form.Label>Correct Answers</Form.Label>
                        {editedQuestion.correctBlanks?.map((blank, index) => (
                            <InputGroup key={index} className="mb-2">
                                <Form.Control
                                    type="text"
                                    value={blank}
                                    onChange={(e) => handleBlankChange(index, e.target.value)}
                                    placeholder="Enter possible correct answer"
                                />
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleRemoveBlank(index)}
                                >
                                    Remove
                                </Button>
                            </InputGroup>
                        ))}
                        <Button variant="outline-secondary" onClick={handleAddBlank}>
                            Add Answer
                        </Button>
                    </Form.Group>
                );

            default:
                return null;
        }
    };


    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                            <Card.Title>
                                {question.title || 'Question'}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {question.questionType} - {question.points} point{question.points !== 1 ? 's' : ''}
                            </Card.Subtitle>
                            {renderQuestionContent()}
                        </div>
                        <div className="d-flex flex-column">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="mb-2"
                                onClick={() => setShowEditModal(true)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select
                                value={editedQuestion.questionType}
                                onChange={(e) => setEditedQuestion({
                                    ...editedQuestion,
                                    questionType: e.target.value as 'Multiple Choice' | 'True/False' | 'Fill in the Blank'
                                })}
                            >
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="True/False">True/False</option>
                                <option value="Fill in the Blank">Fill in the Blank</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedQuestion.title}
                                onChange={(e) => setEditedQuestion({ ...editedQuestion, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                type="number"
                                value={editedQuestion.points}
                                onChange={(e) => setEditedQuestion({ ...editedQuestion, points: parseInt(e.target.value) || 0 })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Question Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editedQuestion.question}
                                onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                            />
                        </Form.Group>
                        {renderEditForm()}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}